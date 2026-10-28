const PORTAL_TABS = {
  schedule: "Planning",
  students: "Comptes",
  settings: "Configuration",
};

const SPREADSHEET_ID = "17mBXAT26SbHiQScWGOdtBxSzcn7r4BCHdECCQs-4Fzg";
const PORTAL_PASSWORD = "souss";
let portalSpreadsheet;

const WEEKLY_ROSTER = [
  ["Anas", "Soma", "Soukaina", "Abdelrani", "Ibrahim", "", "", "", "", "", "", ""],
  ["Saïda", "Soma", "Ismaïl", "Anis", "", "", "", "", "", "", "", ""],
  ["Soma", "Saïda", "Abdelrani", "Ibrahim", "Soukaina", "", "", "", "", "", "", ""],
  ["Soma", "Saïda", "Ismaïl", "Anas", "Anis", "", "", "", "", "", "", ""],
  ["Saïda", "Soma", "Soukaina", "Abdelrani", "Ibrahim", "", "", "", "", "", "", ""],
];

function doGet(event) {
  const file = event && event.parameter && event.parameter.admin === "1" ? "Admin" : "Portal";
  const parameters = (event && event.parameter) || {};
  const origin = String(parameters.parentOrigin || "");
  const channel = String(parameters.embedId || "");
  const allowedOrigin = /^https:\/\/karimelhoudaigui\.github\.io$/.test(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  const template = HtmlService.createTemplateFromFile(file);
  template.embed = allowedOrigin && /^[a-zA-Z0-9-]{1,80}$/.test(channel) ? { origin, channel } : null;
  return template.evaluate()
    .setTitle("Espace élèves — Institut Souss Al-'Ālima")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function setupStudentPortal() {
  setupStudentPortal_();
}

function setupStudentPortal_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

  spreadsheet.setSpreadsheetTimeZone("Africa/Casablanca");
  const properties = PropertiesService.getScriptProperties();
  properties.setProperty("SPREADSHEET_ID", spreadsheet.getId());
  if (!properties.getProperty("PIN_PEPPER")) properties.setProperty("PIN_PEPPER", Utilities.getUuid());
  if (!properties.getProperty("SESSION_SECRET")) properties.setProperty("SESSION_SECRET", Utilities.getUuid());
  if (!properties.getProperty("ADMIN_KEY_HASH")) {
    const adminKey = `${Utilities.getUuid().replace(/-/g, "")}${Utilities.getUuid().replace(/-/g, "")}`;
    properties.setProperty("ADMIN_KEY_HASH", _pinHash_(adminKey));
    console.log(`Code administrateur à conserver en lieu sûr : ${adminKey}`);
  }

  const schedule = _ensureTab_(spreadsheet, PORTAL_TABS.schedule, [
    "Jour (1=lundi)", "Heure Maroc", "Nom affiché", "Compte propriétaire", "Mis à jour le",
  ]);
  const students = _ensureTab_(spreadsheet, PORTAL_TABS.students, [
    "Identifiant", "Nom affiché", "Empreinte du code personnel", "Actif", "Version de session",
  ]);
  const settings = _ensureTab_(spreadsheet, PORTAL_TABS.settings, ["Clé", "Valeur"]);

  const knownAccounts = _readAccounts_(students);
  const accountIds = new Map(knownAccounts.map((account) => [account.name.toLocaleLowerCase("fr"), account.id]));
  const newCredentials = [];
  const names = [...new Set(WEEKLY_ROSTER.flat().filter(Boolean))];

  names.forEach((name) => {
    if (accountIds.has(name.toLocaleLowerCase("fr"))) return;
    const id = Utilities.getUuid();
    const pin = Utilities.getUuid().replace(/-/g, "").slice(0, 16).toUpperCase();
    students.appendRow([id, name, _pinHash_(pin), true, 1]);
    accountIds.set(name.toLocaleLowerCase("fr"), id);
    newCredentials.push(`${name} : ${pin}`);
  });

  if (schedule.getLastRow() === 1) {
    const rows = [];
    WEEKLY_ROSTER.forEach((day, dayIndex) => {
      day.forEach((name, slotIndex) => {
        const hour = 21 + Math.floor(slotIndex / 4);
        const minute = (slotIndex % 4) * 15;
        rows.push([
          dayIndex + 1,
          `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
          name,
          name ? accountIds.get(name.toLocaleLowerCase("fr")) : "",
          name ? new Date() : "",
        ]);
      });
    });
    schedule.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
    schedule.getRange(2, 2, rows.length, 1).setNumberFormat("@");
    schedule.getRange(2, 5, rows.length, 1).setNumberFormat("yyyy-mm-dd hh:mm:ss");
    schedule.setFrozenRows(1);
    schedule.autoResizeColumns(1, 5);
  }

  if (settings.getLastRow() === 1) {
    settings.appendRow(["telegram_invite_url", "https://t.me/+qlHw45Sgmaq4MjI5"]);
  }

  if (newCredentials.length) {
    console.log("Codes personnels à transmettre à chaque élève (ils ne sont pas stockés en clair) :");
    newCredentials.forEach((credential) => console.log(credential));
  }
  console.log(`Planning initialisé dans « ${spreadsheet.getName()} ». Vérifiez les jours et les inscriptions avant ouverture.`);
}

function adminAddStudent(displayName, adminKey) {
  const name = String(displayName || "").trim();
  const code = String(adminKey || "").trim();
  if (name.length < 2 || name.length > 80) throw new Error("Le nom doit contenir entre 2 et 80 caractères.");
  if (!/^[a-f0-9]{64}$/i.test(code)) throw new Error("Code administrateur incorrect.");

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const cache = CacheService.getScriptCache();
    const attempts = Number(cache.get("admin_add_attempts") || 0);
    if (attempts >= 10) throw new Error("Trop de tentatives. Réessayez dans 15 minutes.");
    if (!_constantTimeEquals_(_pinHash_(code), PropertiesService.getScriptProperties().getProperty("ADMIN_KEY_HASH") || "")) {
      cache.put("admin_add_attempts", String(attempts + 1), 900);
      throw new Error("Code administrateur incorrect.");
    }

    const students = _tab_(PORTAL_TABS.students);
    if (_readAccounts_(students).some((account) => account.name.toLocaleLowerCase("fr") === name.toLocaleLowerCase("fr"))) {
      throw new Error("Un compte existe déjà avec ce nom.");
    }

    const id = Utilities.getUuid();
    const pin = Utilities.getUuid().replace(/-/g, "").slice(0, 16).toUpperCase();
    students.appendRow([id, name, _pinHash_(pin), true, 1]);
    cache.remove("admin_add_attempts");
    return { name, pin };
  } finally {
    lock.releaseLock();
  }
}

function login(password) {
  if (!_constantTimeEquals_(_pinHash_(String(password || "")), _pinHash_(PORTAL_PASSWORD))) {
    throw new Error("Mot de passe incorrect.");
  }

  const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const payload = `shared.1.${expiresAt}`;
  return { token: `${payload}.${_signature_(payload)}`, data: _portalData_("") };
}

function getPortalData(token, displayName) {
  _requirePortalSession_(token);
  return _portalData_(_reservationName_(displayName, false));
}

function _portalData_(name, scheduleValues) {
  const values = scheduleValues || _tab_(PORTAL_TABS.schedule).getDataRange().getValues().slice(1);
  const settings = _tab_(PORTAL_TABS.settings).getDataRange().getValues().slice(1);
  const configuredTelegramUrl = String(settings.find((row) => row[0] === "telegram_invite_url")?.[1] || "");
  const telegramUrl = /^https:\/\/t\.me\/[A-Za-z0-9_+/-]+$/.test(configuredTelegramUrl) ? configuredTelegramUrl : "";

  return {
    displayName: name,
    telegramUrl: String(telegramUrl),
    slots: values.map((row) => ({
      weekday: Number(row[0]),
      startsAt: String(row[1]),
      occupantName: String(row[2] || ""),
      mine: Boolean(name) && _studentNameKey_(row[2]) === _studentNameKey_(name),
    })),
  };
}

function bookSlot(token, weekday, startsAt, displayName) {
  _requirePortalSession_(token);
  const name = _reservationName_(displayName, true);
  const day = Number(weekday);
  const time = String(startsAt);
  if (!Number.isInteger(day) || day < 1 || day > 5 || !/^([01]\d|2[0-3]):(00|15|30|45)$/.test(time)) {
    throw new Error("Créneau invalide.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = _tab_(PORTAL_TABS.schedule);
    const rows = sheet.getDataRange().getValues();
    const index = rows.findIndex((row, rowIndex) => rowIndex > 0 && Number(row[0]) === day && String(row[1]) === time);
    if (index < 1) throw new Error("Ce créneau n'existe pas.");
    if (rows[index][2]) return { booked: false, data: _portalData_(name, rows.slice(1)) };

    const owner = `shared:${_pinHash_(_studentNameKey_(name))}`;
    const booking = [name, owner, new Date()];
    sheet.getRange(index + 1, 3, 1, 3).setValues([booking]);
    rows[index].splice(2, 3, ...booking);
    return { booked: true, data: _portalData_(name, rows.slice(1)) };
  } finally {
    lock.releaseLock();
  }
}

function cancelSlot(token, weekday, startsAt, displayName) {
  _requirePortalSession_(token);
  const name = _reservationName_(displayName, true);
  const day = Number(weekday);
  const time = String(startsAt);
  if (!Number.isInteger(day) || day < 1 || day > 5 || !/^([01]\d|2[0-3]):(00|15|30|45)$/.test(time)) {
    throw new Error("Créneau invalide.");
  }
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = _tab_(PORTAL_TABS.schedule);
    const rows = sheet.getDataRange().getValues();
    const index = rows.findIndex((row, rowIndex) => rowIndex > 0 && Number(row[0]) === day && String(row[1]) === time);
    if (index < 1) throw new Error("Ce créneau n'existe pas.");
    if (_studentNameKey_(rows[index][2]) !== _studentNameKey_(name)) {
      return { cancelled: false, data: _portalData_(name, rows.slice(1)) };
    }

    sheet.getRange(index + 1, 3, 1, 3).clearContent();
    rows[index].splice(2, 3, "", "", "");
    return { cancelled: true, data: _portalData_(name, rows.slice(1)) };
  } finally {
    lock.releaseLock();
  }
}

function _ensureTab_(spreadsheet, name, headers) {
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function _tab_(name) {
  const id = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  if (!id) throw new Error("Le planning n'est pas encore initialisé par l'administrateur.");
  if (!portalSpreadsheet) portalSpreadsheet = SpreadsheetApp.openById(id);
  const sheet = portalSpreadsheet.getSheetByName(name);
  if (!sheet) throw new Error("Onglet manquant : " + name);
  return sheet;
}

function _readAccounts_(sheet) {
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues().map((row) => ({
    id: String(row[0]),
    name: String(row[1]),
    pinHash: String(row[2]),
    active: row[3] === true,
    version: Number(row[4]) || 1,
  }));
}

function _pinHash_(pin) {
  const pepper = PropertiesService.getScriptProperties().getProperty("PIN_PEPPER");
  if (!pepper) throw new Error("Le script doit être initialisé par l'administrateur.");
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(String(pin), pepper)).replace(/=+$/, "");
}

function _signature_(payload) {
  const secret = PropertiesService.getScriptProperties().getProperty("SESSION_SECRET");
  if (!secret) throw new Error("Le script doit être initialisé par l'administrateur.");
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(payload, secret)).replace(/=+$/, "");
}

function _reservationName_(displayName, required) {
  const name = String(displayName || "").trim();
  if ((!name && required) || (name && (name.length < 2 || name.length > 80))) {
    throw new Error("Indiquez votre nom (entre 2 et 80 caractères) pour gérer vos réservations.");
  }
  return name;
}

function _studentNameKey_(name) {
  return String(name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, " ").toLocaleLowerCase("fr");
}

function _constantTimeEquals_(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return difference === 0;
}

function _requirePortalSession_(token) {
  const parts = String(token || "").split(".");
  if (parts.length !== 4) throw new Error("Session expirée. Reconnectez-vous.");
  const [id, versionText, expiresText, signature] = parts;
  const expiresAt = Number(expiresText);
  const payload = `${id}.${versionText}.${expiresText}`;
  if (id !== "shared" || versionText !== "1" || !Number.isFinite(expiresAt) || expiresAt <= Date.now() || !_constantTimeEquals_(signature, _signature_(payload))) {
    throw new Error("Session expirée. Reconnectez-vous.");
  }
}

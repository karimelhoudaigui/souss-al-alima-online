import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = readFileSync(new URL("../google-apps-script/Code.gs", import.meta.url), "utf8");

function portal() {
  const rows = [
    ["Jour", "Heure", "Nom", "Propriétaire", "Modifié"],
    [1, "21:00", "Anas", "legacy-account-id", "existing-date"],
    [1, "21:15", "", "", ""],
  ];
  const properties = new Map([
    ["SPREADSHEET_ID", "test-sheet"],
    ["PIN_PEPPER", "test-pepper"],
    ["SESSION_SECRET", "test-session-secret"],
  ]);
  const schedule = {
    getDataRange: () => ({ getValues: () => rows.map((row) => [...row]) }),
    getRange(row, column, height, width) {
      return {
        setValues(values) {
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) rows[row - 1 + y][column - 1 + x] = values[y][x];
          }
        },
        clearContent() {
          for (let x = 0; x < width; x++) rows[row - 1][column - 1 + x] = "";
        },
      };
    },
  };
  const settings = {
    getDataRange: () => ({ getValues: () => [["Clé", "Valeur"], ["telegram_invite_url", "https://t.me/test_group"]] }),
  };
  const context = vm.createContext({
    PropertiesService: { getScriptProperties: () => ({ getProperty: (key) => properties.get(key) }) },
    Utilities: {
      computeHmacSha256Signature: (value, secret) => createHmac("sha256", secret).update(value).digest(),
      base64EncodeWebSafe: (value) => Buffer.from(value).toString("base64url"),
    },
    SpreadsheetApp: {
      openById: () => ({
        getSheetByName(name) {
          if (name === "Planning") return schedule;
          if (name === "Configuration") return settings;
          throw new Error("Access must not depend on individual accounts.");
        },
      }),
    },
    LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  });
  vm.runInContext(source, context);
  return { api: context, rows };
}

test("the shared password opens the schedule without a name or individual account", () => {
  const { api } = portal();
  const { token } = api.login("souss");
  const data = api.getPortalData(token);
  assert.equal(data.displayName, "");
  assert.equal(data.slots.length, 2);
  assert.equal(data.telegramUrl, "https://t.me/test_group");
  assert.equal(data.slots[0].mine, false);
});

test("an empty or incorrect password is rejected", () => {
  const { api } = portal();
  for (const password of [undefined, "", "incorrect", "SOUSS"]) {
    assert.throws(() => api.login(password), /Mot de passe incorrect/);
  }
});

test("missing, forged, and expired sessions cannot read or modify the schedule", () => {
  const { api } = portal();
  const { token } = api.login("souss");
  const expiredPayload = "shared.1.1";
  const expiredSignature = createHmac("sha256", "test-session-secret").update(expiredPayload).digest("base64url");
  for (const invalid of ["", token + "tampered", `${expiredPayload}.${expiredSignature}`]) {
    assert.throws(() => api.getPortalData(invalid), /Session expirée/);
    assert.throws(() => api.bookSlot(invalid, 1, "21:15", "Test"), /Session expirée/);
    assert.throws(() => api.cancelSlot(invalid, 1, "21:00", "Anas"), /Session expirée/);
  }
});

test("a name is required only when booking, and an occupied slot cannot be overwritten", () => {
  const { api, rows } = portal();
  const { token } = api.login("souss");
  assert.throws(() => api.bookSlot(token, 1, "21:15"), /Indiquez votre nom/);
  assert.equal(api.bookSlot(token, 1, "21:15", "  Nouvel élève  ").booked, true);
  assert.equal(rows[2][2], "Nouvel élève");
  assert.equal(api.bookSlot(token, 1, "21:15", "Autre élève").booked, false);
  assert.equal(rows[2][2], "Nouvel élève");
});

test("existing reservations are recognized by the declared name without changing them", () => {
  const { api, rows } = portal();
  const { token } = api.login("souss");
  assert.equal(api.getPortalData(token, " anas ").slots[0].mine, true);
  assert.equal(rows[1][3], "legacy-account-id");
  assert.equal(rows[1][4], "existing-date");
});

test("cancellation requires the name on the reservation", () => {
  const { api, rows } = portal();
  const { token } = api.login("souss");
  assert.equal(api.cancelSlot(token, 1, "21:00", "Autre élève").cancelled, false);
  assert.equal(rows[1][2], "Anas");
  assert.equal(api.cancelSlot(token, 1, "21:00", "ANAS").cancelled, true);
  assert.deepEqual(rows[1].slice(2), ["", "", ""]);
});

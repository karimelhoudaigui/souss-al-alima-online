import { createHmac } from "node:crypto";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const source = readFileSync(new URL("../../google-apps-script/Code.gs", import.meta.url), "utf8");

export function portal(initialRows) {
  const rows = initialRows || [
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


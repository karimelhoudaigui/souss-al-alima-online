import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { portal } from "./helpers/portal-server.mjs";

function renderPortalEmbed(origin, channel = "test-embed-123") {
  const { api } = portal();
  let embed;
  const output = {
    setTitle() { return this; },
    addMetaTag() { return this; },
    setXFrameOptionsMode() { return this; },
  };
  api.HtmlService = {
    XFrameOptionsMode: { ALLOWALL: "ALLOWALL" },
    createTemplateFromFile() {
      return { evaluate() { embed = this.embed; return output; } };
    },
  };
  api.doGet({ parameter: { parentOrigin: origin, embedId: channel } });
  return JSON.parse(JSON.stringify(embed));
}

test("the student portal adapts its frame on the custom domain and existing site", () => {
  for (const origin of [
    "https://soussalalima.fr",
    "https://www.soussalalima.fr",
    "https://karimelhoudaigui.github.io",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
  ]) {
    assert.deepEqual(renderPortalEmbed(origin), { origin, channel: "test-embed-123" });
  }
});

test("the student portal rejects unrelated origins and malformed frame channels", () => {
  for (const origin of [
    "https://soussalalima.fr.example.com",
    "https://www.soussalalima.fr.example.com",
    "http://soussalalima.fr",
    "https://soussalalima.fr/",
    "https://another-site.fr",
    "",
  ]) {
    assert.equal(renderPortalEmbed(origin), null);
  }
  assert.equal(renderPortalEmbed("https://soussalalima.fr", ""), null);
  assert.equal(renderPortalEmbed("https://soussalalima.fr", "invalid channel!"), null);
});

test("the shared password opens the schedule without a name or individual account", () => {
  const { api } = portal();
  const { token } = api.login("souss");
  const data = api.getPortalData(token);
  assert.equal(data.displayName, "");
  assert.equal(data.slots.length, 2);
  assert.equal(data.telegramUrl, "https://t.me/test_group");
  assert.equal(data.slots[0].mine, false);
});

test("login, booking, and cancellation return the updated schedule without a second request", () => {
  const { api } = portal();
  const result = api.login("souss");
  assert.equal(result.data.slots.length, 2);
  const booked = api.bookSlot(result.token, 1, "21:15", "Test");
  assert.equal(booked.data.slots[1].occupantName, "Test");
  assert.equal(booked.data.slots[1].mine, true);
  const cancelled = api.cancelSlot(result.token, 1, "21:15", "Test");
  assert.equal(cancelled.data.slots[1].occupantName, "");
});

test("invalid times and days cannot change any reservation", () => {
  const { api, rows } = portal();
  const { token } = api.login("souss");
  const before = JSON.stringify(rows);
  for (const [day, time] of [[0, "21:00"], [6, "21:00"], [1, "21:07"], [1, "invalid"]]) {
    assert.throws(() => api.bookSlot(token, day, time, "Test"), /Créneau invalide/);
    assert.throws(() => api.cancelSlot(token, day, time, "Anas"), /Créneau invalide/);
  }
  assert.equal(JSON.stringify(rows), before);
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

test("an existing reservation can be found and cancelled despite accents, spacing and case", () => {
  const { api, rows } = portal();
  rows[1][2] = "Saïda  Ben Ali";
  const { token } = api.login("souss");
  assert.equal(api.getPortalData(token, "  SAIDA BEN ALI  ").slots[0].mine, true);
  assert.equal(api.cancelSlot(token, 1, "21:00", "saida ben ali").cancelled, true);
  assert.equal(rows[1][2], "");
});

test("cancelling one of several reservations preserves every other slot", () => {
  const { api, rows } = portal();
  rows[2][2] = "Anas";
  rows.push([2, "21:00", "Autre élève", "other-owner", "original-date"]);
  const before = JSON.stringify(rows[3]);
  const { token } = api.login("souss");
  assert.equal(api.cancelSlot(token, 1, "21:15", "Anas").cancelled, true);
  assert.equal(rows[1][2], "Anas");
  assert.equal(JSON.stringify(rows[3]), before);
  assert.equal(api.cancelSlot(token, 1, "21:15", "Anas").cancelled, false);
});

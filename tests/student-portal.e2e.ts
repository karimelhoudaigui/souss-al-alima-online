import { test, expect, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { portal } from "./helpers/portal-server.mjs";

const html = readFileSync(new URL("../google-apps-script/Portal.html", import.meta.url), "utf8");

async function setup(page: Page, blockFirstDocument = false) {
  const rows: (string | number)[][] = [["Jour", "Heure", "Nom", "Propriétaire", "Modifié"]];
  for (let day = 1; day <= 5; day++) {
    for (let quarter = 0; quarter < 12; quarter++) {
      rows.push([day, `${21 + Math.floor(quarter / 4)}:${String(quarter % 4 * 15).padStart(2, "0")}`, day === 1 && quarter === 0 ? "Anas" : "", "", ""]);
    }
  }
  const server = portal(rows);
  const calls: string[] = [];
  const control = { fail: "", delay: 0, hold: "", release: () => {} };
  await page.exposeBinding("__portalRpc", async (_, method, args) => {
    calls.push(method);
    if (control.fail === method) { control.fail = ""; throw new Error("Connexion interrompue. Réessayez."); }
    const result = JSON.parse(JSON.stringify(server.api[method](...args)));
    if (control.hold === method) {
      control.hold = "";
      await new Promise<void>((resolve) => { control.release = resolve; });
    } else if (control.delay) await new Promise((resolve) => setTimeout(resolve, control.delay));
    return result;
  });
  let blocked = false;
  await page.route("https://script.google.com/macros/s/**", async (route) => {
    if (blockFirstDocument && !blocked) { blocked = true; await route.abort(); return; }
    const url = new URL(route.request().url());
    const config = { origin: url.searchParams.get("parentOrigin"), channel: url.searchParams.get("embedId") };
    const bridge = `<script>window.google={script:{get run(){let success,failure;const runner=new Proxy({},{get:(_,method)=>{if(method==='withSuccessHandler')return callback=>{success=callback;return runner};if(method==='withFailureHandler')return callback=>{failure=callback;return runner};return (...args)=>window.__portalRpc(method,args).then(success,failure)}});return runner}}};</script>`;
    const body = html.replace("<?!= JSON.stringify(embed) ?>", JSON.stringify(config)).replace("<script>", () => bridge + "<script>");
    await route.fulfill({ contentType: "text/html", body });
  });
  if (blockFirstDocument) await page.clock.install();
  await page.goto("/espace-eleves");
  if (blockFirstDocument) {
    await expect(page.getByRole("status").filter({ hasText: "Ouverture de l’espace élèves" })).toBeVisible();
    await expect(page.locator("#espace-eleves iframe")).toHaveAttribute("aria-hidden", "true");
    await page.clock.fastForward(16000);
    await expect(page.getByRole("link", { name: "Ouvrir le planning", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Réessayer", exact: true }).click();
  }
  const frame = page.frameLocator("#espace-eleves iframe");
  await expect(frame.locator("#login")).toBeVisible();
  return { frame, calls, control, server };
}

test("a failed initial load shows useful feedback and a retry opens the password form", async ({ page }) => {
  const { frame } = await setup(page, true);
  await expect(frame.locator("#login")).toBeVisible();
  expect((await page.locator("#espace-eleves iframe").boundingBox())!.height).toBeLessThan(400);
});

async function signIn(frame: ReturnType<Page["frameLocator"]>) {
  await frame.getByLabel("Mot de passe", { exact: true }).fill("souss");
  await frame.getByRole("button", { name: "Se connecter", exact: true }).click();
  await expect(frame.locator("table")).toBeVisible();
}

test("password form stays compact and the planning opens in a single server call", async ({ page }) => {
  const { frame, calls } = await setup(page);
  const iframe = page.locator("#espace-eleves iframe");
  await expect(iframe).toHaveAttribute("aria-hidden", "false");
  expect((await iframe.boundingBox())!.height).toBeLessThan(400);
  await expect(frame.locator("#login input")).toHaveCount(1);
  await frame.getByLabel("Mot de passe", { exact: true }).fill("incorrect");
  await frame.getByRole("button", { name: "Se connecter", exact: true }).click();
  await expect(frame.getByRole("alert")).toContainText("Mot de passe incorrect");
  await signIn(frame);
  expect(calls).toEqual(["login", "login"]);
  await expect(frame.locator("tbody td")).toHaveCount(60);
  await expect(frame.locator(".telegram a")).toHaveAttribute("href", "https://t.me/test_group");
  const height = (await iframe.boundingBox())!.height;
  await page.evaluate(() => window.postMessage({ type: "student-portal-height", channel: "wrong", height: 5000 }, "*"));
  expect((await iframe.boundingBox())!.height).toEqual(height);
});

test("other students are plain text, and setting a name is immediate", async ({ page }) => {
  const { frame, calls } = await setup(page);
  await signIn(frame);
  const occupant = frame.locator(".occupant").first();
  await expect(occupant).toHaveText("Anas");
  await expect(frame.locator("td.occupied button")).toHaveCount(0);
  expect(await occupant.evaluate((element) => getComputedStyle(element).cursor)).toEqual("default");
  await occupant.hover();
  expect(calls).toEqual(["login"]);
  await frame.getByLabel("Votre nom pour vos réservations").fill("Anas");
  await frame.getByRole("button", { name: "Valider mon nom" }).click();
  await expect(frame.locator("[data-cancel]")).toHaveCount(1);
  expect(calls).toEqual(["login"]);
});

test("booking, repeated clicks, cancellation and keyboard input work without extra reloads", async ({ page }) => {
  const { frame, calls, control } = await setup(page);
  await signIn(frame);
  const slot = frame.locator('[data-book="1|21:15"]');
  await slot.click();
  await expect(frame.locator(".notice")).toContainText("Indiquez votre nom");
  await frame.getByLabel("Votre nom pour vos réservations").fill("Élève de test");
  await frame.getByLabel("Votre nom pour vos réservations").press("Enter");
  control.delay = 200;
  await slot.dispatchEvent("click");
  await slot.dispatchEvent("click");
  await expect(frame.locator("#app")).toHaveAttribute("aria-busy", "true");
  await expect(frame.locator(".notice")).toContainText("Réservation du créneau");
  await expect(frame.locator('[data-cancel="1|21:15"]')).toBeVisible();
  expect(calls.filter((name) => name === "bookSlot")).toHaveLength(1);
  expect(calls).not.toContain("getPortalData");
  page.once("dialog", (dialog) => dialog.dismiss());
  await frame.locator('[data-cancel="1|21:15"]').click();
  expect(calls).not.toContain("cancelSlot");
  page.once("dialog", (dialog) => dialog.accept());
  await frame.locator('[data-cancel="1|21:15"]').click();
  await expect(frame.locator('[data-book="1|21:15"]')).toBeVisible();
  expect(calls.filter((name) => name === "cancelSlot")).toHaveLength(1);
  expect(calls).not.toContain("getPortalData");
});

test("network errors retain the planning, permit retry, and do not reopen a logged-out session", async ({ page }) => {
  const { frame, control } = await setup(page);
  await signIn(frame);
  control.fail = "getPortalData";
  await frame.getByRole("button", { name: "Actualiser", exact: true }).click();
  await expect(frame.locator(".notice")).toContainText("Connexion interrompue");
  await expect(frame.locator("table")).toBeVisible();
  await frame.getByRole("button", { name: "Actualiser", exact: true }).click();
  await expect(frame.locator(".notice")).toContainText("Planning à jour");
  control.hold = "getPortalData";
  await frame.getByRole("button", { name: "Actualiser", exact: true }).click();
  await frame.getByRole("button", { name: "Se déconnecter", exact: true }).click();
  control.release();
  await expect(frame.locator("#login")).toBeVisible();
  await expect(frame.locator("table")).toHaveCount(0);
});

test("a delayed reservation is reconciled before another booking is allowed", async ({ page }) => {
  const { frame, control, calls } = await setup(page);
  await signIn(frame);
  await page.clock.install();
  await frame.getByLabel("Votre nom pour vos réservations").fill("Test attente");
  control.hold = "bookSlot";
  await frame.locator('[data-book="1|21:15"]').click();
  await expect.poll(() => calls.filter((name) => name === "bookSlot").length).toEqual(1);
  await page.clock.fastForward(31000);
  await expect(frame.locator(".notice")).toContainText("Actualisez le planning");
  await expect(frame.locator('[data-book="1|21:15"]')).toBeDisabled();
  await frame.getByRole("button", { name: "Actualiser", exact: true }).click();
  await expect(frame.locator('[data-cancel="1|21:15"]')).toBeVisible();
  control.release();
  expect(calls.filter((name) => name === "bookSlot")).toHaveLength(1);
});

test("reload restores the session and name without asking for the password again", async ({ page }) => {
  const { frame, calls } = await setup(page);
  await signIn(frame);
  await frame.getByLabel("Votre nom pour vos réservations").fill("Nom conservé");
  await frame.getByRole("button", { name: "Valider mon nom" }).click();
  await page.reload();
  await expect(frame.locator("table")).toBeVisible();
  await expect(frame.getByLabel("Votre nom pour vos réservations")).toHaveValue("Nom conservé");
  expect(calls).toEqual(["login", "getPortalData"]);
});

test("days are readable on mobile and long names remain plain text", async ({ page }, testInfo) => {
  const { frame } = await setup(page);
  await signIn(frame);
  const isMobile = testInfo.project.name === "mobile";
  if (isMobile) {
    for (const day of ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]) {
      await frame.getByRole("tab", { name: day, exact: true }).click();
      await expect(frame.locator("tbody td:visible")).toHaveCount(12);
    }
    await frame.getByRole("tab", { name: "Lundi", exact: true }).click();
  } else await expect(frame.locator("tbody td:visible")).toHaveCount(60);
  await frame.getByLabel("Votre nom pour vos réservations").fill('<img src=x onerror="alert(1)">');
  await frame.locator('[data-book="1|21:15"]').click();
  await expect(frame.locator(".occupant").filter({ hasText: "onerror" })).toHaveCount(1);
  await expect(frame.locator("#app img")).toHaveCount(0);
  expect(await frame.locator("body").evaluate((body) => body.scrollWidth <= body.clientWidth)).toEqual(true);
});

test("the methodology video uses the trimmed clip and plays without controls", async ({ page }) => {
  await page.goto("/");
  const video = page.locator("#methode video");
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute("src", /tradition-bg-trimmed\.mp4/);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState)).toBeGreaterThanOrEqual(2);
  const metadata = await video.evaluate((element: HTMLVideoElement) => ({ duration: element.duration, muted: element.muted, controls: element.controls, inline: element.playsInline }));
  expect(metadata.duration).toBeGreaterThan(11);
  expect(metadata.duration).toBeLessThan(12);
  expect(metadata.muted).toEqual(true);
  expect(metadata.controls).toEqual(false);
  expect(metadata.inline).toEqual(true);
});

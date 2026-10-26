import { test, expect, type Page } from "@playwright/test";

const sections = [
  { label: "Cursus", id: "cursus" },
  { label: "Méthodologie", id: "methode" },
  { label: "Contact", id: "contact" },
  { label: "Accueil", id: "accueil" },
];

async function aligned(page: Page, id: string) {
  await expect(page).toHaveURL(new RegExp(`#${id}$`));
  await expect.poll(() => page.evaluate((targetId) => {
    const target = document.getElementById(targetId);
    if (!target) return Infinity;
    const top = target.getBoundingClientRect().top + window.scrollY;
    const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const expected = targetId === "accueil" ? 0 : Math.min(top, maximum);
    return Math.abs(window.scrollY - expected);
  }, id), { message: `The page must reach #${id}` }).toBeLessThan(4);
}

async function headerLink(page: Page, label: string, mobile: boolean) {
  if (mobile) await page.getByRole("button", { name: "Ouvrir le menu", exact: true }).click();
  await page.locator("header").getByRole("link", { name: label, exact: true }).click();
  if (mobile) await expect(page.getByRole("button", { name: "Ouvrir le menu", exact: true })).toHaveAttribute("aria-expanded", "false");
}

test.beforeEach(async ({ page }) => {
  // Navigation remains usable while Google has not opened the student portal.
  await page.route("https://script.google.com/macros/s/**", (route) => route.abort());
});

test("header menu links reach each section on the home page", async ({ page }, testInfo) => {
  await page.goto("/");
  for (const section of sections) {
    await headerLink(page, section.label, testInfo.project.name === "mobile");
    await aligned(page, section.id);
  }
});

test("footer links return from the student page to the requested section", async ({ page }) => {
  for (const section of sections) {
    await page.goto("/espace-eleves");
    await page.locator("footer").getByRole("link", { name: section.label, exact: true }).click();
    await aligned(page, section.id);
  }
});

test("a repeated link and browser back and forward keep the correct section", async ({ page }, testInfo) => {
  const mobile = testInfo.project.name === "mobile";
  await page.goto("/");
  await headerLink(page, "Cursus", mobile);
  await aligned(page, "cursus");
  await page.evaluate(() => window.scrollTo(0, 0));
  await headerLink(page, "Cursus", mobile);
  await aligned(page, "cursus");
  await headerLink(page, "Méthodologie", mobile);
  await aligned(page, "methode");
  await page.goBack();
  await aligned(page, "cursus");
  await page.goForward();
  await aligned(page, "methode");
});

test("direct section links and navigation to the student page work", async ({ page }, testInfo) => {
  await page.goto("/#methode");
  await aligned(page, "methode");
  await headerLink(page, "Espace élèves", testInfo.project.name === "mobile");
  await expect(page).toHaveURL(/\/espace-eleves$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
  await headerLink(page, "Contact", testInfo.project.name === "mobile");
  await aligned(page, "contact");
});

test("course tabs change the selected course and its content", async ({ page }) => {
  await page.goto("/#cursus");
  for (let index = 0; index < 3; index++) {
    const tab = page.locator(`#cursus-tab-${index}`);
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    await expect(page.getByRole("tabpanel")).toHaveAttribute("aria-labelledby", `cursus-tab-${index}`);
    await expect(page.getByRole("tabpanel").getByRole("heading", { level: 3 })).toHaveText(index === 0 ? "Cursus Coran" : index === 1 ? "Séminaires de Tajwīd" : "Cursus langue arabe");
  }
});

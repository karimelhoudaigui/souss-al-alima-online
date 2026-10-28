import { test, expect } from "@playwright/test";

test("riwayat identify the correct reader and narrator in every language", async ({ page }, testInfo) => {
  await page.goto("/#riwayat");
  for (const language of ["FR", "EN", "ES"]) {
    if (testInfo.project.name === "mobile") await page.getByRole("button", { name: /Ouvrir le menu|Open menu|Abrir menú/, exact: true }).click();
    await page.locator("header").getByRole("button", { name: language, exact: true }).click();
    if (testInfo.project.name === "mobile") await page.locator("header > div").first().getByRole("button").click();
    for (const [name, reader, narrator] of [
      ["Ḥafṣ ʿan ʿĀṣim", "ʿĀṣim al-Kūfī", "Ḥafṣ ibn Sulaymān"],
      ["Qālūn ʿan Nāfiʿ", "Nāfiʿ al-Madanī", "ʿĪsā ibn Mīnā"],
      ["Warsh ʿan Nāfiʿ", "Nāfiʿ al-Madanī", "ʿUthmān ibn Saʿīd"],
    ]) {
      await page.locator("#riwayat").getByRole("button", { name: new RegExp(name) }).click();
      await expect(page.locator("#riwayat h3")).toHaveText(name);
      await expect(page.locator("#riwayat dd").nth(0)).toContainText(reader);
      await expect(page.locator("#riwayat dd").nth(1)).toContainText(narrator);
      await expect(page.locator("#riwayat")).not.toContainText("al-Arzāq");
    }
    await expect(page.locator("#riwayat dd").nth(3)).toContainText("al-Azraq");
    await expect(page.locator('#riwayat a[href="https://fonts.qurancomplex.gov.sa/ten-readings/"]')).toBeVisible();
  }
});

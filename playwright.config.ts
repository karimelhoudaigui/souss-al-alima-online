import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.e2e.ts",
  timeout: 25000,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:8080", channel: "chrome", headless: true, locale: "fr-FR", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run dev -- --host 127.0.0.1",
    url: "http://127.0.0.1:8080",
    reuseExistingServer: true,
    env: { VITE_STUDENT_PORTAL_URL: "https://script.google.com/macros/s/AKfycbwPpehdvbNOD4XDWvd38nATwyhzn2UHUP59Meuygqo5-5LAyYITlmh2ciOesq4JOnZm/exec" },
  },
});

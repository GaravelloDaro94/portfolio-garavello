import { test, expect } from "@playwright/test";

test.describe("Portfolio - Navegación Principal", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("debe cargar la página principal correctamente", async ({ page }) => {
    await expect(page).toHaveTitle(/Darío Garavello/);
  });

  test("debe mostrar el header con navegación", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Verificar botón DG
    const dgButton = page.getByRole("button", { name: "DG" });
    await expect(dgButton).toBeVisible();
  });

  test("debe mostrar las secciones principales", async ({ page }) => {
    // Verificar que las secciones existan
    const aboutSection = page.locator("#about");
    const projectsSection = page.locator("#projects");
    const skillsSection = page.locator("#skills");
    const contactSection = page.locator("#contact");

    // Esperar un poco para que la página cargue completamente
    await page.waitForTimeout(1000);
    await expect(aboutSection).toBeVisible();

    // Scroll para verificar otras secciones
    await projectsSection.scrollIntoViewIfNeeded();
    await expect(projectsSection).toBeVisible();

    await skillsSection.scrollIntoViewIfNeeded();
    await expect(skillsSection).toBeVisible();

    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });

  test("debe navegar correctamente usando el menú", async ({ page }) => {
    // Click en botón de About del header - usar first() para obtener el del menú
    const aboutButton = page.getByRole("button", { name: /about/i }).first();
    await aboutButton.click();

    // Esperar scroll
    await page.waitForTimeout(500);

    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
  });
});

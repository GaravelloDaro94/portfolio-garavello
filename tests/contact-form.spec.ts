import { test, expect } from "@playwright/test";

const CONTACT_LABEL = /contacto|contact/i;
const SUBMIT_LABEL = /enviar mensaje|send message/i;

test.describe("Portfolio - Formulario de Contacto", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const contactSection = page.locator("#contact");
    await contactSection.scrollIntoViewIfNeeded();
    await expect(contactSection).toBeVisible();
  });

  test("debe mostrar el formulario de contacto", async ({ page }) => {
    await expect(page.getByPlaceholder(/nombre/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/mensaje/i)).toBeVisible();
    await expect(page.getByRole("button", { name: SUBMIT_LABEL })).toBeVisible();
  });

  test("debe validar campos requeridos", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: SUBMIT_LABEL });
    await submitButton.click();

    // El formulario no debe permitir envío vacío
    const nameInput = page.getByPlaceholder(/nombre/i);
    await expect(nameInput).toBeVisible();

    // Verificar que los campos tienen el atributo required
    await expect(nameInput).toHaveAttribute("required", "");
  });

  test("debe permitir llenar el formulario", async ({ page }) => {
    await page.getByPlaceholder(/nombre/i).fill("Test User");
    await page.getByPlaceholder(/email/i).fill("test@example.com");
    await page.getByPlaceholder(/mensaje/i).fill("Este es un mensaje de prueba e2e");

    // Verificar que los valores se ingresaron
    await expect(page.getByPlaceholder(/nombre/i)).toHaveValue("Test User");
    await expect(page.getByPlaceholder(/email/i)).toHaveValue("test@example.com");
    await expect(page.getByPlaceholder(/mensaje/i)).toHaveValue("Este es un mensaje de prueba e2e");
  });

  test("debe tener estilos correctos en el botón de envío", async ({ page }) => {
    const submitButton = page.getByRole("button", { name: SUBMIT_LABEL });

    // Verificar que tenga borde y font-bold
    const buttonClasses = await submitButton.getAttribute("class");
    expect(buttonClasses).toContain("border-2");
    expect(buttonClasses).toContain("border-light-text");
    expect(buttonClasses).toContain("font-bold");
  });
});

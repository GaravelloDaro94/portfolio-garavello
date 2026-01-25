import { test, expect } from "@playwright/test";

test.describe("Portfolio - Asistente Virtual (Chatbot)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Esperar a que el chatbot cargue (es un componente client-side)
    await page.waitForTimeout(1500);
  });

  test("debe mostrar el botón del chatbot", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: /chatea conmigo/i });
    await expect(chatButton).toBeVisible();
  });

  test("debe abrir el modal del chatbot al hacer click", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: /chatea conmigo/i });
    await chatButton.click();

    // Esperar a que el modal aparezca
    await page.waitForTimeout(500);

    // Verificar que el modal está visible
    const modalHeader = page.getByText(/asistente virtual/i).first();
    await expect(modalHeader).toBeVisible();
  });

  test("debe mostrar preguntas sugeridas", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: /chatea conmigo/i });
    await chatButton.click();
    await page.waitForTimeout(500);

    // Verificar que hay preguntas sugeridas
    const suggestedQuestions = page.locator("button").filter({ hasText: /qué|cuál|cómo/i });
    const count = await suggestedQuestions.count();

    expect(count).toBeGreaterThan(0);
  });

  test("debe cerrar el modal al hacer click en el botón de cerrar", async ({ page }) => {
    // Abrir el chatbot
    const chatButton = page.getByRole("button", { name: /chatea conmigo/i });
    await chatButton.click();
    await page.waitForTimeout(500);

    // Buscar y hacer click en el botón de cerrar (X)
    const closeButton = page.locator("button").filter({ hasText: "✕" });
    await closeButton.click();

    // Esperar a que se cierre
    await page.waitForTimeout(500);

    // Verificar que el modal ya no está visible - buscar en el modal específico
    const chatModal = page.locator("[role='dialog'], .modal, .chatbot-modal");
    await expect(chatModal).not.toBeVisible();
  });

  test("debe permitir escribir un mensaje", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: /chatea conmigo/i });
    await chatButton.click();
    await page.waitForTimeout(500);

    // Buscar el input del mensaje
    const messageInput = page.locator('textarea, input[type="text"]').last();
    await messageInput.fill("Hola, esto es una prueba");

    // Verificar que el texto se ingresó
    await expect(messageInput).toHaveValue("Hola, esto es una prueba");
  });
});

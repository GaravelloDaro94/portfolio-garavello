import { test, expect } from "@playwright/test";

const CHAT_TOGGLE_LABEL = /chatea conmigo|chat with me/i;
const CHAT_HEADER_TITLE = /asistente virtual|virtual assistant/i;
const CHAT_CLOSE_LABEL = /cerrar chat|close chat/i;
const CHAT_INPUT_PLACEHOLDER = /escribe tu pregunta|type your question/i;
const SUGGESTED_LABEL = /preguntas sugeridas|suggested questions/i;

test.describe("Portfolio - Asistente Virtual (Chatbot)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    // Esperar a que el chatbot cargue (es un componente client-side)
    await page.waitForTimeout(1500);
  });

  test("debe mostrar el botón del chatbot", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: CHAT_TOGGLE_LABEL });
    await expect(chatButton).toBeVisible();
  });

  test("debe abrir el modal del chatbot al hacer click", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: CHAT_TOGGLE_LABEL });
    await chatButton.click();

    const chatModal = page.getByRole("dialog");
    await expect(chatModal).toBeVisible();
    await expect(page.getByText(CHAT_HEADER_TITLE).first()).toBeVisible();
  });

  test("debe mostrar preguntas sugeridas", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: CHAT_TOGGLE_LABEL });
    await chatButton.click();

    const chatModal = page.getByRole("dialog");
    await expect(chatModal).toBeVisible();
    await expect(page.getByText(SUGGESTED_LABEL)).toBeVisible();

    const count = await chatModal.getByRole("button").count();

    expect(count).toBeGreaterThanOrEqual(6);
  });

  test("debe cerrar el modal al hacer click en el botón de cerrar", async ({ page }) => {
    // Abrir el chatbot
    const chatButton = page.getByRole("button", { name: CHAT_TOGGLE_LABEL });
    await chatButton.click();

    const chatModal = page.getByRole("dialog");
    await expect(chatModal).toBeVisible();

    // Buscar y hacer click en el botón de cerrar
    const closeButton = chatModal.getByRole("button", { name: CHAT_CLOSE_LABEL });
    await closeButton.click();

    await expect(chatModal).not.toBeVisible();
  });

  test("debe permitir escribir un mensaje", async ({ page }) => {
    const chatButton = page.getByRole("button", { name: CHAT_TOGGLE_LABEL });
    await chatButton.click();

    // Buscar el input del mensaje
    const messageInput = page.getByPlaceholder(CHAT_INPUT_PLACEHOLDER);
    await messageInput.fill("Hola, esto es una prueba");

    // Verificar que el texto se ingresó
    await expect(messageInput).toHaveValue("Hola, esto es una prueba");
  });
});

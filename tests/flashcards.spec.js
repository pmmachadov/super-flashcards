import { test, expect } from "@playwright/test";

test.describe("Flashcards Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("should load the homepage", async ({ page }) => {
    await expect(page).toHaveTitle("Flashcards");

    const appContainer = page.locator(".app-container");
    await expect(appContainer).toBeVisible();

    const activeButton = page.locator(".view-button.active");
    await expect(activeButton).toHaveText("Flashcards");
  });
  test("should be able to switch between views", async ({ page }) => {
    await page.locator('button:has-text("Manage Cards")').click();

    const manageButton = page.locator(".view-button.active");
    await expect(manageButton).toHaveText("Manage Cards");

    await expect(page.locator(".flashcard-manager")).toBeVisible();

    await page.locator('button:has-text("Flashcards")').click();

    const flashcardsButton = page.locator(".view-button.active");
    await expect(flashcardsButton).toHaveText("Flashcards");

    await expect(page.locator(".main-content")).toBeVisible();
  });
  test("should be able to create a new flashcard", async ({ page }) => {
    await page.locator('button:has-text("Manage Cards")').click();

    await page.locator(".new-card-button").click();

    await expect(page.locator(".flashcard-form")).toBeVisible();

    await page.locator("#question").fill("What is Playwright?");
    await page
      .locator("#answer")
      .fill("A testing framework for web applications");

    await page.locator(".submit-button").click();

    await expect(page.locator(".flashcard-form")).not.toBeVisible();

    await page.locator(".search-input").fill("Playwright");

    const questionCell = page.locator(
      'table.flashcards-table td:has-text("What is Playwright?")'
    );
    await expect(questionCell).toBeVisible();
  });
});

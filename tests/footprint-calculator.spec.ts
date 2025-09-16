import { expect, test } from "@playwright/test";

test("redirects to footprint calculator", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Carbon Footprint Calculator/);
});

test("should be able to calculate footprint", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("spinbutton", { name: "Electricity" }).fill("1");
  await page.getByRole("tab", { name: "Transportation" }).click();
  await page.getByRole("spinbutton", { name: "Car" }).fill("1");
  await page.getByRole("button", { name: "Calculate Footprint" }).click();

  await expect(page.getByRole("heading", { name: "Results" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Overall Emissions by Category" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Housing Energy" }),
  ).toBeVisible();
});

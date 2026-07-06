import { test, expect } from '@playwright/test';

test('home page loads @offline @stack', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('schedule page shows classes @offline', async ({ page }) => {
  await page.goto('/schedule');
  await expect(page.getByRole('heading', { name: /расписание|schedule/i })).toBeVisible();
});

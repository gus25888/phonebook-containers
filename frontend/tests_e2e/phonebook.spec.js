import { test, expect } from '@playwright/test';

test.describe('Validate elements in page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test('has title', async ({ page }) => {
    await expect(page.getByText('Phonebook')).toBeVisible();
  });

  test('has form', async ({ page }) => {
    await expect(page.getByText('add a new')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'name:' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'number:' })).toBeVisible()
    const addButton = page.getByRole('button', { name: 'add' })
    await expect(addButton).toBeVisible()
  });

})
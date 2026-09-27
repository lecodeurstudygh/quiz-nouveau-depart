import { test, expect } from '@playwright/test';

test.use({
  viewport: { width: 360, height: 780 },
});

test('verify mobile features and custom dropdowns', async ({ page }) => {
  // 1. Home page in FR
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/test_home_fr.png' });

  // Verify English week prefix
  const langButton = page.locator('button:has-text("FR")');
  if (await langButton.isVisible()) {
    await langButton.click();
    await page.waitForTimeout(300);
    // Check that W1 appears in pills and badge
    await expect(page.locator('text=W1').first()).toBeVisible();
    await page.screenshot({ path: '/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/test_home_en.png' });
  }

  // 2. Discussion page and custom dropdown
  await page.goto('http://localhost:3000/discussion');
  await page.waitForLoadState('networkidle');
  
  // Find custom dropdown trigger button inside main
  const weekDropdown = page.locator('main button:has-text("Week"), main button:has-text("Semaine")').first();
  await expect(weekDropdown).toBeVisible();
  await weekDropdown.click();
  await page.waitForTimeout(400);

  // Bottom drawer should be visible with title
  await page.screenshot({ path: '/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/test_discussion_dropdown.png' });

  // 3. Verses (Cards) page and custom dropdown
  await page.goto('http://localhost:3000/cards');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: '/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/test_cards_page.png' });
});

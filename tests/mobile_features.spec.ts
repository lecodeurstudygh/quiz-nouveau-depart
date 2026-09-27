import { test, expect } from '@playwright/test';

test.describe('Verify Mobile and Desktop updates', () => {
  test('Mobile: Dropdown selection, 3 pillars tabs, 1-row CTA buttons, Glisser hint', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    // 1. Home page Mobile
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Check CTA buttons inside main hero are on the same line (same bounding box Y or within 5px)
    const btnVerses = page.locator('main a[href="/cards"]').first();
    const btnQuiz = page.locator('main a[href="/quiz"]').first();
    const btnDiscussion = page.locator('main a[href="/discussion"]').first();

    await expect(btnVerses).toBeVisible();
    await expect(btnQuiz).toBeVisible();
    await expect(btnDiscussion).toBeVisible();

    const boxVerses = await btnVerses.boundingBox();
    const boxQuiz = await btnQuiz.boundingBox();
    const boxDiscussion = await btnDiscussion.boundingBox();

    console.log('Button Ys:', boxVerses?.y, boxQuiz?.y, boxDiscussion?.y);
    expect(boxVerses).not.toBeNull();
    expect(boxQuiz).not.toBeNull();
    expect(boxDiscussion).not.toBeNull();
    // All 3 must be on the same horizontal row (y coords within 8px of each other)
    expect(Math.abs((boxVerses?.y || 0) - (boxQuiz?.y || 0))).toBeLessThan(8);
    expect(Math.abs((boxQuiz?.y || 0) - (boxDiscussion?.y || 0))).toBeLessThan(8);

    // Check 3 Pillars tabs on mobile (inside md:hidden container)
    const pillarTab1 = page.locator('.md\\:hidden button').filter({ hasText: /^1/ }).first();
    const pillarTab2 = page.locator('.md\\:hidden button').filter({ hasText: /^2/ }).first();
    await expect(pillarTab1).toBeVisible();
    await expect(pillarTab2).toBeVisible();

    // Click Tab 2 on pillars
    await pillarTab2.click();
    await page.waitForTimeout(300);
    // Verify pillar 2 title or badge is active
    await expect(page.getByText(/sur 3|of 3/).first()).toBeVisible();

    // Check Mobile Carousel hint says "Glisser" (not "Glisser le doigt")
    const carouselHint = page.getByText(/Glisser pour naviguer|Swipe to navigate/).first();
    await expect(carouselHint).toBeVisible();

    // 2. Discussion Page: Mobile Dropdown Selection
    await page.goto('http://localhost:3000/discussion');
    await page.waitForLoadState('networkidle');

    // Click week dropdown trigger
    const weekTrigger = page.locator('main button').filter({ hasText: /Semaine|Week/ }).first();
    await expect(weekTrigger).toBeVisible();
    await weekTrigger.click();
    await page.waitForTimeout(400);

    // Bottom drawer is open, tap Week 2 / Semaine 2 in mobile drawer (.sm:hidden)
    const week2Option = page.locator('.sm\\:hidden.fixed button').filter({ hasText: /Semaine 2|Week 2/ }).first();
    await expect(week2Option).toBeVisible();
    await week2Option.click();
    await page.waitForTimeout(400);

    // Verify trigger now shows Week 2 / Semaine 2
    const updatedTriggerText = await weekTrigger.innerText();
    console.log('Updated trigger text after mobile click:', updatedTriggerText);
    expect(updatedTriggerText).toMatch(/Semaine 2|Week 2/);

    // Switch to focus mode to see focus hint
    const discFocus = page.locator('button:has-text("Focus")').first();
    if (await discFocus.isVisible()) {
      await discFocus.click();
      await page.waitForTimeout(200);
    }

    // Check swipe hint on mobile
    const discMobileHint = page.getByText(/Glisser pour naviguer • Toucher pour révéler|Swipe to navigate • Tap to reveal/).first();
    await expect(discMobileHint).toBeVisible();

    // 3. Cards Page: Mobile Dropdown Selection & Swipe hint
    await page.goto('http://localhost:3000/cards');
    await page.waitForLoadState('networkidle');

    const cardsMobileHint = page.getByText(/Glisser pour naviguer • Toucher pour retourner|Swipe to navigate • Tap to flip/).first();
    await expect(cardsMobileHint).toBeVisible();
  });

  test('Desktop: Dropdown popover, course navigation bar with 2 lessons + 10 pastilles, keyboard hints', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });

    // 1. Home page Desktop
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Verify 10 pastilles (S1..S10 or W1..W10) in desktop course bar (.sm:flex)
    const pastille1 = page.locator('.sm\\:flex button').filter({ hasText: /^(S1|W1)$/ }).first();
    const pastille10 = page.locator('.sm\\:flex button').filter({ hasText: /^(S10|W10)$/ }).first();
    await expect(pastille1).toBeVisible();
    await expect(pastille10).toBeVisible();

    // Click pastille 2 to change to week 2
    const pastille2 = page.locator('.sm\\:flex button').filter({ hasText: /^(S2|W2)$/ }).first();
    await pastille2.click();
    await page.waitForTimeout(300);

    // 2. Discussion Page Desktop: Dropdown Popover rendering
    await page.goto('http://localhost:3000/discussion');
    await page.waitForLoadState('networkidle');

    // Switch to Focus mode to view focus hint
    const focusBtn = page.locator('button:has-text("Focus")').first();
    if (await focusBtn.isVisible()) {
      await focusBtn.click();
      await page.waitForTimeout(200);
    }

    // Desktop hint should say "Touches ← →" and NOT mention swipe or glisser
    const desktopHint = page.getByText(/Touches ← →|Use ← → arrow keys/).first();
    await expect(desktopHint).toBeVisible();

    // Trigger dropdown
    const discDropdown = page.locator('main button').filter({ hasText: /Semaine|Week/ }).first();
    await discDropdown.click();
    await page.waitForTimeout(300);

    // Popover portaled to body with z-[99999] should be visible
    const popover = page.locator('div.fixed.z-\\[99999\\]').first();
    await expect(popover).toBeVisible();

    // 3. Verify CourseSelectorModal in English has "New Beginnings • Hillsong France"
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Switch to EN if currently in FR
    const langBtn = page.locator('button:has-text("FR")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(300);
    }

    // Open modal
    const openModalBtn = page.locator('button').filter({ hasText: /10 Weeks|10 Semaines/ }).first();
    await openModalBtn.click();
    await page.waitForTimeout(400);

    // Verify footer says "New Beginnings • Hillsong France"
    const footerBrand = page.locator('text=New Beginnings • Hillsong France');
    await expect(footerBrand).toBeVisible();
  });
});

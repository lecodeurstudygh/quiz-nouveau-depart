import { chromium } from "playwright";

async function run() {
  console.log("Starting Playwright verification for Verse Pill hover & click modal...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:3000/discussion", { waitUntil: "networkidle" });
    console.log("Loaded /discussion page.");

    // Flip card to verso
    const cardInner = page.locator(".card-inner").first();
    await cardInner.click();
    await page.waitForTimeout(700);

    // Locate the first verse pill (e.g., Ésaïe 59:2)
    const firstPill = page.locator("button:has-text('Ésaïe 59:2')").first();
    await firstPill.waitFor({ state: "visible" });
    console.log("Found verse pill for Ésaïe 59:2.");

    // 1. Hover on Desktop: Check tooltip preview
    await firstPill.hover();
    await page.waitForTimeout(500);

    // Take screenshot of hover tooltip preview
    await page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/verse_pill_hover_tooltip.png",
    });
    console.log("Captured hover tooltip screenshot.");

    // 2. Click on Pill: Check modal opening
    await firstPill.click();
    await page.waitForTimeout(500);

    // Verify modal is visible
    const modalHeading = page.locator("h3:has-text('Ésaïe 59:2')").first();
    await modalHeading.waitFor({ state: "visible" });
    console.log("Verse modal opened successfully with heading Ésaïe 59:2.");

    // Verify verse text is displayed
    const modalText = await page.locator("blockquote").first().innerText();
    console.log("Modal scripture text:", modalText.substring(0, 60) + "...");

    // Take screenshot of open modal
    await page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/verse_pill_modal_open.png",
    });

    // Test Copy button in modal
    const copyBtn = page.locator("button:has-text('Copier')").first();
    await copyBtn.click();
    await page.waitForTimeout(300);
    console.log("Clicked copy verse button.");

    // Close modal via close button
    const closeBtn = page.locator("button:has-text('Fermer')").first();
    await closeBtn.click();
    await page.waitForTimeout(500);

    // Verify modal closed
    const isModalVisible = await page.locator("h3:has-text('Ésaïe 59:2')").isVisible();
    console.log("Modal closed:", !isModalVisible);
    if (isModalVisible) throw new Error("Modal failed to close!");

    // Verify the card is still on the verso (not accidentally flipped by pill click)
    const isCardStillFlipped = await cardInner.evaluate((el) =>
      el.classList.contains("is-flipped")
    );
    console.log("Card preserved on verso:", isCardStillFlipped);
    if (!isCardStillFlipped) throw new Error("Card flipped back when clicking pill!");

    // 3. Test Mobile Viewport
    const mobileContext = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto("http://localhost:3000/discussion", { waitUntil: "networkidle" });
    const mobileCardInner = mobilePage.locator(".card-inner").first();
    await mobileCardInner.click();
    await mobilePage.waitForTimeout(700);

    const mobilePill = mobilePage.locator("button:has-text('Romains 5:12')").first();
    await mobilePill.click();
    await mobilePage.waitForTimeout(500);

    await mobilePage.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/verse_modal_mobile.png",
    });
    console.log("Captured mobile modal screenshot for Romains 5:12.");

    await mobileContext.close();

    console.log("ALL VERSE PILL TESTS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("Verification failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();

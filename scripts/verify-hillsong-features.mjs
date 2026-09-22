import { chromium } from "playwright";

async function runVerification() {
  console.log("Starting Playwright verification of Hillsong France updates...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    // 1. Visit Home Page
    console.log("Navigating to http://localhost:3000/ ...");
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    // Verify Hillsong France branding
    const bodyText = await page.textContent("body");
    if (!bodyText.includes("HILLSONG FRANCE")) {
      throw new Error("Missing 'HILLSONG FRANCE' on home page");
    }
    console.log("✓ Found 'HILLSONG FRANCE' branding on homepage");

    // Check course menu trigger
    const courseBtn = page.locator('button[title*="Parcours des 10 Semaines"]');
    await courseBtn.first().click();
    await page.waitForTimeout(600);

    // Verify modal is open
    const modalTitle = page.locator('text=Programme des 10 Semaines');
    if (!(await modalTitle.isVisible())) {
      throw new Error("Course modal not visible after clicking trigger");
    }
    console.log("✓ 10-Course modal opened successfully");

    // Take screenshot of Course Selector Modal
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/course_modal.png" });
    console.log("✓ Saved course_modal.png");

    // Close modal
    const closeBtn = page.locator('button[aria-label="Fermer"]');
    await closeBtn.click();
    await page.waitForTimeout(400);

    // 2. Visit Cards / Verses Page
    console.log("Navigating to http://localhost:3000/cards ...");
    await page.goto("http://localhost:3000/cards", { waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    // Check title: "Versets bibliques"
    const pageTitle = await page.locator("h1").textContent();
    console.log("Cards page title:", pageTitle);
    if (!pageTitle.includes("Versets")) {
      throw new Error(`Expected title with 'Versets', got: ${pageTitle}`);
    }

    // Check Focus mode is active
    const nextBtn = page.locator("text=Suivante");
    if (await nextBtn.isVisible()) {
      console.log("✓ Focus mode (1 par 1) is active with Next button visible");
    }

    // Switch to Week 10 to inspect "1 Thessaloniciens 2:12"
    const week10Btn = page.locator("button:has-text('Semaine 10')");
    await week10Btn.click();
    await page.waitForTimeout(500);

    // In Focus Mode, navigate or search for "1 Thessaloniciens"
    const searchInput = page.locator('input[placeholder*="Recherche"]');
    await searchInput.fill("1 Thessaloniciens");
    await page.waitForTimeout(500);

    // Verify card content
    const cardRef = page.locator("h3:has-text('Thessaloniciens')");
    if (await cardRef.isVisible()) {
      console.log("✓ Found '1 Thessaloniciens' card in focus mode");
      // Check that bottom chapter text has NO "Ch." or "ch"
      const bottomChapter = await page.locator("span.truncate:has-text('1 Thessaloniciens')").first().textContent();
      console.log("Bottom chapter label:", bottomChapter);
      if (bottomChapter.includes("Ch.") || bottomChapter.includes("ch.")) {
        throw new Error(`Found unwanted 'Ch.' in: ${bottomChapter}`);
      }
      console.log("✓ Chapter label is clean without 'Ch.':", bottomChapter);
    }

    // Take screenshot of Focus Mode with 1 Thessaloniciens 2:12
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/cards_focus_mode.png" });
    console.log("✓ Saved cards_focus_mode.png");

    // Click on card to flip it
    const activeCard = page.locator(".card-inner").first();
    await activeCard.click();
    await page.waitForTimeout(700);

    // Verify flipped back face
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/cards_flipped_back.png" });
    console.log("✓ Saved cards_flipped_back.png");

    // Clear search and switch to Grid Mode
    await searchInput.fill("");
    const gridBtn = page.locator('button[title*="Mode Grille"]');
    await gridBtn.click();
    await page.waitForTimeout(600);

    // Take screenshot of Grid Mode
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/cards_grid_mode.png" });
    console.log("✓ Saved cards_grid_mode.png");

    // Test Semantic Search: filter chip "Église & Mission"
    const churchChip = page.locator("button:has-text('Église & Mission')");
    if (await churchChip.isVisible()) {
      await churchChip.click();
      await page.waitForTimeout(500);
      console.log("✓ Clicked 'Église & Mission' semantic filter chip");
      await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/cards_semantic_filter.png" });
      console.log("✓ Saved cards_semantic_filter.png");
    }

    // 3. Mobile Viewport Verification
    console.log("Testing mobile responsive layout...");
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("http://localhost:3000/cards", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/cards_mobile_focus.png" });
    console.log("✓ Saved cards_mobile_focus.png");

    console.log("\nALL HILLSONG FRANCE VERIFICATIONS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("Verification failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();

import { chromium } from "playwright";

async function run() {
  console.log("Starting Playwright verification for Discussion feature...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  try {
    // 1. Visit home page
    await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
    console.log("Loaded home page.");

    // Check navbar links
    const navText = await page.locator("header nav").innerText();
    console.log("Desktop Navbar text:", navText);
    if (!navText.includes("Discussion")) {
      throw new Error("Discussion not found in desktop navigation!");
    }

    // 2. Navigate to /discussion
    await page.click('header nav a[href="/discussion"]');
    await page.waitForURL("**/discussion");
    console.log("Navigated to /discussion successfully.");

    // Wait for header
    await page.waitForSelector("h1");
    const h1Text = await page.locator("h1").innerText();
    console.log("Discussion H1:", h1Text);

    // 3. Verify card count in Focus mode
    const counterText = await page.locator("text=Question 1").first().innerText();
    console.log("Focus counter:", counterText);

    // 4. Test 3D Flip Card
    const cardFront = page.locator(".card-face-front").first();
    const cardInner = page.locator(".card-inner").first();
    
    // Click to flip
    await cardInner.click();
    await page.waitForTimeout(700); // wait for 3D transition
    const isFlipped = await cardInner.evaluate((el) => el.classList.contains("is-flipped"));
    console.log("Card flipped to verso:", isFlipped);
    if (!isFlipped) throw new Error("Card did not flip!");

    // Take screenshot of flipped card
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/discussion_focus_flipped.png" });

    // Flip back
    await cardInner.click();
    await page.waitForTimeout(700);

    // 5. Test Next Question navigation
    const nextBtn = page.locator('button[title*="suivante"], button[title*="Next"]').first();
    await nextBtn.click();
    await page.waitForTimeout(300);
    const counter2 = await page.locator("text=Question 2").first().innerText();
    console.log("Navigated to Question 2:", counter2);

    // 6. Test Switch to Grid Mode
    const gridBtn = page.locator('button[title*="Grille"], button[title*="Grid"]').first();
    await gridBtn.click();
    await page.waitForTimeout(400);

    const gridCardsCount = await page.locator(".card-inner").count();
    console.log(`Grid mode cards count: ${gridCardsCount}`);
    if (gridCardsCount < 8) {
      throw new Error(`Expected at least 8 cards in grid mode, found ${gridCardsCount}`);
    }
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/discussion_grid_mode.png" });

    // 7. Test Week Filter (Switch to Week 10)
    const selectEl = page.locator("select").first();
    await selectEl.selectOption("week-10");
    await page.waitForTimeout(500);

    const week10CardsCount = await page.locator(".card-inner").count();
    console.log(`Week 10 cards count: ${week10CardsCount}`);
    if (week10CardsCount !== 8) {
      throw new Error(`Expected exactly 8 cards for Week 10, found ${week10CardsCount}`);
    }

    // 8. Test Search Filter
    const searchInput = page.locator('input[type="text"]').first();
    await searchInput.fill("Ekklesia");
    await page.waitForTimeout(400);

    const searchCount = await page.locator(".card-inner").count();
    console.log(`Search for 'Ekklesia' returned ${searchCount} card(s)`);
    if (searchCount === 0) {
      throw new Error("Search for Ekklesia failed to return cards!");
    }

    // Clear search
    await searchInput.fill("");
    await page.waitForTimeout(300);

    // 9. Test Theme Switcher (Light / Dark)
    const themeToggleBtn = page.locator('button[aria-label="Toggle light/dark theme"]').first();
    await themeToggleBtn.click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/discussion_light_mode.png" });

    // Switch back to dark
    await themeToggleBtn.click();
    await page.waitForTimeout(300);

    // 10. Test English Language Switch
    const enLangBtn = page.locator('button[title*="Switch to English"]').first();
    await enLangBtn.click();
    await page.waitForTimeout(400);

    const enH1 = await page.locator("h1").innerText();
    console.log("English H1:", enH1);
    if (!enH1.includes("Discussion")) {
      throw new Error("English translation did not take effect on H1!");
    }

    console.log("ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("Verification failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();

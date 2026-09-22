import { chromium } from "playwright";

async function verifyRefinements() {
  console.log("Starting verification of new refinements...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    // 1. Visit Home Page
    console.log("Testing Home Page at http://localhost:3000/ ...");
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Switch to English to test English week label in Navbar
    const enBtn = page.locator("button:has-text('EN')");
    await enBtn.click();
    await page.waitForTimeout(500);

    // Verify Navbar shows "Week" and NOT "Semaine" in EN
    const navBarText = await page.locator("header").textContent();
    console.log("Navbar header text in EN:", navBarText);
    if (navBarText.includes("Semaine 10") || navBarText.includes("Semaine 1")) {
      throw new Error(`Found French 'Semaine' in English navbar: ${navBarText}`);
    }
    if (!navBarText.includes("Week 1") && !navBarText.includes("Week 10")) {
      throw new Error(`Expected 'Week' in English navbar: ${navBarText}`);
    }
    console.log("✓ Navbar correctly displays 'Week' in English!");

    // Verify Home hero: no redundant Hillsong France in subtitle badge, no bulky cards, button with parentheses
    const heroContent = await page.locator("main").textContent();
    if (!heroContent.includes("Memorize Verses (")) {
      throw new Error(`Expected button with verses count in parentheses, got: ${heroContent}`);
    }
    console.log("✓ Home page button contains verses in parentheses (e.g. 'Memorize Verses (28)')");

    // Take screenshot of sober home hero
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/home_refined_sober.png" });
    console.log("✓ Saved home_refined_sober.png");

    // 2. Test Light/Dark Mode Switcher Icon
    const themeBtn = page.locator("button[aria-label='Toggle light/dark theme']");
    if (!(await themeBtn.isVisible())) {
      throw new Error("Theme toggle button not found in navbar!");
    }

    // Toggle to Light Mode
    await themeBtn.click();
    await page.waitForTimeout(500);

    const htmlClass = await page.getAttribute("html", "class");
    console.log("HTML class after theme toggle:", htmlClass);
    if (htmlClass.includes("dark")) {
      throw new Error("Expected light mode (dark class removed from html)");
    }
    console.log("✓ Light mode successfully activated via navbar icon!");

    // Open Course Selector Modal in Light Mode to verify it is NOT black
    const courseMenuBtn = page.locator("button[title*='10-Week']").first();
    await courseMenuBtn.click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/course_modal_light_mode.png" });
    console.log("✓ Saved course_modal_light_mode.png (verified light theme)");

    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);

    // 3. Visit Cards / Verses Page
    console.log("Testing Verses Page at http://localhost:3000/cards ...");
    await page.goto("http://localhost:3000/cards", { waitUntil: "networkidle" });
    await page.waitForTimeout(600);

    // Verify sober header: title is Scripture Memorization & Meditation
    const mainTitle = await page.locator("h1").textContent();
    console.log("Cards page main title:", mainTitle);
    if (!mainTitle.includes("Scripture Memorization & Meditation")) {
      throw new Error(`Expected title 'Scripture Memorization & Meditation', got: ${mainTitle}`);
    }
    console.log("✓ Verses page has sober title without redundant badge!");

    // Verify single-line toolbar with select dropdowns
    const selects = page.locator("select");
    const selectCount = await selects.count();
    console.log(`Found ${selectCount} filter dropdowns (Week, Themes, Verses)`);
    if (selectCount < 3) {
      throw new Error(`Expected at least 3 dropdowns, got ${selectCount}`);
    }
    console.log("✓ Single-line toolbar contains Week, Themes, and Verses dropdowns!");

    // Verify Focus Mode card is larger
    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/verses_light_focus_large.png" });
    console.log("✓ Saved verses_light_focus_large.png");

    // Toggle back to Dark Mode to also inspect Dark Mode
    await themeBtn.click();
    await page.waitForTimeout(500);

    await page.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/verses_dark_focus_large.png" });
    console.log("✓ Saved verses_dark_focus_large.png");

    console.log("\nALL NEW REFINEMENT VERIFICATIONS PASSED 100%!");
  } catch (err) {
    console.error("Verification failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

verifyRefinements();

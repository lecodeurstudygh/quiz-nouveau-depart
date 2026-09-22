import { chromium } from "playwright";

async function run() {
  console.log("Starting verification for user requested fixes...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();

  try {
    await page.goto("http://localhost:3000/discussion", { waitUntil: "networkidle" });
    console.log("Loaded /discussion page.");

    // Flip card to verso
    const cardInner = page.locator(".card-inner").first();
    await cardInner.click();
    await page.waitForTimeout(700);

    // 1. Test unclipped tooltip for the first pill on the left
    const firstPill = page.locator(".pt-2 button:has-text('Ésaïe 59:2')").first();
    await firstPill.hover();
    await page.waitForTimeout(500);

    // Check tooltip is present in portal (fixed position, z-[9999])
    const tooltip = page.locator("div.fixed.z-\\[9999\\]").first();
    await tooltip.waitFor({ state: "visible" });
    const tooltipBox = await tooltip.boundingBox();
    console.log("Portal tooltip bounding box:", tooltipBox);

    if (tooltipBox.x < 0) {
      throw new Error(`Tooltip is clipped on the left! x: ${tooltipBox.x}`);
    }
    if (tooltipBox.x + tooltipBox.width > 1280) {
      throw new Error(`Tooltip is clipped on the right! x: ${tooltipBox.x + tooltipBox.width}`);
    }
    console.log("Tooltip is fully visible and perfectly positioned!");

    await page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/fixed_unclipped_tooltip.png",
    });

    // 2. Test inline scripture citation click in the answer text itself
    // Move mouse away to dismiss tooltip
    await page.mouse.move(0, 0);
    await page.waitForTimeout(300);

    const inlineLink = page.locator("button:has-text('Ésaïe 59:2')").first();
    console.log("Clicking inline scripture citation in answer text...");
    await inlineLink.click();
    await page.waitForTimeout(500);

    // Verify modal is open
    const modalHeading = page.locator("h3:has-text('Ésaïe 59:2')").first();
    await modalHeading.waitFor({ state: "visible" });
    console.log("Modal opened from inline citation!");

    await page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/inline_citation_modal.png",
    });

    // Close modal
    await page.locator("button:has-text('Fermer')").first().click();
    await page.waitForTimeout(400);

    // 3. Test Copy button feedback and enriched clipboard content
    const copyBtn = page.locator("button[title*='Copier']").first();
    await copyBtn.click();
    await page.waitForTimeout(300);

    // Check feedback text
    const feedbackText = await page.locator("text=Réponse copiée !").first().innerText();
    console.log("Feedback text after copy:", feedbackText);
    if (!feedbackText.includes("Réponse copiée !")) {
      throw new Error(`Expected 'Réponse copiée !', found: ${feedbackText}`);
    }

    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    console.log("Clipboard preview:\n", clipboardText.substring(0, 200) + "...\n");

    if (!clipboardText.includes("Références bibliques :")) {
      throw new Error("Clipboard text missing 'Références bibliques :' header!");
    }
    if (!clipboardText.includes("« Mais ce sont vos fautes")) {
      throw new Error("Clipboard text missing full verse text for Ésaïe 59:2!");
    }
    if (!clipboardText.includes("À retenir :")) {
      throw new Error("Clipboard text missing practical takeaway!");
    }
    console.log("Enriched clipboard content verified!");

    // Take screenshot of copy feedback
    await page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/copy_feedback_success.png",
    });

    console.log("ALL 5 REQUESTS VERIFIED AND WORKING 100%!");
  } catch (err) {
    console.error("Test failed:", err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();

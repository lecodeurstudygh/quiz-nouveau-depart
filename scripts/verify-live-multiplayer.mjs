import { chromium } from "playwright";

async function runLiveTest() {
  console.log("🚀 Lancement du test multijoueur Live (1 Hôte + 2 Joueurs)...");

  const browser = await chromium.launch({ headless: true });

  try {
    // 1. Host Window (Desktop)
    const hostContext = await browser.newContext({
      viewport: { width: 1280, height: 800 },
    });
    const hostPage = await hostContext.newPage();

    console.log("➡️ Ouverture de l'écran Enseignant : /live/host");
    await hostPage.goto("http://localhost:3000/live/host", { waitUntil: "networkidle" });

    // Click "Lancer la Salle d'Attente"
    const startLobbyBtn = hostPage.locator("button:has-text('Lancer la Salle d\\'Attente')");
    await startLobbyBtn.waitFor({ state: "visible", timeout: 5000 });
    await startLobbyBtn.click();

    // Wait for PIN to appear
    const pinLocator = hostPage.locator("text=Code PIN du Jeu").locator("..").locator(".font-mono");
    await pinLocator.waitFor({ state: "visible", timeout: 5000 });
    const pinText = (await pinLocator.textContent()) || "";
    const cleanPin = pinText.replace(/\s+/g, "").trim();
    console.log(`🔑 Code PIN généré par l'Hôte : ${cleanPin}`);

    // Take screenshot of Host Lobby
    await hostPage.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_host_lobby.png",
    });

    // 2. Player 1 Window (Mobile Emulation - David)
    const p1Context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    });
    const p1Page = await p1Context.newPage();
    console.log(`📱 Joueur 1 (David) rejoint via /live?pin=${cleanPin}`);
    await p1Page.goto(`http://localhost:3000/live?pin=${cleanPin}`, { waitUntil: "networkidle" });

    // Fill name and avatar
    const p1NameInput = p1Page.locator("input[placeholder*='David']");
    await p1NameInput.fill("David");
    const p1AvatarBtn = p1Page.locator("button:has-text('🦁')");
    if (await p1AvatarBtn.isVisible()) await p1AvatarBtn.click();

    await p1Page.locator("button:has-text('C\\'est parti !')").click();
    await p1Page.waitForSelector("text=Connecté à la partie", { timeout: 5000 });
    console.log("✅ Joueur 1 connecté à la salle d'attente");

    // 3. Player 2 Window (Mobile Emulation - Sarah)
    const p2Context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15",
    });
    const p2Page = await p2Context.newPage();
    console.log(`📱 Joueur 2 (Sarah) rejoint via /live?pin=${cleanPin}`);
    await p2Page.goto(`http://localhost:3000/live?pin=${cleanPin}`, { waitUntil: "networkidle" });

    const p2NameInput = p2Page.locator("input[placeholder*='David']");
    await p2NameInput.fill("Sarah");
    const p2AvatarBtn = p2Page.locator("button:has-text('🕊️')");
    if (await p2AvatarBtn.isVisible()) await p2AvatarBtn.click();

    await p2Page.locator("button:has-text('C\\'est parti !')").click();
    await p2Page.waitForSelector("text=Connecté à la partie", { timeout: 5000 });
    console.log("✅ Joueur 2 connectée à la salle d'attente");

    // Check Host sees 2 players
    await hostPage.waitForTimeout(1000);
    const hostPlayersCount = await hostPage.locator("text=2 participants connectés").isVisible();
    console.log(`👥 Hôte voit 2 participants : ${hostPlayersCount}`);

    // Screenshot of player waiting screen
    await p1Page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_player_waiting.png",
    });

    // 4. Host Starts Quiz
    console.log("▶️ L'Hôte démarre le quiz...");
    hostPage.on("console", (msg) => console.log("HOST CONSOLE:", msg.text()));
    p1Page.on("console", (msg) => console.log("P1 CONSOLE:", msg.text()));

    const startQuizBtn = hostPage.locator("button:has-text('Démarrer le Quiz')");
    await startQuizBtn.click();
    console.log("👆 Clic sur Démarrer le Quiz effectué");

    await hostPage.waitForTimeout(1000);
    console.log("URL Hôte actuelle :", hostPage.url());
    const hostHtml = await hostPage.content();
    console.log("Hôte contient 'Question' ?", hostHtml.includes("Question"));
    if (!hostHtml.includes("Question")) {
      console.log("Extrait HTML Hôte :", hostHtml.substring(0, 500));
      await hostPage.screenshot({ path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/host_failed_state.png" });
    }

    // Verify Question screen appears on Host
    await hostPage.waitForSelector("text=Question 1 /", { timeout: 8000 });
    console.log("✅ Écran de Question affiché sur l'Hôte");

    await hostPage.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_host_question.png",
    });

    // Verify Question buttons appear on Mobile Player
    await p1Page.waitForSelector("button:has-text('▲')", { timeout: 5000 });
    console.log("✅ Boutons tactiles affichés sur le mobile de Joueur 1");

    await p1Page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_player_question.png",
    });

    // 5. Players answer
    console.log("👆 Joueur 1 appuie sur l'option ▲ Rouge");
    await p1Page.locator("button:has-text('▲')").click();
    await p1Page.waitForSelector("text=Réponse enregistrée", { timeout: 5000 });
    console.log("✅ Joueur 1 : Réponse confirmée");

    console.log("👆 Joueur 2 appuie sur l'option ◆ Bleu");
    await p2Page.waitForSelector("button:has-text('◆')", { timeout: 5000 });
    await p2Page.locator("button:has-text('◆')").click();
    // Since Joueur 2 is the last player, status can transition immediately to reveal
    await Promise.race([
      p2Page.waitForSelector("text=Réponse enregistrée", { timeout: 4000 }),
      p2Page.waitForSelector("text=Bonne Réponse !", { timeout: 4000 }),
      p2Page.waitForSelector("text=Pas Tout à Fait...", { timeout: 4000 }),
    ]);
    console.log("✅ Joueur 2 : Réponse confirmée / Révélation instantanée");

    // All players answered -> Host auto-triggers Reveal
    await hostPage.waitForTimeout(1000);
    const isReveal = await hostPage.locator("text=Résultats • Question 1").isVisible();
    if (!isReveal) {
      // Manual reveal click if needed
      const revealBtn = hostPage.locator("button:has-text('Révéler la réponse')");
      if (await revealBtn.isVisible()) await revealBtn.click();
    }
    await hostPage.waitForSelector("text=Éclairage Biblique & Pastoral", { timeout: 5000 });
    console.log("✅ Révélation de la réponse & Explication pastorale affichées sur l'Hôte");

    await hostPage.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_host_reveal.png",
    });

    // Screenshot of player result
    await p1Page.waitForTimeout(500);
    await p1Page.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_player_result.png",
    });

    // 6. Host clicks "Voir le Classement"
    console.log("🏆 Affichage du Classement...");
    await hostPage.locator("button:has-text('Voir le Classement')").click();
    await hostPage.waitForSelector("text=Classement Général", { timeout: 5000 });
    console.log("✅ Podium intermédiaire affiché avec succès");

    await hostPage.screenshot({
      path: "/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc/live_host_leaderboard.png",
    });

    console.log("🎉 Test Multijoueur Live validé à 100% avec succès !");
  } finally {
    await browser.close();
  }
}

runLiveTest().catch((err) => {
  console.error("❌ Échec du test multijoueur live :", err);
  process.exit(1);
});

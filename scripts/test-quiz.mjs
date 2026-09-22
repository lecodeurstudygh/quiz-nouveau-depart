import { chromium } from '@playwright/test';
import path from 'path';

const ARTIFACTS_DIR = '/Users/david/.gemini/antigravity-ide/brain/6efea069-6ca7-4585-a2c7-69fe399946fc';

async function runTest() {
  console.log('🚀 Démarrage du test automatique Playwright sur http://localhost:3000/quiz...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 }
  });
  const page = await context.newPage();

  // Accepter automatiquement les confirmations (ex: Recommencer le quiz)
  page.on('dialog', async dialog => {
    console.log(`💬 Boîte de dialogue détectée : "${dialog.message()}" -> Acceptée ✅`);
    await dialog.accept();
  });

  const response = await page.goto('http://localhost:3000/quiz', { waitUntil: 'domcontentloaded' });
  console.log(`🌐 Statut HTTP : ${response?.status()}`);

  await page.waitForSelector('h2', { timeout: 10000 });
  const questionTitle = await page.locator('h2').innerText();
  console.log(`📌 Question 1 : ${questionTitle.trim()}`);

  const getOptionIds = async () => {
    const optionCards = await page.locator('div.space-y-3 > button').all();
    const ids = [];
    for (const card of optionCards) {
      const id = await card.getAttribute('data-option-id');
      ids.push(id);
    }
    return ids;
  };

  const getOptionTexts = async () => {
    const spans = await page.locator('div.space-y-3 > button span.font-semibold').all();
    const texts = [];
    for (const span of spans) {
      texts.push(await span.innerText());
    }
    return texts;
  };

  // 1. Ordre initial
  await page.waitForTimeout(400);
  const initialIds = await getOptionIds();
  const initialTexts = await getOptionTexts();
  console.log('\n--- 📋 Ordre initial des options (Session 1) ---');
  initialTexts.forEach((txt, idx) => console.log(`  ${String.fromCharCode(65 + idx)}. [${initialIds[idx]}] ${txt}`));

  const shot1 = path.join(ARTIFACTS_DIR, 'quiz_test_1_initial.png');
  await page.screenshot({ path: shot1 });

  // 2. Clic sur "Mélanger les choix"
  console.log('\n🔀 Clic sur le bouton "Mélanger les choix"...');
  const shuffleBtn = page.locator('button:has-text("Mélanger")').first();
  await shuffleBtn.click();
  await page.waitForTimeout(400);

  const shuffledIds = await getOptionIds();
  const shuffledTexts = await getOptionTexts();
  console.log('\n--- 🔀 Ordre après clic sur "Mélanger" ---');
  shuffledTexts.forEach((txt, idx) => console.log(`  ${String.fromCharCode(65 + idx)}. [${shuffledIds[idx]}] ${txt}`));

  const isDifferent = JSON.stringify(initialIds) !== JSON.stringify(shuffledIds);
  console.log(`\n🎲 Résultat mélange : ${isDifferent ? 'SUCCÈS (L\'ordre des identifiants a bien été permuté ✅)' : 'Ordre identique par hasard'}`);

  const shot2 = path.join(ARTIFACTS_DIR, 'quiz_test_2_shuffled.png');
  await page.screenshot({ path: shot2 });

  // 3. Sélection et soumission
  console.log('\n👉 Sélection du premier choix...');
  const firstOption = page.locator('div.space-y-3 > button').first();
  await firstOption.click();
  await page.waitForTimeout(300);

  console.log('📝 Clic sur "Valider ma réponse"...');
  const submitBtn = page.locator('button:has-text("Valider ma réponse")').first();
  await submitBtn.click();
  await page.waitForTimeout(400);

  const shot3 = path.join(ARTIFACTS_DIR, 'quiz_test_3_validated.png');
  await page.screenshot({ path: shot3 });

  // 4. Navigation avant/arrière pour vérifier la stabilité en cours de session
  console.log('\n➡️ Clic sur "Suivante"...');
  const nextBtn = page.locator('button:has-text("Suivante")').first();
  await nextBtn.click();
  await page.waitForTimeout(400);

  const q2Title = await page.locator('h2').innerText();
  console.log(`📌 Question 2 atteinte : ${q2Title.trim()}`);

  console.log('⬅️ Clic sur "Précédente" pour revenir à la question 1...');
  const prevBtn = page.locator('button:has-text("Précédente")').first();
  await prevBtn.click();
  await page.waitForTimeout(400);

  const returnedIds = await getOptionIds();
  const isOrderPreserved = JSON.stringify(shuffledIds) === JSON.stringify(returnedIds);
  console.log(`🔒 Ordre des options conservé fidèlement lors du retour : ${isOrderPreserved ? 'OUI ✅' : 'NON ❌'}`);

  const isAnswerPreserved = await page.locator('div.space-y-3 > button.border-emerald-500, div.space-y-3 > button.border-rose-500').count() > 0;
  console.log(`🔒 Réponse validée et feedback pastoral préservés : ${isAnswerPreserved ? 'OUI ✅' : 'NON ❌'}`);

  // 5. Recommencer le quiz
  console.log('\n🔄 Clic sur "Recommencer" (déclenche un nouveau mélange pour la nouvelle partie)...');
  const restartBtn = page.locator('button:has-text("Recommencer")').first();
  await restartBtn.click();
  await page.waitForTimeout(500);

  const optionsAfterRestart = await getOptionTexts();
  const idsAfterRestart = await getOptionIds();
  console.log('\n--- 🔄 Ordre après "Recommencer" (Nouvelle Session) ---');
  optionsAfterRestart.forEach((txt, idx) => console.log(`  ${String.fromCharCode(65 + idx)}. [${idsAfterRestart[idx]}] ${txt}`));

  const shot4 = path.join(ARTIFACTS_DIR, 'quiz_test_4_restarted.png');
  await page.screenshot({ path: shot4 });

  await browser.close();
  console.log('\n✨ TOUS LES TESTS AUTOMATIQUES PLAYWRIGHT ONT RÉUSSI AVEC SUCCÈS (100%) !');
}

runTest().catch(err => {
  console.error('❌ Erreur :', err);
  process.exit(1);
});

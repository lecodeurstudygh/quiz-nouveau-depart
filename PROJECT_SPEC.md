# Cahier des charges : Quiz Nouveau Départ

## 1. Contexte & Objectif
Application web et mobile moderne, fluide et épurée, conçue pour accompagner le parcours de fondements chrétiens **« Nouveau Départ »** (10 semaines) de l'Église Hillsong Paris.
L'objectif est d'ancrer les acquis de façon ludique, accessible et mémorable :
- En direct pendant les sessions Zoom ou en présentiel (multijoueur avec code PIN).
- En autonomie la semaine (Solo, duel d'amis, Web, Mobile, WhatsApp).

---

## 2. Programme des 10 Semaines
1. Notre besoin d'un Sauveur / Our Need for a Saviour *(Actif - 28 versets, 25 questions, 7 Q&A discussion)*
2. Qui est Dieu ? / Who is God? *(Actif - 22 versets, 25 questions, 7 Q&A discussion)*
3. Mon identité en Christ / My Identity in Christ
4. Entendre la voix de Dieu / Hearing God's Voice
5. Un amour pour la Parole de Dieu / A Love for God's Word
6. Parler à Dieu / Talking to God
7. La personne du Saint-Esprit / The Person of the Holy Spirit
8. Une vie transformée / A Transformed Life
9. Une mission à vivre / A Mission to Live
10. L’Église – Une communauté vivante / The Church – A Living Community *(Actif - 22 versets, 25 questions, 7 Q&A discussion)*

---

## 3. Exigences Fondamentales & Doctrinales
- **Bilingue natif (FR / EN)** : bascule instantanée de la langue dans toute l'interface, les questions et les versets.
- **Fidélité pastorale stricte** : questions et réponses issues exclusivement des livrets de cours officiels et des versets bibliques associés (versions Segond 21 en français, NIV en anglais).
- **Exhaustivité biblique** : intégrer les versets textuellement cités ainsi que les versets sous-jacents mentionnés dans les cours, avec texte intégral et références.

---

## 4. Modules de l'Application

### A. Espace Cours (Semaine 1 à 10)
- Accès semaine par semaine avec fiche récapitulative : Titre, « La Grande Idée », versets clés, sujet de prière et prochain pas.
- Grand test final récapitulatif des 10 semaines avec délivrance d'un diplôme virtuel personnalisable.

### B. Espace Discussion & Questions / Réponses (Flashcards interactives)
- Positionné directement après l'onglet Cours dans la navigation principale (`Cours` -> `Discussion` -> `Versets` -> `Quiz`).
- Fiches Recto / Verso pour 100% des questions d'approfondissement et de réflexion théologique des livrets officiels :
  - **Recto :** Question pastorale claire, numéro de question et thématique.
  - **Verso :** Réponse théologique complète et structurée, points pratiques et versets bibliques associés.
- **Double mode de consultation :**
  - **Mode Focus (1 par 1) :** carte grand format au centre, retournement par clic ou barre d'espace, navigation par flèches clavier et boutons Suivant/Précédent.
  - **Mode Grille (Tous) :** vue d'ensemble de toutes les questions de la semaine sélectionnée.
- Barre d'outils avec sélecteur de semaine, recherche textuelle/sémantique et mélange.
- **Consultation interactive des versets associés :** Pastilles de versets intelligentes avec double comportement :
  - *Survol (Hover) sur Desktop :* Infobulle flottante (tooltip) affichant un aperçu immédiat du verset sans quitter la carte.
  - *Clic / Tap (Desktop & Mobile) :* Ouverture d'une fenêtre modale élégante avec le texte intégral biblique (S21 / NIV), la référence, la traduction officielle et un bouton de copie, tout en protégeant la flashcard contre tout retournement accidentel (`e.stopPropagation()`).
- **Inventaire complet intégré :** Semaine 1 (10 questions/réponses) et Semaine 10 (8 questions/réponses), soit 18 flashcards interactives intégrales en Français et Anglais avec références scripturaires et leçons clés.

### C. Flashcards de Versets (« Flip Cards » interactives)
- Cartes recto/verso avec animation 3D au clic :
  - **Recto :** Référence biblique (ex: *Romains 6:23*) et thématique.
  - **Verso :** Texte intégral du verset (FR S21 ou EN NIV selon la langue active).
- **Arrière-plans visuels apaisants :** thèmes en dégradés élégants et profonds inspirés de la nature, assurant un contraste optimal.
- Mode Focus (1 par 1) et Mode Grille (Tous), mémorisation et recherche sémantique.

### D. Modes de Jeu (Quiz)
- **Solo :** entraînement personnel par semaine ou sur tout le parcours.
- **Multijoueur / Live Zoom :** création d'un salon avec code PIN à 6 chiffres, compte à rebours synchronisé par WebSocket, buzzer et classement en temps réel.
- **Duel & Équipes :** confrontation 1 contre 1 ou équipe contre équipe.
- **Variété des questions :**
  - QCM classiques (4 choix).
  - Textes à trous pour la mémorisation mot à mot de versets clés.
  - Association Référence <-> Verset.
  - Vrai ou Faux théologique.
  - Étymologie biblique (ex: *hhatah*, *metanoia*, *shub*).
  - Questions de compréhension tirées des sections « Discussion » des cours.

### D. Paramètres & Confort (Icône engrenage)
- Bascule de langue : Français / Anglais.
- Thème : Mode Sombre / Mode Clair.
- Ambiance sonore : musique instrumentale chrétienne douce en fond, avec curseur de volume et bouton silencieux (Mute).
- Personnalisation de partie : choix du nombre de questions (5, 10, 20) et du temps de réponse (15s, 30s, infini).

---

## 5. Architecture Technique
- **Frontend :** Next.js (App Router), Tailwind CSS, Lucide React, Framer Motion (animations des cartes).
- **Backend / Temps Réel :** Next.js Server-Sent Events (SSE) & REST API avec fallback automatique.
- **Données :** Fichiers TypeScript structurés (`src/data/courses/week-XX.ts`) garantissant la validation des contenus sans hallucination de l'IA.
- **Adaptateurs externes :** Webhook Meta WhatsApp Cloud API et Zoom Apps SDK.

---

## 6. Déploiement & Accès Public
- **Hébergement :** Vercel (Production HTTPS)
- **URL Publique Officielle :** `https://quiz-nouveau-depart.vercel.app`
- **Dépôt GitHub :** `https://github.com/lecodeurstudygh/quiz-nouveau-depart`
- **Console Hôte Enseignant (Zoom / Présentiel) :** `https://quiz-nouveau-depart.vercel.app/live/host`
- **Buzzer Mobile Participant :** `https://quiz-nouveau-depart.vercel.app/live`
- **Discussion Q&A Flashcards :** `https://quiz-nouveau-depart.vercel.app/discussion`
- **Flashcards Versets :** `https://quiz-nouveau-depart.vercel.app/cards`
# Espace élèves avec Google Sheets

L’espace élèves s’ouvre avec le seul mot de passe commun **`souss`**. Aucun nom, compte ou code individuel n’est demandé pour consulter le planning et accéder au groupe Telegram.

Le mot de passe est vérifié par Google Apps Script. Le site public ne lit jamais directement le tableur, qui reste privé. Le script renvoie une session signée nécessaire pour lire le planning ou modifier une réservation.

## Utiliser le planning

1. Ouvrez l’espace élèves et saisissez `souss`.
2. Le planning et le lien Telegram s’affichent immédiatement.
3. Pour réserver, renseignez **Votre nom pour vos réservations**, puis choisissez un créneau libre. Aucun compte à créer.
4. Pour retrouver et annuler une réservation existante, indiquez le même nom et cliquez sur **Valider mon nom**. Le nom est déclaré par l’utilisateur ; le mot de passe commun ne vérifie pas l’identité individuelle.

Les réservations existantes sont conservées. Les créneaux libres se réservent sous verrou pour empêcher une double réservation. Les horaires sont affichés pour le Maroc (`Africa/Casablanca`) et la France (`Europe/Paris`), selon la date.

## Initialiser le tableur

1. Configurez l’identifiant du tableur privé dans `google-apps-script/Code.gs` et celui du projet Apps Script dans le fichier local ignoré `google-apps-script/.clasp.json`.
2. Depuis `google-apps-script/`, exécutez `clasp push` avec le compte Google propriétaire.
3. Pour un nouveau tableur uniquement, exécutez `setupStudentPortal()` dans Apps Script et acceptez les autorisations Google.
4. L’initialisation crée **Planning**, **Comptes** et **Configuration**, les 60 créneaux hebdomadaires du lundi au vendredi, de 21 h à minuit, et le lien Telegram. L’onglet historique **Comptes** et ses codes ne sont plus nécessaires à l’accès des élèves.

Les cinq colonnes du planning importé correspondent, de gauche à droite, au lundi–vendredi. Contrôlez les inscriptions initiales dans **Planning**. Ne relancez pas l’initialisation pour une simple mise à jour du portail.

## Publier une mise à jour

1. Vérifiez le backend avec `npm run test:portal` à la racine, puis compilez le site avec `npm run build`.
2. Depuis `google-apps-script/`, exécutez `clasp push`, puis `clasp deploy --deploymentId <identifiant-existant> -d "Portail élèves"` pour conserver l’URL déjà reliée au site.
3. La variable GitHub Actions **`VITE_STUDENT_PORTAL_URL`** doit contenir cette URL Apps Script terminée par `/exec`.
4. Poussez les changements sur `main` ou lancez le workflow **Deploy to GitHub Pages**.
5. Vérifiez l’espace élèves publié : un seul champ mot de passe, refus d’un mauvais mot de passe, ouverture avec `souss`, affichage du planning et de Telegram. Le nom doit être demandé uniquement pour gérer les réservations.

L’application Web s’exécute en tant que propriétaire et reste accessible sans compte Google. Le tableur et les outils d’administration restent privés ou protégés par leur code administrateur distinct.

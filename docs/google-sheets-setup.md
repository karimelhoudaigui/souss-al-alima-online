# Espace élèves avec Google Sheets

L’espace élèves s’ouvre avec le seul mot de passe commun **`souss`**. Aucun nom, compte ou code individuel n’est demandé pour consulter le planning et accéder au groupe Telegram.

Le mot de passe est vérifié par Google Apps Script. Le site public ne lit jamais directement le tableur, qui reste privé. Le script renvoie une session signée nécessaire pour lire le planning ou modifier une réservation.

## Utiliser le planning

1. Ouvrez l’espace élèves et saisissez `souss`.
2. Le planning et le lien Telegram s’affichent immédiatement.
3. Pour réserver, renseignez **Votre nom pour vos réservations**, puis choisissez un créneau libre. Aucun compte à créer.
4. Le bloc **Mes créneaux** regroupe toutes les réservations correspondant au nom indiqué, sur les cinq jours. Les suggestions reprennent les noms déjà présents dans le planning ; la recherche ignore la casse, les accents latins et les espaces supplémentaires.
5. Cliquez sur **Annuler ce créneau**, puis confirmez le jour et l’horaire affichés. La réservation hebdomadaire choisie est supprimée et la place redevient immédiatement disponible ; les autres créneaux sont conservés. Le nom est déclaré par l’utilisateur ; le mot de passe commun ne vérifie pas l’identité individuelle.

Les réservations existantes sont conservées. Les créneaux libres se réservent sous verrou pour empêcher une double réservation. Les horaires sont affichés pour le Maroc (`Africa/Casablanca`) et la France (`Europe/Paris`), selon la date.

## Initialiser le tableur

1. Configurez l’identifiant du tableur privé dans `google-apps-script/Code.gs` et celui du projet Apps Script dans le fichier local ignoré `google-apps-script/.clasp.json`.
2. Depuis `google-apps-script/`, exécutez `clasp push` avec le compte Google propriétaire.
3. Pour un nouveau tableur uniquement, exécutez `setupStudentPortal()` dans Apps Script et acceptez les autorisations Google.
4. L’initialisation crée **Planning**, **Comptes** et **Configuration**, les 60 créneaux hebdomadaires du lundi au vendredi, de 21 h à minuit, et le lien Telegram. L’onglet historique **Comptes** et ses codes ne sont plus nécessaires à l’accès des élèves.

Les cinq colonnes du planning importé correspondent, de gauche à droite, au lundi–vendredi. Contrôlez les inscriptions initiales dans **Planning**. Ne relancez pas l’initialisation pour une simple mise à jour du portail.

## Publier une mise à jour

1. Vérifiez le backend avec `npm run test:portal`, puis le parcours sur ordinateur et téléphone avec `npm run test:e2e` (Google Chrome installé). Les tests de navigateur utilisent un planning isolé et ne modifient pas le tableur de production. Compilez ensuite le site avec `npm run build`.
2. Depuis `google-apps-script/`, exécutez `clasp push`, puis `clasp deploy --deploymentId <identifiant-existant> -d "Portail élèves"` pour conserver l’URL déjà reliée au site.
3. La variable GitHub Actions **`VITE_STUDENT_PORTAL_URL`** doit contenir cette URL Apps Script terminée par `/exec`.
4. Poussez les changements sur `main` ou lancez le workflow **Deploy to GitHub Pages**.
5. Vérifiez l’espace élèves publié : un seul champ mot de passe, refus d’un mauvais mot de passe, ouverture avec `souss`, affichage du planning et de Telegram. Le nom doit être demandé uniquement pour gérer les réservations.

L’application Web s’exécute en tant que propriétaire et reste accessible sans compte Google. Le tableur et les outils d’administration restent privés ou protégés par leur code administrateur distinct.

## Attente et affichage

- La connexion renvoie directement le planning. Réserver ou annuler renvoie également l’état mis à jour dans la même réponse.
- Le nom est validé localement, sans attendre un appel Google. Les noms des autres élèves sont du texte et ne déclenchent aucune action au survol.
- Le cadre intégré adapte sa hauteur au contenu, y compris avant connexion. Un indicateur de chargement et un lien d’ouverture directe permettent de réessayer si Google tarde à charger.
- Sur téléphone, les boutons de jour affichent une seule colonne à la fois, sans défilement horizontal du planning.
- Une attente dépassant 30 secondes affiche une erreur récupérable. Après une réservation dont la réponse a expiré, le planning doit être actualisé avant une nouvelle modification, pour éviter de répéter une opération dont le résultat est inconnu.
- La session signée et le nom sont conservés pour l’onglet lorsque le navigateur autorise le stockage. La déconnexion les efface. Les réponses arrivant après la déconnexion sont ignorées.

# Espace élèves avec Google Sheets

Le site n’accède jamais directement au tableur. Un Google Apps Script lié au tableur sert d’intermédiaire : les élèves se connectent avec un code individuel, et le script vérifie les comptes et verrouille les réservations concurrentes. Le tableur doit rester privé et ne doit jamais être partagé avec les élèves.

## Créer et initialiser le tableur

1. Connectez-vous au compte Google de l’institut et créez un tableur vierge depuis [Google Sheets](https://docs.google.com/spreadsheets/u/0/).
2. Créez un projet Apps Script autonome et configurez son identifiant de projet dans `google-apps-script/.clasp.json`.
3. Depuis `google-apps-script/`, exécutez `clasp push` avec le compte Google propriétaire. Le dossier contient le manifeste de production, le backend `Code.gs` et les deux interfaces HTML `Portal.html` et `Admin.html`.
4. Dans Apps Script, exécutez `setupStudentPortal()` et acceptez les autorisations Google demandées. Le script ouvre le tableur à partir de son identifiant configuré dans `Code.gs`.
5. L’initialisation crée les onglets **Planning**, **Comptes** et **Configuration**, les 60 créneaux hebdomadaires de 15 minutes entre 21 h et minuit, le lien Telegram protégé par la connexion, et les comptes individuels des élèves déjà présents dans les données importées.
6. L’initialisation affiche dans le journal d’exécution les codes personnels temporaires de 16 caractères des élèves. Ouvrez Apps Script → **Exécutions**, récupérez-les et transmettez chaque code en privé à son élève. Les codes en clair ne sont pas enregistrés dans la feuille ; seuls leurs HMAC sont conservés dans l’onglet privé **Comptes**.

### Vérifier et administrer

- Les cinq colonnes préremplies sont supposées correspondre de gauche à droite au lundi–vendredi. Les en-têtes de la capture d’origine n’étaient pas visibles : contrôlez chaque réservation dans **Planning** avant l’ouverture aux élèves.
- Les horaires sont stockés comme heures civiles du Maroc (`Africa/Casablanca`). Le portail calcule l’heure française (`Europe/Paris`) pour la date correspondante ; le décalage saisonnier et le passage à minuit sont pris en compte.
- Pour un nouvel élève, ouvrez l’application Web avec `?admin=1`, puis utilisez le formulaire administrateur ; un code individuel s’affiche une seule fois.
- Pour désactiver un compte, passez sa cellule **Actif** à `FALSE` dans l’onglet **Comptes**. Les élèves ne doivent pas recevoir l’accès au tableur lui-même.
- Les cellules libres se réservent de façon atomique. Un élève peut annuler uniquement les créneaux liés à son propre compte.

## Publier le portail Apps Script

1. Depuis `google-apps-script/`, exécutez `clasp deploy -d "Portail élèves"` (ou utilisez **Déployer → Nouveau déploiement** dans l’éditeur Apps Script).
2. Le manifeste configure l’application Web pour s’exécuter en tant que propriétaire et être accessible sans compte Google ; les données restent protégées par les comptes et codes individuels, et le tableur demeure privé.
3. Copiez l’URL d’application Web qui se termine par `/exec`. Utilisez toujours l’URL de déploiement `/exec`, pas celle de l’éditeur.
4. Dans les paramètres du dépôt GitHub, créez la variable **Actions** `VITE_STUDENT_PORTAL_URL` avec cette URL.
5. Exécutez le workflow **Deploy to GitHub Pages** depuis l’onglet **Actions**, ou poussez un nouveau commit. Le site public sera publié avec le portail élèves intégré.
6. Vérifiez `/souss-al-alima-online/espace-eleves` sur le site publié : connexion avec un code élève, affichage des cinq jours et des deux heures Maroc/France, réservation et annulation, puis lien Telegram visible uniquement après connexion.

Le déploiement du site public peut réussir sans la variable Apps Script, mais l’espace élèves affichera alors qu’il n’est pas encore relié. Le lancement utilisable nécessite que le propriétaire autorise Apps Script et crée son déploiement Web.

## Modèle de sécurité et limites

- Chaque élève reçoit un code aléatoire personnel de 16 caractères ; le code commun `souss` n’est pas utilisé. Les codes sont affichés une seule fois par les outils d’administration du tableur.
- Gardez l’onglet **Comptes** et le tableur accessibles uniquement aux administrateurs. L’application Web s’exécute avec les droits du propriétaire.
- Apps Script et Sheets sont adaptés au planning actuel de petite taille. Pour un service à fort volume, des besoins d’audit avancé ou des données sensibles supplémentaires, migrez vers une base de données avec authentification dédiée.

# Mise en production de l’espace élèves

## Architecture et sécurité

Le planning utilise Supabase Auth et PostgreSQL. Chaque élève dispose d’un compte individuel ; aucun mot de passe partagé n’est intégré au site. Les réservations sont enregistrées dans `schedule_slots`, visibles aux comptes élèves actifs et modifiables uniquement par une fonction SQL qui vérifie l’identité connectée. PostgreSQL tranche les réservations concurrentes : une place ne peut pas être attribuée deux fois. Le lien Telegram est chargé depuis une table protégée et n’est retourné qu’aux comptes autorisés.

Le dépôt ne contient pas les clés d’un projet Supabase. L’URL et la clé publique du projet doivent être configurées avant la mise en service. La clé `service_role` n’est jamais requise côté navigateur et ne doit pas être ajoutée aux variables `VITE_*`.

## 1. Créer et configurer Supabase

1. Créer un projet Supabase, de préférence dans une région européenne, et conserver le mot de passe de la base dans un gestionnaire de secrets.
2. Dans **SQL Editor**, exécuter le fichier `supabase/migrations/20261025000000_student_schedule.sql`. Il crée les profils, le planning hebdomadaire, les règles RLS, les fonctions de réservation/annulation et le lien Telegram protégé.
3. Les cinq colonnes visibles sur la capture ont été interprétées de gauche à droite comme **lundi à vendredi**. Les noms visibles ont été préchargés pour les créneaux de 21 h à 22 h 15, heure du Maroc ; le reste des créneaux jusqu’à minuit est libre. Vérifier cet ordre des jours et les noms dans Supabase avant ouverture aux élèves ; le haut de la capture ne montre pas les en-têtes de colonnes.
4. Dans **Authentication → Providers**, activer Email et mot de passe. Désactiver les inscriptions publiques. Configurer l’URL du site de production et les URL de redirection autorisées, dont `/souss-al-alima-online/espace-eleves` pour GitHub Pages.
5. Configurer un SMTP de production pour les invitations et réinitialisations de mot de passe. Ne pas utiliser le service e-mail de test Supabase pour un lancement public.
6. Inviter les élèves depuis **Authentication → Users**. Ajouter `display_name` dans les métadonnées de l’invitation ; le déclencheur de la migration crée leur profil élève. Ils définiront leur propre mot de passe via l’invitation. Pour promouvoir un compte administrateur, utiliser le SQL Editor :

   ```sql
   update public.student_profiles
   set role = 'admin'
   where id = (
     select id from auth.users where email = 'adresse-administrateur'
   );
   ```

   Les comptes administrateurs ne se connectent pas à l’espace élèves. Les changements de planning sont faits par un administrateur dans Supabase ; ne donnez pas accès au SQL Editor aux élèves.

## 2. Configurer les variables du site

Pour un lancement local, copier `.env.example` vers `.env` et renseigner les valeurs **Project URL** et **publishable/anon key** depuis **Project Settings → API**. `.env` est ignoré par Git.

Pour GitHub Pages, ajouter ces **Actions variables** dans les paramètres du dépôt :

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (clé publique/publishable uniquement)

Le workflow vérifie leur présence, injecte ces valeurs au build et génère le fallback de navigation nécessaire pour que `/souss-al-alima-online/espace-eleves` fonctionne après actualisation. Le site public doit ensuite être activé dans **Settings → Pages → Build and deployment → GitHub Actions**.

## 3. Vérifications avant d’ouvrir le service

- Confirmer l’ordre des colonnes et toutes les inscriptions importées à partir de la photo.
- Vérifier les 60 créneaux (5 jours × 12 horaires de 15 minutes) dans `schedule_slots`.
- Vérifier que les inscriptions publiques sont désactivées, que les profils RLS sont actifs et que les comptes élèves sont invités individuellement.
- Tester avec deux comptes : un élève doit réserver une place, la voir depuis l’autre compte et ne pas pouvoir réserver une place occupée ; il ne doit pouvoir annuler que sa propre réservation.
- Tester l’accès direct et l’actualisation de `/souss-al-alima-online/espace-eleves` sur l’URL GitHub Pages déployée.
- Rejoindre le lien Telegram avec un compte élève et vérifier l’accès au salon vidéo.

La base de données et le code de déploiement sont préparés dans ce dépôt, mais la mise en service effective exige toujours de créer le projet Supabase, d’y exécuter la migration, de fournir les variables GitHub et d’inviter les élèves. Ces actions nécessitent l’accès au compte de l’institut et ne peuvent pas être réalisées depuis ce dépôt seul.

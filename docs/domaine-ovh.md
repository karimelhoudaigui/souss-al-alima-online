# Domaine soussalalima.fr

Le site est hébergé par GitHub Pages, dans le dépôt `karimelhoudaigui/souss-al-alima-online`. Le domaine a été acheté chez OVHcloud. L'adresse principale prévue est `https://soussalalima.fr/`, avec redirection de `www.soussalalima.fr` vers cette adresse.

## Préparation du site

Le workflow lit l'adresse configurée dans GitHub Pages avec `actions/configure-pages`. Il transmet son `base_path` à Vite via `PAGES_BASE_PATH` : `/souss-al-alima-online` pour l'adresse GitHub actuelle, une chaîne vide pour le domaine personnalisé. Vite normalise ce chemin avec une barre finale ; les images, vidéos, liens et routes utilisent ainsi la bonne racine.

Le portail Apps Script autorise explicitement les origines HTTPS `soussalalima.fr` et `www.soussalalima.fr`, ainsi que l'adresse GitHub existante. Publier cette modification sur le déploiement Apps Script existant est nécessaire au redimensionnement du cadre intégré et à l'affichage correct du planning.

## Raccordement

1. Vérifier que le domaine est actif et que la zone DNS OVH est accessible.
2. Dans les réglages Pages du dépôt GitHub, définir `soussalalima.fr` comme domaine personnalisé.
3. Dans OVHcloud → Noms de domaine → soussalalima.fr → Zone DNS, remplacer les éventuelles anciennes entrées web de la racine par les quatre entrées A ci-dessous. Le champ « Sous-domaine » reste vide pour la racine. Conserver les entrées mail et les serveurs DNS existants.

   | Sous-domaine OVH | Type | Cible |
   | --- | --- | --- |
   | vide | A | 185.199.108.153 |
   | vide | A | 185.199.109.153 |
   | vide | A | 185.199.110.153 |
   | vide | A | 185.199.111.153 |
   | www | CNAME | karimelhoudaigui.github.io. |

4. Remplacer les éventuelles anciennes entrées web de `www` par le CNAME ci-dessus. Supprimer seulement les entrées AAAA de la racine ou de `www` si elles pointent vers un autre hébergeur ; ne pas modifier les autres sous-domaines.
5. Relancer le workflow **Deploy to GitHub Pages** après le changement du domaine dans GitHub, pour compiler avec la nouvelle racine.
6. Après validation DNS et émission du certificat par GitHub, activer **Enforce HTTPS**. Vérifier l'accueil, les vidéos, les liens de navigation, l'ouverture directe de `/espace-eleves`, la connexion et la hauteur du planning. Vérifier également la redirection de `www`.

La configuration Pages utilise GitHub Actions : aucun fichier `CNAME` dans le dépôt n'est nécessaire. Les changements DNS peuvent prendre jusqu'à 24 heures ; le certificat HTTPS peut aussi demander un délai après validation DNS.

## Sources

- [GitHub — Gestion d'un domaine personnalisé](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [OVHcloud — Éditer une zone DNS](https://docs.ovhcloud.com/fr/guides/web-cloud/domains/dns-zone-edit)
- [Vite — Déploiement GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages)

## Compilation locale

```sh
# Adresse GitHub existante (valeur par défaut)
npm run build

# Domaine personnalisé, à la racine
PAGES_BASE_PATH='' npm run build
```

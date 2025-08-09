# Guide d'hébergement gratuit pour votre site عسل الفرنان

Ce guide vous explique comment héberger gratuitement votre site web avec GitHub Pages.

## Option 1: GitHub Pages (Recommandée)

### Étape 1: Créer un compte GitHub
1. Allez sur [GitHub.com](https://github.com)
2. Cliquez sur "Sign up" et suivez les instructions pour créer un compte gratuit

### Étape 2: Créer un nouveau dépôt
1. Une fois connecté, cliquez sur le bouton "+" en haut à droite, puis sur "New repository"
2. Nommez votre dépôt exactement: `[votre-nom-utilisateur].github.io` 
   (Remplacez [votre-nom-utilisateur] par votre nom d'utilisateur GitHub)
3. Assurez-vous que le dépôt est public
4. Cliquez sur "Create repository"

### Étape 3: Télécharger vos fichiers
1. Sur la page de votre nouveau dépôt, cliquez sur "uploading an existing file"
2. Glissez-déposez ou sélectionnez tous vos fichiers de site web:
   - index.html
   - improved-styles.css
   - google_sheets_script.js
   - Le dossier images/ et tous ses contenus
3. Ajoutez un message de commit comme "Premier téléchargement du site"
4. Cliquez sur "Commit changes"

### Étape 4: Vérifier votre site
1. Attendez quelques minutes pour que GitHub déploie votre site
2. Visitez `https://[votre-nom-utilisateur].github.io` pour voir votre site en ligne

## Option 2: Netlify (Alternative simple)

### Étape 1: Créer un compte Netlify
1. Allez sur [Netlify.com](https://www.netlify.com/)
2. Cliquez sur "Sign up" et créez un compte (vous pouvez utiliser votre compte GitHub)

### Étape 2: Déployer votre site
1. Sur le tableau de bord Netlify, cliquez sur "Add new site" > "Deploy manually"
2. Glissez-déposez le dossier contenant tous vos fichiers de site web
3. Netlify déploiera automatiquement votre site et vous fournira une URL

### Étape 3: Personnaliser votre domaine (optionnel)
1. Dans les paramètres du site, vous pouvez changer le sous-domaine Netlify par défaut
   (par exemple: `farnaan-honey.netlify.app`)

## Option 3: Vercel

Similaire à Netlify, Vercel offre également un hébergement gratuit avec une interface simple.
1. Créez un compte sur [Vercel.com](https://vercel.com)
2. Importez votre projet et suivez les instructions

## Remarques importantes

- Tous ces services hébergent des sites web statiques, ce qui est parfait pour votre site
- Votre formulaire Google continuera de fonctionner sans problème
- Si vous rencontrez des problèmes avec les chemins d'accès aux fichiers, assurez-vous que:
  - Tous les liens dans votre HTML utilisent des chemins relatifs
  - Les noms de fichiers respectent la casse (majuscules/minuscules)

Pour plus d'aide, vous pouvez consulter:
- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation Vercel](https://vercel.com/docs)

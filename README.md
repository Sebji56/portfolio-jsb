# portfolio-jsb

Site portfolio de Jean-Sébastien Bisson (« Seb Ji ») — développement des affaires et vente-conseil en solutions technologiques.

Construit avec [Astro](https://astro.build) et Tailwind CSS, avec l'aide de Claude Code. La démarche est documentée dans [JOURNAL_IA.md](JOURNAL_IA.md) ; les éléments à fournir sont dans [A_COMPLETER.md](A_COMPLETER.md).

## Travailler en local (PowerShell)

```powershell
npm install          # une seule fois
npm run dev          # site local sur http://localhost:4321, rechargé à chaque modification
npm run build        # compile le site final dans dist/
npm test             # tests unitaires
npm run test:dist    # tests sur le site compilé (après npm run build)
```

## Mettre le site en ligne (première fois)

### 1. Publier le code sur GitHub avec GitHub Desktop

1. Ouvrez **GitHub Desktop**.
2. Menu **File → Add local repository…**, choisissez `C:\Users\SebJi\portfolio-jsb`, puis **Add repository**.
3. Si la branche affichée en haut n'est pas `main`, choisissez **Branch → Merge into current branch** depuis `main` selon les consignes reçues, ou demandez à Claude de fusionner la branche de travail.
4. Cliquez sur **Publish repository**. Décochez **Keep this code private** (dépôt public, comme décidé), puis **Publish repository**.

### 2. Brancher Netlify sur le dépôt

1. Allez sur [app.netlify.com](https://app.netlify.com) et connectez-vous avec votre compte GitHub.
2. **Add new site → Import an existing project → Deploy with GitHub**.
3. Autorisez Netlify à voir le dépôt `portfolio-jsb`, puis choisissez-le.
4. Les réglages se remplissent seuls grâce au fichier `netlify.toml` (commande `npm run build`, dossier `dist`). Cliquez **Deploy**.
5. Après une à deux minutes, le site est en ligne sur une adresse du type `https://nom-au-hasard.netlify.app`.
6. Pour une adresse plus lisible : **Site configuration → Change site name** → `portfolio-jsb` (si libre). L'adresse devient `https://portfolio-jsb.netlify.app`. Si vous choisissez un autre nom, remplacez l'adresse dans `astro.config.mjs` (ligne `site:`), `public/robots.txt` et `public/.well-known/security.txt`.

### 3. Activer le formulaire de contact

1. Dans Netlify : **Forms → Enable form detection**, puis relancez un déploiement (**Deploys → Trigger deploy → Deploy site**).
2. Le formulaire « contact » apparaît dans **Forms**. Dans **Forms → Form notifications**, ajoutez une notification par courriel vers votre adresse.
3. Envoyez un message test depuis le site publié et vérifiez qu'il arrive.

### 4. Vérifier la sécurité en ligne

- Ouvrez [securityheaders.com](https://securityheaders.com) et entrez l'adresse de votre site : la note attendue est **A** ou **A+**.
- Ouvrez votre site, appuyez sur **F12 → Console** : aucun message rouge « Content Security Policy » ne doit apparaître.

### Mises à jour ensuite

Chaque modification envoyée sur GitHub (**Commit** puis **Push origin** dans GitHub Desktop) remet le site en ligne automatiquement en une à deux minutes.

## Nom de domaine (plus tard)

Noms vérifiés **non enregistrés** le 24 octobre 2026 (registres Verisign et CIRA) ; la disponibilité peut changer et certains noms peuvent être réservés ou vendus à prix « premium » :

| Nom | Idée |
|---|---|
| `sebji.ca` | Court, mémorable, le nom de vos badges et de LinkedIn ; .ca ancre au Québec |
| `sebji.com` | Même nom, extension internationale |
| `jsbisson.ca` | Initiales + nom, sobre et professionnel |
| `jsbisson.com` | Version internationale |
| `jeansebastienbisson.com` | Nom complet : facile à retrouver dans Google, plus long à taper |

Pour en brancher un :
1. Achetez-le chez un registraire (par exemple Netlify directement, ou un registraire canadien pour le .ca, qui exige d'être résident canadien).
2. Dans Netlify : **Domain management → Add a domain**, entrez le nom et suivez les instructions (soit Netlify gère le domaine, soit vous ajoutez les enregistrements DNS indiqués chez votre registraire).
3. Netlify installe le certificat HTTPS automatiquement.
4. Remplacez l'adresse `portfolio-jsb.netlify.app` par le nouveau domaine dans `astro.config.mjs`, `public/robots.txt` et `public/.well-known/security.txt`, puis publiez.

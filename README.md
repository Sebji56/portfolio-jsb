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

## CV téléchargeable

Le texte du CV se modifie dans `docs/cv/cv-fr.html` (une page Lettre). Pour régénérer le PDF publié sur le site :

```powershell
& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless=new --no-pdf-header-footer --allow-file-access-from-files "--print-to-pdf=$PWD\public\cv-jean-sebastien-bisson.pdf" "file:///$($PWD -replace '\\','/')/docs/cv/cv-fr.html"
```

Vérifier ensuite que le PDF tient toujours sur une seule page.

## Site en ligne

- Site : https://portfolio-jsb.netlify.app (projet Netlify « portfolio-jsb », équipe « SebJi Portfolio »)
- Code : https://github.com/Sebji56/portfolio-jsb

Réglages Netlify à conserver :
- **Visibilité : Public** (Netlify crée les projets en privé par défaut ; sans ce réglage, le site répond « 401 »).
- **Form detection : activée** (formulaire « contact »). Pour recevoir les messages par courriel : *Forms → Form notifications → Add notification*.
- **Powered by Netlify badge : désactivé** (*Project configuration → General*). Sinon, Netlify injecte un script `/.netlify/scripts/hud` que la politique de sécurité (CSP) bloque, ce qui affiche des erreurs dans la console et contredit la règle « aucun script tiers ».

Vérifier la sécurité en ligne : [securityheaders.com](https://securityheaders.com) avec l'adresse du site (note attendue A ou A+), et F12 → Console sur le site (aucun message rouge).

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

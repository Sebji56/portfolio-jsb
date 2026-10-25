type T = { fr: string; en: string };
export interface PhotoMeta { alt: T; credit?: T; creditUrl?: string; licenseUrl?: string }


/** Texte alternatif et crédit de chaque photo de src/assets/photos (clé = nom de fichier sans extension). */
export const photoMeta = {
  'portrait-professionnel': { alt: { fr: 'Portrait de Jean-Sébastien Bisson, souriant, en veston bleu marine sur fond bleu', en: 'Portrait of Jean-Sébastien Bisson, smiling, in a navy blazer against a blue background' } },
  'ardoisiere-kiosque-salon': { alt: { fr: 'Kiosque de L’Ardoisière en salon : panneaux de revêtements d’ardoise en bois et pierre, sous une charpente de bois éclairée', en: 'L’Ardoisière booth at a show: slate cladding panels framed in wood, under a lit timber frame' } },
  'bcedl-vancouver-conference': { alt: { fr: 'Jean-Sébastien sur scène au podium, présentant Proteus Labs au Demo Slam du symposium BCEDL à Vancouver', en: 'Jean-Sébastien on stage at the podium, presenting Proteus Labs at the BCEDL symposium Demo Slam in Vancouver' } },
  'bcedl-vancouver-kiosque': { alt: { fr: 'Jean-Sébastien, chapeau de cowboy noir, devant le kiosque Proteus Labs et ses casques de réalité virtuelle au symposium BCEDL à Vancouver', en: 'Jean-Sébastien, wearing a black cowboy hat, beside the Proteus Labs booth and its virtual reality headsets at the BCEDL symposium in Vancouver' } },
  'collision-toronto-2024': { alt: { fr: 'Jean-Sébastien devant les grandes lettres rouges de l’enseigne Collision à Toronto', en: 'Jean-Sébastien in front of the large red letters of the Collision sign in Toronto' } },
  'collision-toronto-portrait-casque-vr': { alt: { fr: 'Jean-Sébastien souriant, chapeau de cowboy noir, tenant un casque de réalité virtuelle à la conférence Collision', en: 'Jean-Sébastien smiling in a black cowboy hat, holding a virtual reality headset at the Collision conference' },
    credit: { fr: 'Photo : Ramsey Cardy / Collision via Sportsfile', en: 'Photo: Ramsey Cardy / Collision via Sportsfile' },
    creditUrl: 'https://www.flickr.com/photos/collisionconf/53802395183/',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/' },
  'edutech-asia-singapour-2023': { alt: { fr: 'Jean-Sébastien derrière l’enseigne EduTECH Asia 2023 à Singapour', en: 'Jean-Sébastien behind the EduTECH Asia 2023 sign in Singapore' } },
  'nsta-atlanta': { alt: { fr: 'Jean-Sébastien, casque de réalité virtuelle en main, devant l’enseigne de la conférence NSTA à Atlanta', en: 'Jean-Sébastien holding a virtual reality headset in front of the NSTA conference sign in Atlanta' } },
  'sxsw-edu-austin-2024': { alt: { fr: 'Jean-Sébastien avec un casque Meta Quest et ses manettes devant le mur SXSW 2024 à Austin', en: 'Jean-Sébastien with a Meta Quest headset and controllers in front of the SXSW 2024 wall in Austin' } },
  'kiosque-proteus-quebec-a-identifier-1': { alt: { fr: 'Kiosque Proteus Labs avec deux casques de réalité virtuelle et un écran, dans un salon au Québec', en: 'Proteus Labs booth with two virtual reality headsets and a screen, at a show in Quebec' } },
  'kiosque-proteus-quebec-a-identifier-2': { alt: { fr: 'Kiosque Proteus Labs avec casques de réalité virtuelle et tablette, dans un salon au Québec', en: 'Proteus Labs booth with virtual reality headsets and a tablet, at a show in Quebec' } },
  'iste-denver-2024': { alt: { fr: 'Jean-Sébastien, chapeau de cowboy noir, devant le kiosque Proteus Labs au salon ISTE à Denver', en: 'Jean-Sébastien, in a black cowboy hat, in front of the Proteus Labs booth at ISTE in Denver' } },
  'octe-london-2024': { alt: { fr: 'Jean-Sébastien, casque de réalité virtuelle en main, à côté du kiosque Proteus Labs à la conférence OCTE à London, en Ontario', en: 'Jean-Sébastien holding a virtual reality headset next to the Proteus Labs booth at the OCTE conference in London, Ontario' } },
} satisfies Record<string, PhotoMeta>;

export type PhotoId = keyof typeof photoMeta;

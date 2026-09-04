
<img src="public/favicon.png" alt="Riddly logo" width="100"/>

# Riddly

🃏 [Démo live](https://riddly.tom-depasse.be/) | 🇬🇧 [English version](README.md)

## Une pile de cartes. Des devinettes, des blagues. Un swipe !

Riddly est une petite application ludique que j'ai construite pour approfondir ma pratique front autour d'une pile de cartes swipables. On choisit un mode (blagues ou devinettes), on swipe les cartes du paquet, on tape sur une carte pour révéler les indices et la réponse.

## Captures d'écran
| Écran d'accueil                                                            | Pile de cartes                                                                  | Dos de la carte                                                                 |
|----------------------------------------------------------------------------|---------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| <img src="assets/screenshots/home.png" alt="Ecran d'accueil" width="200"/> | <img src="assets/screenshots/card-stack.png" alt="Pile de cartes" width="200"/> | <img src="assets/screenshots/card-back.png" alt="Dos d'une carte" width="200"/> |

## Démo GIF
![Demo GIF](assets/screenshots/demo.gif)

## Fonctionnalités
- Deux modes : devinettes et blagues, sélectionnables depuis l'écran d'accueil.
- Swipe vers la gauche ou vers la droite pour passer à la carte suivante.
- Tap pour révéler les indices et la réponse.
- Mobile-first : pensé pour le pouce mais tourne aussi très bien sur desktop.

## Stack technique
- **React 19** + **TypeScript** (strict), compilés par **Vite 8** avec le **React Compiler** pour la mémoïsation automatique.
- **TanStack Router** avec routing basé sur les fichiers (arbre de routes généré par son plugin Vite).
- **Tailwind CSS v4** avec des variables de thème en OKLCH, **shadcn/ui** (style radix-nova) sur **Radix UI**, et **Tabler Icons**.
- **motion/react** pour les animations de drag, de swipe et de retournement de la pile de cartes.
- **PocketBase** comme backend (cartes, catégories), auto-hébergé via le `Dockerfile` fourni.
- **ESLint** (avec règles de nommage kebab-case) + **Prettier** pour la qualité du code.

## Roadmap
Fonctionnalités à venir :

- [ ] Onboarding au premier lancement de l'app : mini-tour des gestes (swipe/tap) pour les nouveaux arrivants.
- [ ] Backoffice (avec auth) pour gérer les cartes.
- [ ] Favoris et historique "déjà vu"
- [ ] Annuler le dernier swipe
- [ ] Modes de jeu : solo, soirée (avec maître du jeu), multijoueur en ligne.
- [ ] Catégories de cartes : geek, sportif, politique, etc.
- [ ] Blague/devinette du jour
- [ ] Skin de cartes

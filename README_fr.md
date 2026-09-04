
<img src="public/favicon.png" alt="Riddly logo" width="100"/>

# Riddly

🃏 [Démo live](https://riddly.tom-depasse.be/) | 🇬🇧 [English version](README.md)

## Une pile de cartes. Des devinettes, des blagues. Un swipe !

Riddly, c'est un paquet de cartes dans ta poche, à sortir entre amis. Une personne tient le téléphone et fait le maître du jeu : elle lit la carte à voix haute aux autres joueurs, swipe pour passer à la suivante, et tape sur la carte pour la retourner. Au dos, l'indice et la réponse sont côte à côte — pour les lâcher au bon moment, quand la table sèche ou quand quelqu'un a trouvé. Rien à installer, pas de compte à créer : juste de quoi meubler cinq minutes d'attente ou lancer un défi à la table d'à côté.

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
- **PocketBase** comme backend (cartes, catégories).
- **ESLint** (avec règles de nommage kebab-case) + **Prettier** pour la qualité du code.

## Installation

Node.js `^20.19` ou `>=22.12` (requis par Vite 8) et npm.

```bash
git clone git@github.com:tomd7/riddly.git
cd riddly
npm install
cp .env.example .env
npm run dev
```

C'est tout — `.env.example` pointe déjà vers l'instance PocketBase publique, l'app tourne donc directement sur le vrai paquet de cartes. Elle est servie sur `http://localhost:5173` (le serveur de dev tourne avec `--host`, elle est donc aussi accessible depuis ton téléphone sur le même réseau).

### Scripts
| Commande          | Description                                        |
|-------------------|----------------------------------------------------|
| `npm run dev`     | Lance le serveur de dev Vite                       |
| `npm run build`   | Vérifie les types (`tsc -b`) puis build de prod    |
| `npm run preview` | Sert le build de production en local               |
| `npm run lint`    | Lance ESLint sur tout le projet                    |

### Héberger son propre backend
L'instance publique est en lecture seule. Pour faire pointer `VITE_PB_URL` vers ton propre [PocketBase](https://pocketbase.io/), il lui faut deux collections avec des règles `list` et `view` publiques :

| Collection        | Champs                                                                                                     |
|-------------------|------------------------------------------------------------------------------------------------------------|
| `card_categories` | `label`, `color`, `icon`, `description`, `route`, `example`, `deleted` (bool)                              |
| `humour_cards`    | `title`, `hint`, `answer`, `type` (`riddle` \| `joke`), `deleted` (bool), `category` et `sub_category` (relations vers `card_categories`) |

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

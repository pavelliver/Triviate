# Triviate

A pass-the-phone trivia board game for 2 to 5 teams.

No dice: before every question you rate yourself from 1 to 5. That number is both the difficulty of the question and the number of spaces you move if you get it right. First team to answer the Reckoning on tile 60 wins.

**Play it here: https://pavelliver.github.io/Triviate/**

## Install it on your phone

- **Android (Chrome):** open the link, then tap **Install Triviate on this phone** on the start screen (or ⋮ menu → **Install app**).
- **iPhone (Safari):** open the link, then **Share** → **Add to Home Screen**.

Once installed it opens like an app, works without internet, keeps the screen awake during a game, and saves the game after every step: close it and reopen it to resume.

## How to play

- **The board:** 60 tiles. The tile you stand on chooses your category: Geography, Science, Nature, History, Arts & Letters, Music, Sport, Screen, The Table or World.
- **Your turn:** you get a topic in that category (one swap per team). Pick a level from 1 (very easy) to 5 (very hard), read the question, answer out loud, then reveal the answer. The other teams judge. Right: move that many spaces. Wrong: stay put.
- **Fortune tiles:** name as many items as you can from a list of 5 to 10. One space per item.
- **Misfortune tiles:** a setback, such as only being allowed levels 4 and 5, going back after a wrong answer, or losing a turn.
- **The Reckoning (tile 60):** put five things in exactly the right order. All five right and you win; otherwise try again next turn.

## What's inside

- 10,000 questions: 10 categories × 200 topics × 5 levels
- 400 fortune lists and 264 reckonings

## Making changes

The whole game is one React file, `src/triviate.jsx`. To rebuild the app after editing it:

```
npm install
npm run build
```

This regenerates `app.js` and `sw.js` (the offline cache). Commit both and GitHub Pages publishes the update.

## Credits

Fonts: [Fredoka](https://fonts.google.com/specimen/Fredoka) and [Nunito](https://fonts.google.com/specimen/Nunito), SIL Open Font License. Built with Claude.

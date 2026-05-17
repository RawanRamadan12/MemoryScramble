## The Memory Scramble Game
In the traditional matching game Memory Scramble, players must locate concealed icon pairings on a grid before the allotted time expires. This project was created as a component of a Software Construction Tools assignment that concentrated on GUI development, version control, and configuration management.

## Features
- Configurable board size
- Countdown timer with warning animation
- Moves counter
- Pairs found tracker
- Win and Game Over messages
- Play Again button
- Smooth card flip animation
- Mobile responsive design

## Built With

- HTML5
- CSS3 (Animations, Grid, Flexbox)
- Vanilla JavaScript

## How to Run the Game

# Option 1: Direct Browser
1. Download or clone the repository
2. Open the index.html file in any browser
3. Start playing!

# Option 2: Clone from GitHub

### How to Play
## Configuration: Upon launching, the game will prompt you to enter:
Number of Rows: (e.g., 4)
Number of Columns: (e.g., 4)
Time Limit: (e.g., 60 seconds)
Note: Rows × Columns must be an even number.
Gameplay:
Click a card to reveal its symbol.
Click a second card to find a match.
If they match, they stay face-up.
If they don't match, they flip back over after a short delay.
Winning: Match all cards to clear the board!

## Configuration Management (Git Flow)
This project follows professional software construction practices:
No "Big Bang" Commits: The history is divided into small, logical commits (e.g., UI setup, game logic, timer integration).
Branching: Features were developed on separate branches and merged into the main branch via Pull Requests.

## Team Members

- Rawan : Repository Setup & HTML Structure (index.html)
- Alaa  :  Game Logic, Timer Mechanics & CSS Styling (game.js, style.css)
- Basmalla : Configuration, Input Validation Logic & Quality Assurance (config.js)
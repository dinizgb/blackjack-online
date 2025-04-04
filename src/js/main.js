// CSS
import '../css/blackjack.css'
import '../css/reset.css'

// JS
import { Blackjack } from '../js/blackjack.js'

document.querySelector('#app').innerHTML = `
  <div class="container">
        <h1>Blackjack</h1>
        <div id="gameStatus"></div>
        <div class="hand">
            <h2>Dealer's Hand: <span id="dealerScore"></span></h2>
            <div id="dealerHand"></div>
        </div>
        <div class="hand">
            <h2>Player's Hand: <span id="playerScore"></span></h2>
            <div id="playerHand"></div>
        </div>
        <div>
            <button class="button" id="newGame">New Game</button>
            <button class="button" id="hit" disabled>Hit</button>
            <button class="button" id="stand" disabled>Stand</button>
        </div>
    </div>
`

// HANDLE BLACKJACK GAME
const game = new Blackjack();
document.getElementById('newGame').addEventListener('click', () => game.startNewGame());
document.getElementById('hit').addEventListener('click', () => game.hit());
document.getElementById('stand').addEventListener('click', () => game.stand());
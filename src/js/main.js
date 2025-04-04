// CSS
import '../css/blackjack.css'
import '../css/shared.css'
import '../css/reset.css'

// JS
import { Blackjack } from '../js/blackjack/'

// PAGES
import { blackjackView } from '../views/blackjack'

document.querySelector('#app').innerHTML = blackjackView

// Game initialization
/** @type {Blackjack} */
const game = new Blackjack()

/**
 * Event listeners for game controls
 */
document.getElementById('newGame').addEventListener('click', () => game.startNewGame())
document.getElementById('hit').addEventListener('click', () => game.hit())
document.getElementById('stand').addEventListener('click', () => game.stand())
document.getElementById('closeDialog').addEventListener('click', () => game.closeStatusDialog())
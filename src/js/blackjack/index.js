import { Deck } from './deck.js';
import { Hand } from './hand.js';

/**
 * Manages the Blackjack game state and logic
 * @class
 */
export class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.gameOver = true;
    }

    /**
     * Resets game state to start a new one
     */
    startNewGame() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.gameOver = false;

        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());
        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());

        this.updateUI();

        const playerScore = this.playerHand.getScore();
        const dealerScore = this.dealerHand.getScore();

        if (playerScore === 21 || dealerScore === 21) {
            this.endGame();
        }

    }

    /**
     * Handles player drawing a card
     */
    hit() {
        this.playerHand.addCard(this.deck.draw());
        const score = this.playerHand.getScore();
        
        if (score > 21) {
            this.endGame();
        } else if (score === 21) {
            this.stand();
        }

        this.updateUI();
    }

    /**
     * Handles player standing, triggers dealer's turn
     */
    stand() {
        while (this.dealerHand.getScore() < 17) {
            this.dealerHand.addCard(this.deck.draw());
        }
        this.endGame();
        this.updateUI();
    }

    /**
     * Ends the current game
     */
    endGame() {
        this.gameOver = true;
        this.updateUI();
    }

    /**
     * Determines the winner of the game
     * @returns {string} The result message
     */
    getWinner() {
        const playerScore = this.playerHand.getScore();
        const dealerScore = this.dealerHand.getScore();

        const rules = [
            { condition: () => playerScore > 21, message: "Dealer wins :(" },
            { condition: () => dealerScore > 21, message: "You've won :)" },
            { condition: () => playerScore > dealerScore, message: "You've won :)" },
            { condition: () => dealerScore > playerScore, message: "Dealer wins :(" },
            { condition: () => true, message: "It's a tie :|" }
        ];
    
        return rules.find(rule => rule.condition()).message;
    }

    /**
     * Updates the game UI with current state
     */
    updateUI() {
        document.getElementById("welcomeMessage")?.remove();
        document.getElementById('playerHand').innerHTML = this.playerHand.cards
            .map(card => `<figure class="card"><img src="/images/cards/${card.suit}-${card.rank}.png" alt="${card.rank} ${card.suit}" /></figure>`).join('');
        document.getElementById('playerScore').textContent = `Your Hand: ${this.playerHand.getScore()}`;
        document.getElementById('dialogStatusPlayerScore').textContent = `${this.playerHand.getScore()}`;

        let dealerCards = this.dealerHand.cards.map((card, index) => {
            if (index === 0 && !this.gameOver) {
                return '<figure class="card hidden"><img src="/images/cards/card-back.png" alt="Hidden card" /></figure>';
            }
            return `<figure class="card"><img src="/images/cards/${card.suit}-${card.rank}.png" alt="${card.rank} ${card.suit}" /></figure>`;
        });
        document.getElementById('dealerHand').innerHTML = dealerCards.join('');
        document.getElementById('dealerScore').textContent = this.gameOver ? `Dealer's Hand: ${this.dealerHand.getScore()}` : `Dealer's Hand: ?`;
        document.getElementById('dialogStatusDealerScore').textContent = `${this.dealerHand.getScore()}`;

        
        document.getElementById('gameStatus').textContent = 
            this.gameOver ? (document.getElementById("statusDialog").showModal(), this.getWinner()) : '';

        document.getElementById('hit').disabled = this.gameOver;
        document.getElementById('stand').disabled = this.gameOver;
    }

    /**
     * Closes the Status Dialog
     */
    closeStatusDialog() {
        document.getElementById("statusDialog").close();
        this.startNewGame();
    }
}
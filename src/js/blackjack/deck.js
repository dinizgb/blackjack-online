import { Card } from './card.js'

/**
 * Represents a standard 52-card deck
 * @class
 */
export class Deck {
    /**
     * Creates a new deck with 52 cards
     */
    constructor() {
        this.cards = []
        const suits = ['spades', 'hearts', 'diamonds', 'clubs']
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a']
        
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank))
            }
        }
    }

    /**
     * Shuffles the deck using Fisher-Yates algorithm
     */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    /**
     * Draws and removes the top card from the deck
     * @returns {Card} The drawn card
     */
    draw() {
        return this.cards.pop()
    }
}
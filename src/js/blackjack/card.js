/**
 * Represents a single playing card with suit and rank
 * @class
 */
export class Card {
    /**
     * Creates a new Card instance
     * @param {string} suit - The suit of the card (SPADES, HEART, DIAMOND, CLUBS)
     * @param {string} rank - The rank of the card (2-10, J, Q, K, A)
     */
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    /**
     * Gets the numerical value of the card
     * @returns {number} The point value (2-10 for numbers, 10 for face cards, 11 for Ace)
     */
    getValue() {
        if (['j', 'q', 'k'].includes(this.rank)) return 10;
        if (this.rank === 'a') return 11;
        return parseInt(this.rank);
    }

    /**
     * Returns a string representation of the card
     * @returns {string} The card as rank+suit (e.g., "A♠")
     */
    toString() {
        return `${this.rank}${this.suit}`;
    }
}
/**
 * Represents a single playing card with suit and rank
 * @class
 */
export class Card {
    /**
     * Creates a new Card instance
     * @param {string} suit - The suit of the card (e.g., 'spades', 'hearts', 'diamonds', 'clubs')
     * @param {string} rank - The rank of the card (e.g., '2'-'10', 'j', 'q', 'k', 'a')
     */
    constructor(suit, rank) {
        if (!suit || !rank) throw new Error('Suit and rank are required')
        this.suit = suit.toLowerCase()
        this.rank = rank.toLowerCase()
    }

    /**
     * Gets the numerical value of the card
     * @returns {number} The point value (2-10 for numbers, 10 for face cards, 11 for Ace)
     */
    getValue() {
        const faceCards = ['j', 'q', 'k']
        if (faceCards.includes(this.rank)) return 10
        if (this.rank === 'a') return 11
        const value = parseInt(this.rank)
        return isNaN(value) ? 0 : value // Default to 0 for invalid ranks
    }

    /**
     * Returns a string representation of the card
     * @returns {string} The card as rank+suit (e.g., "A♠")
     */
    toString() {
        return `${this.rank}${this.suit}`
    }
}
/**
 * Represents a hand of cards for player or dealer
 * @class
 */
export class Hand {
    /**
     * Creates an empty hand
     */
    constructor() {
        this.cards = []
    }

    /**
     * Adds a card to the hand
     * @param {Card} card - The card to add
     */
    addCard(card) {
        this.cards.push(card)
    }

    /**
     * Calculates the total score of the hand, adjusting aces as needed
     * @returns {number} The total score
     */
    getScore() {
        let score = 0
        let aces = 0

        for (let card of this.cards) {
            let value = card.getValue()
            if (value === 11) aces++
            score += value
        }

        while (score > 21 && aces > 0) {
            score -= 10
            aces--
        }

        return score
    }
}
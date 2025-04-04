class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    getValue() {
        if (['J', 'Q', 'K'].includes(this.rank)) return 10;
        if (this.rank === 'A') return 11;
        return parseInt(this.rank);
    }

    toString() {
        return `${this.rank}${this.suit}`;
    }
}

class Deck {
    constructor() {
        this.cards = [];
        const suits = ['♠', '♥', '♦', '♣'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        
        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        return this.cards.pop();
    }
}

class Hand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    getScore() {
        let score = 0;
        let aces = 0;

        for (let card of this.cards) {
            let value = card.getValue();
            if (value === 11) aces++;
            score += value;
        }

        while (score > 21 && aces > 0) {
            score -= 10;
            aces--;
        }

        return score;
    }
}

export class Blackjack {
    constructor() {
        this.deck = new Deck();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.gameOver = true;
    }

    startNewGame() {
        this.deck = new Deck();
        this.deck.shuffle();
        this.playerHand = new Hand();
        this.dealerHand = new Hand();
        this.gameOver = false;

        // Initial deal
        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());
        this.playerHand.addCard(this.deck.draw());
        this.dealerHand.addCard(this.deck.draw());

        this.updateUI();
    }

    hit() {
        this.playerHand.addCard(this.deck.draw());
        const score = this.playerHand.getScore();
        
        if (score > 21) {
            this.endGame();
        }
        this.updateUI();
    }

    stand() {
        // Dealer's turn
        while (this.dealerHand.getScore() < 17) {
            this.dealerHand.addCard(this.deck.draw());
        }
        this.endGame();
        this.updateUI();
    }

    endGame() {
        this.gameOver = true;
        this.updateUI();
    }

    getWinner() {
        const playerScore = this.playerHand.getScore();
        const dealerScore = this.dealerHand.getScore();

        if (playerScore > 21) return "Dealer wins! Player busts.";
        if (dealerScore > 21) return "Player wins! Dealer busts.";
        if (playerScore > dealerScore) return "Player wins!";
        if (dealerScore > playerScore) return "Dealer wins!";
        return "It's a tie!";
    }

    updateUI() {
        // Update player hand
        document.getElementById('playerHand').innerHTML = this.playerHand.cards
            .map(card => `<span class="card">${card.toString()}</span>`).join('');
        document.getElementById('playerScore').textContent = this.playerHand.getScore();

        // Update dealer hand
        let dealerCards = this.dealerHand.cards.map((card, index) => {
            if (index === 0 && !this.gameOver) {
                return '<span class="card hidden">??</span>';
            }
            return `<span class="card">${card.toString()}</span>`;
        });
        document.getElementById('dealerHand').innerHTML = dealerCards.join('');
        document.getElementById('dealerScore').textContent = 
            this.gameOver ? this.dealerHand.getScore() : '?';

        // Update game status
        document.getElementById('gameStatus').textContent = 
            this.gameOver ? this.getWinner() : '';

        // Update button states
        document.getElementById('hit').disabled = this.gameOver;
        document.getElementById('stand').disabled = this.gameOver;
    }
}
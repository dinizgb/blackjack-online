export const BlackjackView = `
  <header class="container ta-center">
      <h1 class="logo">Blackjack Online</h1>
    </header>
    <main class="container d-flex fd-column jc-center">
      <div class="main-content ai-center d-flex fd-column">
        <section class="app-white ta-center" id="welcomeMessage" role="alert">
          <h2 class="heading-2">Welcome!</h2>
          <h3 class="heading-3">Welcome! Press "new game" to start playing.</h3>
        </section>
        <section aria-live="assertive">
          <div class="dealer-hand d-flex jc-center" id="dealerHand"></div>
          <p aria-live="assertive" class="score-tooltip" id="dealerScore"></p>
        </section>
        <section aria-live="assertive">
          <div class="player-hand d-flex jc-center" id="playerHand"></div>
          <p aria-live="assertive" class="score-tooltip" id="playerScore"></p>
        </section>
      </div>
    </main>
    <footer>
      <section
        class="container game-actions d-flex jc-space-evenly"
        aria-label="Blackjack game actions"
      >
        <button class="game-actions-button new-game-button" id="newGame">
          New Game
        </button>
        <button class="game-actions-button hit-button" id="hit" disabled>
          Hit
        </button>
        <button class="game-actions-button stand-button" id="stand" disabled>
          Stand
        </button>
      </section>
    </footer>
    <dialog id="statusDialog">
      <h2 class="app-white heading-2" id="gameStatus"></h2>
      <h3 class="app-white heading-3">Dealer: <span id="dialogStatusDealerScore"></span> / You: <span id="dialogStatusPlayerScore"></span></h3>
      <button
        class="game-actions-button new-game-dialog-button"
        id="closeDialog"
      >
        Start a new game!
      </button>
    </dialog>`
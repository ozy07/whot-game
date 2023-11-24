const Game = require('../../gaming/Game');


test('random test', () => {
    const first_game = new Game("Gary", "Mike");
    console.log(first_game);
    first_game.play();

    expect(first_game.board.in_play_cards.length + first_game.board.deck.cardsInDeck.length 
        + first_game.players[0].hand.length + first_game.players[1].hand.length).toBe(54);
    expect(first_game.board.deck.cardsInDeck.length).toBe(0);

});
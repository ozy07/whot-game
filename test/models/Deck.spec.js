const Deck = require('../../models/Deck');

test('first test', () => {
    const deck = new Deck();
    expect(deck.cardsInDeck.length).toBe(54);

    const newDeck = new Deck(deck.cardsInDeck.pop());

    expect(deck.cardsInDeck.length).toBe(53);


    deck.shuffle();


    expect(deck.cardsInDeck.length).toBe(53);

});
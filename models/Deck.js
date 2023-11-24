import Card from './Card';
import {SUITS_AND_NUMBERS, IMAGES} from './Constants';

module.exports = class Deck{
    cardsInDeck = [];

    constructor(){
        this.createDeck();
        this.shuffle();
    }

    shuffle(){
        //shuffle the cards in the deck
        numOfCards = this.cardsInDeck.length;
        for(let index = numOfCards - 1; index > 0; index--){
            randomIndex = Math.floor(Math.random() * index);
            this.swap(index, randomIndex);
        }
    }

    /**
     * Create deck based on the shapes constant
     */
    createDeck(){
        for(var suit in SUITS_AND_NUMBERS){
            numbers = SUITS_AND_NUMBERS[suit];
            for(let index = 0; index < numbers.length; index++){
                this.cardsInDeck.push(new Card(numbers[index], suit, IMAGES[suit]));
            }
        }   
    }

    swap(index, randomIndex){
        temp = this.cardsInDeck[index];
        this.cardsInDeck[index] = this.cardsInDeck[randomIndex];
        this.cardsInDeck[randomIndex] = temp;
    }

    addToDeck(cards){
        this.cardsInDeck.unshift(cards);
    }

    dealTopCard(){
        return this.cardsInDeck.pop();
    }
}
import Deck from './Deck';
module.exports = class Board{
    players = [];
    deck = null;
    in_play_cards = [];
    numberOfPlayers = 0;
    gameType = null;
    gameOver = false;
    requestedShape = null;

    constructor(players, gameType){
        // single or multiplayer
        // traditional or custon
        if(players){
            this.players.push(players);
            this.deck = new Deck();
            this.numberOfPlayers = players.length;

            gameType = (!gameType) ? "traditional" : "custom";
        }
    }

    replenishDeckWithPlayedCards(){
        if(this.deck.cardsInDeck.length == 0){
            top_card = this.in_play_cards.pop();
            this.deck.addToDeck(this.in_play_cards);
            this.deck.shuffle();
            this.in_play_cards.push(top_card);
        }
    }

    showPlayerHand(playerID){
        console.log(players[playerID].hand);
    }

    checkIfGameIsOver(){
        // game is over when a player wins OR opponent quits
        for(var player in this.players){
            if(this.players[player].playerWins){
                this.gameOver = true;
                return player;
            }
        }

        return false;
    }
}
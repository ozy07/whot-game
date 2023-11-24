import Board from '../models/Board';
import Player from '../models/Player';

module.exports = class Game{
    players = [];
    board = {};
    gameOver = false;
    gameWinner = null;
    rules = {};
    startOfGame = true;
    active_player = "";

    constructor(player1, player2, rules){
        if(player1 && player2){
            this.players = [];
            this.players.push(new Player(player1));
            this.players.push(new Player(player2));

            this.board = new Board(this.players);
        }
    }

    play(){
        while(!this.gameOver){
            //play the game
            //this.displayTheBoard();
            if(this.board.deck.cardsInDeck.length == 0){
                //end game or replenish
                this.gameOver = true;
                console.log("gameover because deck is empty");
                //this.board.replenishDeckWithPlayedCards(); infinite loop of continous gaming
            }

            if(this.gameOver){
                this.gameWinner = this.calculatePlayerHands().lowestPlayer[0];
                this.showWinnerBanner();
                break;
            }

            if(this.startOfGame){
                this.decideWhoStartsFirst();
                this.dealCardsToPlayers();
                this.autoPlayFirstCard();
                this.startOfGame = false;
            }
            
            this.active_player.play(this.board);

            //check if there is a winner
            winner = this.board.checkIfGameIsOver();
            if(winner){
                this.gameOver = true;
                this.gameWinner = winner;
                this.showWinnerBanner();
                break;
            }

            this.checkAndEnforceConsequence();
        }
    }

    showWinnerBanner(){
        // do something fancy
        console.log("*******************************************")
        console.log(this.gameWinner.name + " has won the game :D")
        console.log("*******************************************")

    }

    displayTheBoard(){
        //modify to show only cards
        console.log(this.board.in_play_cards[this.board.in_play_cards.length - 1]);
    }

    decideWhoStartsFirst(){
        randomIndex = Math.floor(Math.random() * this.players.length);
        this.active_player = this.players[randomIndex];
        this.active_player.isPlayersTurn = true;
    }

    swithToNextPlayer(player){
        player.isPlayersTurn = false;
        index = this.players.indexOf(player) + 1;
        index = index % this.players.length;
        this.active_player = this.players[index];
        this.active_player.isPlayersTurn = true;
    }

    dealCardsToPlayers(rules){
        numOfCardsEach = 4;
        //check if dealing this many cards each to all players will break the game? Setup with rules object
        while(numOfCardsEach > 0){
            for(const player in this.players){
                //console.log(this.players);
                this.players[player].hand.push(this.board.deck.dealTopCard());
            }
            numOfCardsEach--;
        }
    }

    autoPlayFirstCard(){
        this.board.in_play_cards.push(this.board.deck.dealTopCard());
    }

    endGame(){
        this.gameOver = true;
    }

    checkAndEnforceConsequence(){
        // no consequenses for now
        this.swithToNextPlayer(this.active_player);
    }

    calculatePlayerHands(){
        let lowScore = 1000;
        let highScore = -1000;
        let lowestPlayer = [];
        let highestPlayer = [];

        for(var player in this.players){
            this.players[player].calculateHand();

            if(this.players[player].score > highScore){
                highestPlayer = [this.players[player]];
                highScore = this.players[player].score;
            } else if (this.players[player].score == highScore){
                highestPlayer.push(this.players[player]);
            }

            if(this.players[player].score < lowScore){
                lowestPlayer = [this.players[player]];
                lowScore = this.players[player].score;
            } else if(this.players[player].score == lowScore){
                lowestPlayer.push(this.players[player]);
            }
        }

        var results = {
            lowestPlayer: lowestPlayer,
            highestPlayer: highestPlayer
        }

        return results;
    }
}
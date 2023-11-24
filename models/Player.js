module.exports = class Player{
    name = ""
    image = ""
    score = 0
    hand = []
    lastCard = false;
    isPlayersTurn = false;
    playerWins = false;

    constructor(name, image){
        this.name = name
        this.image = image
    }

    play(index, board){
        //todo
        //check if its player turn
        if(this.isPlayersTurn){
            // current_shape = board.in_play_cards[board.in_play_cards.length-1].shape;
            // current_number = board.in_play_cards[board.in_play_cards.length-1].number;

            //get playable cards
            // let playable_cards_index = this.whatCanIPlay(current_shape, current_number);

            // if(playable_cards_index.length < 1){
            //     this.draw(board);
            //     return;
            // }

            // Have the user enter input here to select the desired card, replace 0 with user input
            // let selected_card_index = playable_cards_index[0];
            // Assume the user selects the card they like.

            let selected_card = this.hand[index];

            board.in_play_cards.push(selected_card);
            this.hand.splice(index, 1);
            if(this.hand.length == 0){
                this.playerWins = true;
                return;
            }
            if(this.hand.length == 1){
                this.lastCard = true;
            }
        }
    }

    draw(board){
        //todo
        //draw the top card from deck
        if(board.deck.cardsInDeck.length == 0){
            return false;
        }
        this.hand.push(board.deck.cardsInDeck.pop());
        return true;
    }

    doIHaveSomethingToPlay(current_shape, current_number){
        // return true or false for whether this player can play anything
        if(current_number == 20) return true;
        for(var card in this.hand){
            if(this.hand[card].number == current_number || this.hand[card].shape == current_shape){
                return true;
            }
            // Implememt a hashSet to store available shapes and numbers in hand to 
            // enable fast look up instead of iterating through 
        }
        return false;
    }

    whatCanIPlay(current_shape, current_number){
        let index_of_playable_cards = [];
        if(this.doIHaveSomethingToPlay(current_shape, current_number)){
            for(var card in this.hand){
                if(this.hand[card].number == current_number || this.hand[card].shape == current_shape || 20 == current_number){
                    index_of_playable_cards.push(this.hand.indexOf(this.hand[card]));
                }
                // Implememt a hashSet to store available shapes and numbers in hand to 
                // enable fast look up instead of iterating through 
            }
        }
        return index_of_playable_cards;
    }

    calculateHand(){
        let total = 0;
        for(var card in this.hand){
            total += this.hand[card].number;
        }
        this.score = total;
    }

    canIPlayThisCard(selectedIndex, board){
        return this.hand[selectedIndex].number === board.in_play_cards[board.in_play_cards.length - 1].number ||
            this.hand[selectedIndex].shape === board.in_play_cards[board.in_play_cards.length - 1].shape ||
            this.hand[selectedIndex].shape === board.requestedShape ||
            this.hand[selectedIndex].number === 20;
    }

    requestShape(shape, board){
        board.requestedShape = shape;
    }
}
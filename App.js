import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import Card from './app/card-component';
import DisplayCard from './app/display-card';
import Game from './gaming/Game';
import ShapeSelection from './app/shape-selection-modal';

export default function App() {

  const [selectedIndex, setSelectedIndex]  = useState(-1);
  const [player1name, setPlayer1name]  = useState("");
  const [player2name, setPlayer2name]  = useState("");
  const [currentGame, setCurrentGame]  = useState(game);
  const [showRequestCardModal, setShowRequestCardModal]  = useState(false);
  const [requestShape, setRequestShape]  = useState("");

  let game = new Game(); //Blank basic game

  const handleStartGame = (player1, player2) => {
    game = new Game(player1, player2);
    game.dealCardsToPlayers();
    game.decideWhoStartsFirst();
    game.autoPlayFirstCard();
    setCurrentGame(game);
    game = false;
  }

  const playSelectedCard = (index, board) =>{
    if(!currentGame.active_player.canIPlayThisCard(index, board)){
      Alert.alert('Illegal Play', 'Cannot play selected card, please check hint or draw new card', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    let cardToPlay = currentGame.active_player.hand[index];
    if(cardToPlay.number === 20 && !currentGame.active_player.lastCard){
      // make sure player selects shape before proceeding otherwise return
      // opem modal
       setShowRequestCardModal(true)
       return;
    }

    currentGame.active_player.play(index, board);

    if(currentGame.active_player.playerWins){
      let winner = currentGame.active_player.name + ' WINS the GAME!'

      Alert.alert('GAME OVER', winner, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    currentGame.checkAndEnforceConsequence();
    board.requestShape = null; //reset requested shape
    setRequestShape(null);
    setCurrentGame(currentGame);
    setSelectedIndex('-1');
  }

  const drawCardFromDeck = (board) => {
    if(currentGame.active_player.draw(board)){
      currentGame.swithToNextPlayer(currentGame.active_player);
      //setCurrentGame(currentGame);
      setCurrentGame(currentGame);
      setSelectedIndex(Math.random());
    }
    else{
      // replenish or end game
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}> 
        <Text>Player {[game.active_player, currentGame && currentGame.active_player.name]}'s Turn to play</Text>
          <TextInput
            style={{height: 40}}
            placeholder="Type Player1 name!"
            defaultValue={""}
            onChangeText={player1name => setPlayer1name(player1name)}
          />
          <TextInput
            style={{height: 40}}
            placeholder="Type Player2 name!"
            defaultValue={""}
            onChangeText={player2name => setPlayer2name(player2name)}
          />
        <Button title = {"START GAME"}
           onPress={ () =>
            handleStartGame(player1name, player2name)
          }
        >
        </Button>

      </View>
      <View style={styles.in_play_card_area}>
        <View style={styles.right_in_play_card}>
          <TouchableOpacity
            onPress={() => {
              drawCardFromDeck(currentGame.board);
            }}
          >
            {
              [[], currentGame &&
              <DisplayCard 
                key = {currentGame.board.deck.cardsInDeck.length - 1}
                shape = {['', currentGame.board.deck.cardsInDeck.length > 0 && 'market']} 
                number = {['', currentGame.board.deck.cardsInDeck.length > 0 && 'Market = ' + currentGame.board.deck.cardsInDeck.length]}/>
              ]
            }
          </TouchableOpacity>
        </View> 
        <View style={styles.in_play_card}>{
          [[], currentGame &&
          <DisplayCard 
            key = {currentGame.board.in_play_cards.length - 1}
            shape = {['', currentGame.board.in_play_cards.length > 0 && currentGame.board.in_play_cards[currentGame.board.in_play_cards.length - 1].shape]} 
            number = {['', currentGame.board.in_play_cards.length > 0 && currentGame.board.in_play_cards[currentGame.board.in_play_cards.length - 1].number]}/>
          ]
        }
        </View> 
        <View style={styles.right_in_play_card}> 
        </View> 
      </View>
    
      <StatusBar style="auto" />
      <View style={styles.player_hand}>
        {
            [[], currentGame && currentGame.active_player.hand.map(card => (
              <Card 
                key = {currentGame.active_player.hand.indexOf(card)}
                index = {currentGame.active_player.hand.indexOf(card)}  
                number = {card.number} 
                shape =  {card.shape}
                selectedIndex = {selectedIndex}
                setSelectedIndex = {setSelectedIndex}
              />))
            ]
        }
      </View>
      <View style = {styles.play_button}>
        <ShapeSelection 
          showRequestCardModal = {showRequestCardModal} 
          setShowRequestCardModal = {setShowRequestCardModal}
          requestShape = {requestShape}
          setRequestShape = {setRequestShape}
          currentGame = {currentGame}
          setCurrentGame = {setCurrentGame}
          selectedIndex = {selectedIndex}
        />
        <TouchableOpacity onPress={ () =>
          playSelectedCard(selectedIndex, currentGame.board)
        }
        >
            <Text>Play selected Card</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  in_play_card_area: {
    flexDirection: 'row',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  player_hand: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 3,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  in_play_card: {
    flex: 2,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left_in_play_card: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right_in_play_card: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  play_button: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

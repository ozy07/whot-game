import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import {SHAPES} from '../models/Constants';

const requestShapeAndPlay = (currentGame, shape, index, setCurrentGame) =>{
    currentGame.board.requestedShape = shape;
    currentGame.active_player.play(index, currentGame.board);
    currentGame.swithToNextPlayer(currentGame.active_player);
    setCurrentGame(currentGame);
}

const ShapeSelection = props => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.showRequestCardModal}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setShowRequestCardModal(!props.showRequestCardModal);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Please request Shape!</Text>
                    <View style={styles.shape_selection_area}>
                        {
                            SHAPES.map(shape => (
                            <TouchableOpacity
                                style = {[styles.button, shape === props.requestShape && [styles.button, styles.buttonOpen]]}
                                key = {shape}
                                onPress={() => {
                                    props.setRequestShape(shape)
                                }}
                            >
                                <Text>{shape}</Text>
                            </TouchableOpacity>))
                        }
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            requestShapeAndPlay(props.currentGame, props.requestShape, props.selectedIndex, props.setCurrentGame);
                            props.setShowRequestCardModal(!props.showRequestCardModal)
                            }
                        }
                    >
                        <Text style={styles.textStyle}>Request</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    ); 
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    shape_selection_area: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

export default ShapeSelection;
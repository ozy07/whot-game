import React from 'react';
import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {IMAGES} from '../models/Constants'

const DisplayCard = (props) => {
  return (
    <View style={styles.view_container}>
        <View style ={styles.top_number}>
            <Text style={styles.number_label}>
                {props.number}
            </Text>
        </View>
        <View style ={styles.mid_shape}>
            <ImageBackground
                style ={{height: 70, width: 70, resizeMode: 'stretch'}}
                source={IMAGES[props.shape[1]]}
                flex = {1}
                justifyContent = 'center'
            >
            </ImageBackground>
        </View>
        <View style ={styles.bottom_number}>
            <Text style={styles.number_label}>
                {props.number}
            </Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    view_container: {
        flex: 1,
        padding: 2,
        backgroundColor: '#fff',
        minWidth: 100,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center'
    },

    top_number: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    mid_shape: {
        flex: 4,
        justifyContent: 'center',
    },

    bottom_number: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    number_label: {
        justifyContent: 'center',
        fontWeight: 'bold'
    },

    shape_label: {
        justifyContent: 'center',
    }
  });

export default DisplayCard;
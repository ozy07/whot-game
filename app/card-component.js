import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';
import {IMAGES} from '../models/Constants'

const Card = props => {
  return (
    <View style={[styles.view_container, props.index === props.selectedIndex && styles.selected_view_container]}>
        <TouchableOpacity 
            style={styles.card_container}
            onPress={() => {
                props.setSelectedIndex(props.index);
            }}
        >
            <View style ={styles.top_number}>
                <Text style={styles.number_label}>
                    {props.number}
                </Text>
            </View>
            <View style ={styles.mid_shape}>
                <ImageBackground
                    style ={{height: 40, width: 40, resizeMode: 'stretch'}}
                    source={IMAGES[props.shape]}
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
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    view_container: {
        flex: 1,
        padding: 2,
        backgroundColor: '#fff',
        minWidth: 100,
        height: 120
    },

    selected_view_container: {
        flex: 1,
        padding: 2,
        backgroundColor: 'black',
        minWidth: 100,
        minHeight: 120
    },

    card_container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderwidth:1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#F194FF',
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

export default Card;
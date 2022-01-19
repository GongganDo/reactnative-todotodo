import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumBox from '../models/NumBox';

const GridBox = ({ box }) => {
    const num = box instanceof NumBox ? box.num : 0;

    const colorStyle = {
        backgroundColor: getColor(num),
    };

    return (
        <View style={[styles.box, colorStyle]}>
            <View style={styles.textWrap}>
                <Text style={styles.text}>{num || ''}</Text>
            </View>
        </View>
    );
};

const gridColor = [
    '#efefef', // none
    '#eee4da', // 2
    '#eee1c9', // 4
    '#f3b27a', // 8
    '#f69664', // 16
    '#f77c5f', // 32
    '#f75f3b', // 64
    '#edd073', // 128
    '#edcc62', // 256
    '#edc950', // 512
    '#edc53f', // 1024
    '#edc22e', // 2048
    '#3c3a33', // 4096
];

const getColor = num => {
    let logNum = Math.floor(Math.log2(num));
    if (logNum < 0) logNum = 0;
    return gridColor[logNum];
};

const styles = StyleSheet.create({
    box: {
        width: 80,
        height: 80,
        marginTop: 5,
        marginLeft: 5,
    },
    textWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default GridBox;

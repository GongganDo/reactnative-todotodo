import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import worried from '../assets/worried.png';

const Empty = () => {
    return (
        <View style={styles.block}>
            <Image source={worried} />
            <Text style={styles.desc}>할일이 없어요...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    desc: {
        fontSize: 16,
        color: '#999',
    },
});

export default Empty;

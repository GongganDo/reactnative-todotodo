import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title, backgroundColor }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingBottom: 16,
    },
    text: {
        fontSize: 24,
        color: 'white',
    },
});

export default Header;

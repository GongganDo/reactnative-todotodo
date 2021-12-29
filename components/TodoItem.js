import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TodoItem = ({ text }) => {
    return (
        <View style={styles.cont}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
});

export default TodoItem;

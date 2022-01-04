import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const TodoItem = ({ text, done, onPress, onLongPress }) => {
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress}>
            <View style={styles.cont}>
                <View style={[styles.circle, done && styles.filled]} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
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
    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderColor: '#cc0',
        borderWidth: 1,
        marginRight: 18,
    },
    filled: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cc0',
    },
});

export default TodoItem;

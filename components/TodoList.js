import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ item }) => {
    useEffect(() => {
        console.log(item);
    }, [item]);

    return (
        <FlatList
            style={{ flex: 1 }}
            data={item}
            renderItem={({ item }) => <TodoItem text={item} />}
            keyExtractor={(a, i) => a + i}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        backgroundColor: '#ccc',
        height: 1,
    },
});

export default TodoList;

import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import TodoItem from './TodoItem';

const TodoList = ({ item, onPressItem, onRemoveItem }) => {
    useEffect(() => {
        console.log(item);
    }, [item]);

    const longPress = it => {
        Alert.alert(
            it.text,
            '삭제하시겠습니까?',
            [
                { text: '아니오', style: 'cancel' },
                {
                    text: '예',
                    onPress: () =>
                        typeof onRemoveItem === 'function' && onRemoveItem(it),
                },
            ],
            { cancelable: true },
        );
    };

    return (
        <FlatList
            style={{ flex: 1 }}
            data={item}
            renderItem={({ item }) => (
                <TodoItem
                    text={item.text}
                    done={item.done}
                    onPress={() =>
                        typeof onPressItem === 'function' && onPressItem(item)
                    }
                    onLongPress={() => longPress(item)}
                />
            )}
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

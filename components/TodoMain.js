import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, ToastAndroid, View } from 'react-native';
import Empty from './Empty';
import TodoList from './TodoList';

const TodoMain = () => {
    const [text, setText] = useState('');
    const [todoList, setTodoList] = useState([]);

    const refId = useRef(0);

    const addText = () => {
        ToastAndroid.show(`${text} 입력됨`, ToastAndroid.SHORT);
        setTodoList([
            ...todoList,
            {
                text,
                id: ++refId.current,
                done: false,
            },
        ]);
        setText('');
    };

    const pressItem = it => {
        setTodoList(
            todoList.map(t => (t.id === it.id ? { ...t, done: !t.done } : t)),
        );
    };

    const removeItem = it => {
        setTodoList(todoList.filter(t => t.id !== it.id));
    };

    return (
        <>
            {todoList.length > 0 ? (
                <TodoList
                    item={todoList}
                    onPressItem={pressItem}
                    onRemoveItem={removeItem}
                />
            ) : (
                <Empty />
            )}
            <View style={styles.inputView}>
                <TextInput
                    placeholder="할일을 입력하세요"
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={addText}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    wrapper: { flex: 1 },
    input: { fontSize: 16, paddingVertical: 8 },
    inputView: {
        height: 64,
        paddingHorizontal: 16,
        borderColor: '#ccc',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: 'center',
    },
});

export default TodoMain;

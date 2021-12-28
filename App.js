import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
import TodoList from './components/TodoList';

const App = () => {
  const [text, setText] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addText = () => {
    ToastAndroid.show(text + ' 입력됨', ToastAndroid.SHORT);
    setTodoList([...todoList, text]);
    setText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TodoList item={todoList} />
      <View style={styles.inputView}>
        <TextInput
          placeholder="할일을 입력하세요"
          style={styles.input}
          value={text}
          onChangeText={setText}
          onSubmitEditing={addText}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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

export default App;

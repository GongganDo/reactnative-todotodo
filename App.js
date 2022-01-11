import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import TodoMain from './components/TodoMain';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#990" />
            <TodoMain />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default App;

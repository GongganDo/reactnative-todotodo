import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Grid from './components/Grid';
import Header from './components/Header';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={bg} />
            <Header title="2048" backgroundColor={bg} />
            <Grid />
        </SafeAreaView>
    );
};

const bg = '#990';

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default App;

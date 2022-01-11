import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Grid from './components/Grid';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#990" />
            <Grid />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default App;

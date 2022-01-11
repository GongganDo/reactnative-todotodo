import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Button,
    View,
} from 'react-native';
import Grid from './components/Grid';
import Header from './components/Header';

const App = () => {
    const [action, setAction] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={bg} />
            <Header title="2048" backgroundColor={bg} />
            <Grid action={action} />
            <View style={styles.buttonView}>
                <Button
                    color={bg}
                    title="LEFT"
                    onPress={() => setAction('LEFT')}
                />
                <Button
                    color="red"
                    title="INIT"
                    onPress={() => setAction('INIT')}
                />
                <Button
                    color={bg}
                    title="RIGHT"
                    onPress={() => setAction('RIGHT')}
                />
            </View>
        </SafeAreaView>
    );
};

const bg = '#990';

const styles = StyleSheet.create({
    container: { flex: 1 },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
});

export default App;

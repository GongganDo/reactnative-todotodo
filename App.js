import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Button,
    View,
    Alert,
} from 'react-native';
import Grid from './components/Grid';
import Header from './components/Header';

const App = () => {
    const [action, setAction] = useState('');

    const initAction = () => {
        Alert.alert(
            '2048',
            '초기화하시겠습니까? 초기화하면 진행되던 게임이 없어집니다.',
            [
                { text: '아니오', style: 'cancel' },
                {
                    text: '예',
                    onPress: () => setAction({ action: 'INIT' }),
                },
            ],
            { cancelable: true },
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={bg} />
            <Header title="2048" backgroundColor={bg} />
            <Grid action={action} />
            <View style={styles.buttonView}>
                <Button
                    color={bg}
                    title="LEFT"
                    onPress={() => setAction({ action: 'LEFT' })}
                />
                <Button
                    color={bg}
                    title="UP"
                    onPress={() => setAction({ action: 'UP' })}
                />
                <Button color="red" title="INIT" onPress={initAction} />
                <Button
                    color={bg}
                    title="DOWN"
                    onPress={() => setAction({ action: 'DOWN' })}
                />
                <Button
                    color={bg}
                    title="RIGHT"
                    onPress={() => setAction({ action: 'RIGHT' })}
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

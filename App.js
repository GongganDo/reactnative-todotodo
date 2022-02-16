import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Button,
    View,
    Alert,
    ToastAndroid,
    Text,
} from 'react-native';
import GestureRecognizer, {
    swipeDirections,
} from 'react-native-swipe-gestures';
import Grid from './components/Grid';
import Header from './components/Header';

const App = () => {
    // App에서 실행되는 이동 action
    const [action, setAction] = useState('');
    // action을 수행하지 않을지 여부 선택
    const [isFreeze, setFreeze] = useState(false);
    // 점수
    const [score, setScore] = useState(0);

    const initAction = useCallback(() => {
        Alert.alert(
            '2048',
            '초기화하시겠습니까? 초기화하면 진행되던 게임이 없어집니다.',
            [
                { text: '아니오', style: 'cancel' },
                {
                    text: '예',
                    onPress: () => {
                        setFreeze(false);
                        setScore(0);
                        setAction({ action: 'INIT' });
                    },
                },
            ],
            { cancelable: true },
        );
    }, []);

    const pressAction = actionName => {
        if (isFreeze) return;
        setAction({ action: actionName });
    };

    const onSwipe = (gestureName, gestureState) => {
        if (isFreeze) return;

        const { dx, dy, vx, vy } = gestureState;
        console.log('swipe', gestureName, [dx, dy], [vx, vy]);
        const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } =
            swipeDirections;
        switch (gestureName) {
            case SWIPE_UP:
                setAction({ action: 'UP' });
                break;
            case SWIPE_DOWN:
                setAction({ action: 'DOWN' });
                break;
            case SWIPE_LEFT:
                setAction({ action: 'LEFT' });
                break;
            case SWIPE_RIGHT:
                setAction({ action: 'RIGHT' });
                break;
        }
    };

    const gameOver = useCallback(() => {
        ToastAndroid.show('게임오버!', ToastAndroid.SHORT);
        console.log('freezed!');
        setFreeze(true);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={bg} />
            <Header title="2048" backgroundColor={bg} />
            <GestureRecognizer
                onSwipe={onSwipe}
                config={{
                    // swipe가 적용되기 위한 최소 속도
                    velocityThreshold: 0.01,
                    // swipe가 적용되기 위한 최대 거리
                    directionalOffsetThreshold: 50,
                }}
                style={styles.gestureContainer}>
                <View>
                    <Text>SCORE</Text>
                    <Text>{score}</Text>
                </View>
                <Grid
                    action={action}
                    onGameOver={() => gameOver()}
                    onAddScore={addValue =>
                        addValue && setScore(score + addValue)
                    }
                />
            </GestureRecognizer>
            <View style={styles.buttonView}>
                <Button
                    color={bg}
                    title="LEFT"
                    disabled={isFreeze}
                    onPress={() => pressAction('LEFT')}
                />
                <Button
                    color={bg}
                    title="UP"
                    disabled={isFreeze}
                    onPress={() => pressAction('UP')}
                />
                <Button color="red" title="INIT" onPress={initAction} />
                <Button
                    color={bg}
                    title="DOWN"
                    disabled={isFreeze}
                    onPress={() => pressAction('DOWN')}
                />
                <Button
                    color={bg}
                    title="RIGHT"
                    disabled={isFreeze}
                    onPress={() => pressAction('RIGHT')}
                />
            </View>
        </SafeAreaView>
    );
};

const bg = '#990';

const styles = StyleSheet.create({
    container: { flex: 1 },
    gestureContainer: { flex: 1, backgroundColor: '#fff' },
    buttonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
});

export default App;

import React, { useEffect, useState } from 'react';
import { Button, InteractionManager, StyleSheet, View } from 'react-native';
import GridRow from './GridRow';

const Grid = ({ action }) => {
    // action 바뀔 경우 처리
    useEffect(() => {
        switch (action) {
            case 'INIT':
                return init();
            case 'LEFT':
                return goLeft();
            case 'RIGHT':
                return goRight();
        }
    }, [action]);

    const [data, setData] = useState(defaultData);

    // 배열 초기화
    const init = () => {
        setData(defaultData);
    };

    // 왼쪽으로 가기
    const goLeft = () => {
        setData(dt =>
            dt.map(i => {
                const newI = [...i.filter(j => j > 0)];
                return [...newI, ...Array(i.length - newI.length).fill(0)];
            }),
        );
    };

    // 오른쪽으로 가기
    const goRight = () => {
        setData(dt =>
            dt.map(i => {
                const newI = [...i.filter(j => j > 0)];
                return [...Array(i.length - newI.length).fill(0), ...newI];
            }),
        );
    };

    return (
        <View style={styles.container}>
            {data.map(d => (
                <GridRow boxList={d} key={`gridrow_key_${d}`} />
            ))}
        </View>
    );
};

const defaultData = [
    [0, 2, 0, 4],
    [8, 16, 0, 0],
    [32, 0, 0, 64],
    [0, 0, 128, 256],
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
});

export default Grid;

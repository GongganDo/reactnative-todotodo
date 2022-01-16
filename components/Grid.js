import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import GridRow from './GridRow';

const Grid = ({ action }) => {
    // action 바뀔 경우 처리
    useEffect(() => {
        switch (action.action) {
            case 'INIT':
                return init();
            case 'LEFT':
                return goLeft();
            case 'RIGHT':
                return goRight();
            case 'UP':
                return goUp();
            case 'DOWN':
                return goDown();
        }
    }, [action]);

    const [data, setData] = useState(defaultData);

    // 배열 초기화
    const init = () => {
        setData(defaultData);
    };

    const goTemplate = cb => {
        setData(dt => {
            const initialData = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
            let newData = initialData;

            if (typeof cb === 'function') {
                newData = cb(dt, initialData);
            }

            const val = setRandom(newData);
            if (val) {
                newData[val[0]][val[1]] = 2;
            } else {
                ToastAndroid.show('GAME OVER', ToastAndroid.LONG);
            }

            return newData;
        });
    };

    // 왼쪽으로 가기
    const goLeft = () => {
        goTemplate((dt, dd) => {
            const newData = dd;
            for (let i = 0; i < 4; i++) {
                let lastI = 0;
                for (let j = 0; j < 4; j++) {
                    if (dt[i][j] > 0) {
                        if (lastI > 0 && newData[i][lastI - 1] === dt[i][j]) {
                            newData[i][lastI - 1] *= 2;
                        } else {
                            newData[i][lastI++] = dt[i][j];
                        }
                    }
                }
            }
            return newData;
        });
    };

    // 오른쪽으로 가기
    const goRight = () => {
        goTemplate((dt, dd) => {
            const newData = dd;
            for (let i = 0; i < 4; i++) {
                let lastI = 3;
                for (let j = 3; j >= 0; j--) {
                    if (dt[i][j] > 0) {
                        if (lastI < 3 && newData[i][lastI + 1] === dt[i][j]) {
                            newData[i][lastI + 1] *= 2;
                        } else {
                            newData[i][lastI--] = dt[i][j];
                        }
                    }
                }
            }
            return newData;
        });
    };

    // 위으로 가기
    const goUp = () => {
        goTemplate((dt, dd) => {
            const newData = dd;
            for (let i = 0; i < 4; i++) {
                let lastI = 0;
                for (let j = 0; j < 4; j++) {
                    if (dt[j][i] > 0) {
                        if (lastI > 0 && newData[lastI - 1][i] === dt[j][i]) {
                            newData[lastI - 1][i] *= 2;
                        } else {
                            newData[lastI++][i] = dt[j][i];
                        }
                    }
                }
            }
            return newData;
        });
    };
    // 아래로 가기
    const goDown = () => {
        goTemplate((dt, dd) => {
            const newData = dd;
            for (let i = 0; i < 4; i++) {
                let lastI = 3;
                for (let j = 3; j >= 0; j--) {
                    if (dt[j][i] > 0) {
                        if (lastI < 3 && newData[lastI + 1][i] === dt[j][i]) {
                            newData[lastI + 1][i] *= 2;
                        } else {
                            newData[lastI--][i] = dt[j][i];
                        }
                    }
                }
            }
            return newData;
        });
    };

    const setRandom = dt => {
        // 0이 들어가 있는 리스트 찾기
        const zeroList = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (dt[i][j] === 0) {
                    zeroList.push([i, j]);
                }
            }
        }
        if (zeroList.length > 0) {
            // 0 있는 게 있으면 랜덤으로 하나 뽑기
            const randIdx = Math.floor(Math.random() * zeroList.length);
            return zeroList[randIdx];
        } else {
            // 0 들어갈 공간 없는 경우
            return null;
        }
    };

    return (
        <View style={styles.container}>
            {data.map((d, i) => (
                <GridRow boxList={d} key={`gridrow_key_${i + 1}`} />
            ))}
        </View>
    );
};

const defaultData = [
    [0, 2, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
});

export default Grid;

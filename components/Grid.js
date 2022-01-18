import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import NumBox from '../models/NumBox';
import GridRow from './GridRow';

// 배열 동일 여부 체크
const arrayIsEqual = (arr1, arr2) => {
    if (arr1.length === arr2.length) {
        for (let i = 0; i < arr1.length; i++) {
            const i1 = arr1[i],
                i2 = arr2[i];
            if (i1 !== i2) {
                if (Array.isArray(i1) && Array.isArray(i2)) {
                    if (!arrayIsEqual(i1, i2)) return false;
                } else if (i1 instanceof NumBox && i2 instanceof NumBox) {
                    if (!i1.equals(i2)) return false;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
    return false;
};

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

    // data 초기화, 불변성 유지를 위해 비교 로직 제외하고 공통화
    const goTemplate = cb => {
        setData(dt => {
            const initialData = [
                [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
                [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
                [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
                [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
            ];
            let newData = initialData;

            // newDat 만드는 동작은 callback (cb) 에서 처리. cb가 없으면 그대로 둔다.
            if (typeof cb === 'function') {
                newData = cb(dt, initialData) || dt;
            } else {
                newData = dt;
            }

            // 이전/이후 data가 동일한지 비교하고, 동일하지 않으면 랜덤 2 박스를 생성한다.
            if (arrayIsEqual(newData, dt)) {
                // pass
            } else {
                const val = setRandom(newData);
                if (val) {
                    newData[val[0]][val[1]] = new NumBox(2);
                }
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
                    if (!dt[i][j].isEmpty()) {
                        if (
                            lastI > 0 &&
                            newData[i][lastI - 1].equals(dt[i][j])
                        ) {
                            newData[i][lastI - 1].multiple();
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
                    if (!dt[i][j].isEmpty()) {
                        if (
                            lastI < 3 &&
                            newData[i][lastI + 1].equals(dt[i][j])
                        ) {
                            newData[i][lastI + 1] = dt[i][j].multiple();
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
                    if (!dt[j][i].isEmpty()) {
                        if (
                            lastI > 0 &&
                            newData[lastI - 1][i].equals(dt[j][i])
                        ) {
                            newData[lastI - 1][i].multiple();
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
                    if (!dt[j][i].isEmpty()) {
                        if (
                            lastI < 3 &&
                            newData[lastI + 1][i].equals(dt[j][i])
                        ) {
                            newData[lastI + 1][i] = dt[j][i].multiple();
                        } else {
                            newData[lastI--][i] = dt[j][i];
                        }
                    }
                }
            }
            return newData;
        });
    };

    // 비어있는 위치 선택
    const setRandom = dt => {
        // 0이 들어가 있는 리스트 찾기
        const zeroList = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (dt[i][j].isEmpty()) {
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
    [new NumBox(0), new NumBox(2), new NumBox(0), new NumBox(2)],
    [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
    [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
    [new NumBox(0), new NumBox(0), new NumBox(0), new NumBox(0)],
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
});

export default Grid;

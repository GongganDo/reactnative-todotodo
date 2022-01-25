import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import NumBox from '../models/NumBox';
import GridRow from './GridRow';

const BOX_SIZE = 4;

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

const MoveGrid = {
    // 완전히 초기화된 그리드
    getInitialData() {
        return Array.from({ length: BOX_SIZE }, () =>
            Array(BOX_SIZE).fill(null),
        );
    },
    // 최초 랜덤값이 세팅된 그리드
    getStartData() {
        const rand = () => Math.floor(Math.random() * BOX_SIZE);
        const data = this.getInitialData();
        // TODO 둘이 겹치는 경우? 깔끔한 방법이 없을까..
        data[rand()][rand()] = new NumBox(2);
        data[rand()][rand()] = new NumBox(2);
        return data;
    },
    // 움직이기
    goMove(dt, { row, col }) {
        // null이 들어간 배열로 초기화
        const newData = this.getInitialData();

        const inc = row !== 0 ? Math.sign(row) : col !== 0 ? Math.sign(col) : 0;
        if (!inc) return [...dt];

        const first = inc > 0 ? 0 : BOX_SIZE - 1;
        for (let i = 0; i < BOX_SIZE; i++) {
            let lastI = first;
            for (let j = 0; j < BOX_SIZE; j++) {
                const ii = row === 0 ? i : row > 0 ? j : first - j;
                const jj = col === 0 ? i : col > 0 ? j : first - j;

                if (dt[ii][jj]) {
                    const checkI = row ? lastI - row : ii;
                    const checkJ = col ? lastI - col : jj;
                    if (
                        lastI * inc > first * inc &&
                        newData[checkI][checkJ].equals(dt[ii][jj])
                    ) {
                        newData[checkI][checkJ].multiple();
                    } else {
                        newData[row ? lastI : ii][col ? lastI : jj] =
                            dt[ii][jj];
                        lastI += row || col;
                    }
                }
            }
        }

        // 이전/이후 data가 동일한지 비교하고, 동일하지 않으면 랜덤 2 박스를 생성한다.
        if (arrayIsEqual(newData, dt)) {
            // pass
        } else {
            const val = this.setRandom(newData);
            if (val) {
                newData[val[0]][val[1]] = new NumBox(2);
            }
        }

        return newData;
    },
    // 비어있는 위치 선택
    setRandom(dt) {
        // 0이 들어가 있는 리스트 찾기
        const zeroList = [];
        for (let i = 0; i < BOX_SIZE; i++) {
            for (let j = 0; j < BOX_SIZE; j++) {
                if (!dt[i][j]) {
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
    },
    // 왼쪽으로 가기
    goLeft(dt) {
        return this.goMove(dt, { row: 0, col: 1 });
    },
    // 오른쪽으로 가기
    goRight(dt) {
        return this.goMove(dt, { row: 0, col: -1 });
    },
    // 위으로 가기
    goUp(dt) {
        return this.goMove(dt, { row: 1, col: 0 });
    },
    // 아래로 가기
    goDown(dt) {
        return this.goMove(dt, { row: -1, col: 0 });
    },
};

const Grid = ({ action }) => {
    // action 바뀔 경우 처리
    useEffect(() => {
        switch (action.action) {
            case 'INIT':
                return setData(MoveGrid.getStartData());
            case 'LEFT':
                return setData(dt => MoveGrid.goLeft(dt));
            case 'RIGHT':
                return setData(dt => MoveGrid.goRight(dt));
            case 'UP':
                return setData(dt => MoveGrid.goUp(dt));
            case 'DOWN':
                return setData(dt => MoveGrid.goDown(dt));
        }
    }, [action]);

    const [data, setData] = useState(MoveGrid.getStartData());

    return (
        <View style={styles.container}>
            {data.map((d, i) => (
                <GridRow boxList={d} key={`gridrow_key_${i + 1}`} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
    },
});

export default Grid;

import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import GridRow from './GridRow';

const Grid = () => {
    const [data, setData] = useState(defaultData);
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
    },
});

export default Grid;

import React from 'react';
import { StyleSheet, View } from 'react-native';
import GridBox from './GridBox';

const GridRow = ({ boxList = [] }) => {
    return (
        <View style={styles.container}>
            {boxList.map(d => (
                <GridBox num={d} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default GridRow;

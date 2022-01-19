import React from 'react';
import { StyleSheet, View } from 'react-native';
import GridBox from './GridBox';

const GridRow = ({ id = 0, boxList = [] }) => {
    const randomCode = () => Math.random().toString(16).slice(4);
    return (
        <View style={styles.container}>
            {boxList.map(d => (
                <GridBox
                    box={d}
                    key={`gridbox_key_${d ? d._id : randomCode()}`}
                />
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

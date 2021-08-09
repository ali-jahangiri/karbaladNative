import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import Para from '../../Para';


const ShallowHeader = ({ title }) => {
    const appendStyle = useStyle(style);

    const { primary } = useStyle()

    return (
        <View style={appendStyle.container}>
            <Para color={generateColor(primary , 5)} size={60} weight="bold">{title}</Para>
        </View>
    )
}


const style = ({ primary }) => StyleSheet.create({
    container : {
        top: -10,
        marginBottom : -50,
        // backgroundColor : generateColor(primary , 5),
        // borderRadius : 5000
    }
})

export default ShallowHeader;
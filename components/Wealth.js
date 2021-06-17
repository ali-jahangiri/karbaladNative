import React from 'react';
import { StyleSheet } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';
import { LinearGradient } from 'expo-linear-gradient';
import { generateColor } from '../utils';

const Wealth = ({ wealthNumber }) => {
    const appendStyle = useStyle(style , wealthNumber);
    const { primary } = useStyle()
    return (
      <LinearGradient style={appendStyle.container} colors={[generateColor(primary , 4), 'transparent']}>
        <Para weight="bold" size={18} align="center" color={generateColor(primary , 8)} >{wealthNumber}</Para>
      </LinearGradient>
    )
}


const style = ({ baseBorderRadius } , count) => StyleSheet.create({
    container: {
        padding: 10,
        borderTopRightRadius : baseBorderRadius,
        borderTopLeftRadius : baseBorderRadius,
        height: count * 20,
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default Wealth;
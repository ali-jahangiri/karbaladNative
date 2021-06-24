import React from 'react';
import { StyleSheet } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';
import { LinearGradient } from 'expo-linear-gradient';
import { generateColor, toFarsiNumber } from '../utils';

const Wealth = ({ wealthNumber }) => {
    const appendStyle = useStyle(style , wealthNumber);
    const { primary } = useStyle()
    return (
      <LinearGradient start={[1,0]} end={[0,1]} style={appendStyle.container}  colors={[generateColor(primary , 4), 'transparent']}>
        <Para weight="bold" size={18} align="center" color={generateColor(primary , 8)} >{toFarsiNumber(wealthNumber)}</Para>
      </LinearGradient>
    )
}


const style = ({ baseBorderRadius } , count) => StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        borderTopRightRadius : baseBorderRadius,
        borderBottomRightRadius : baseBorderRadius,
        height: 60,
        width: (count - 1 ) * 20,
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default Wealth;
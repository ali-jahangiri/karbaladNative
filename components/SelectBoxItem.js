import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from './Para';


const SelectBoxItem = ({ onSelect , value , children , selectedInStore}) => {
    const appendStyle = useStyle(style , selectedInStore)
    return (
        <TouchableOpacity style={appendStyle.container} onPress={() => onSelect(value)}>
            <Para style={appendStyle.text} size={16}>{toFarsiNumber(`${children}`.trim())}</Para>
            <View style={appendStyle.statusBullet} >
                <View style={appendStyle.emptySpace} />
            </View>
        </TouchableOpacity>
    )
}


const style = ({ primary , baseBorderRadius  } , selectedInStore) => StyleSheet.create({
    container : {
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center',
        padding: 20,
        height: 70,
        marginRight : -20
    },
    statusBullet : {
        borderRadius : baseBorderRadius ,
        width: 20,
        height: 20,
        backgroundColor : selectedInStore ?  generateColor(primary , 5) : "white",
        marginLeft : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {
        color: selectedInStore ? primary : "black",
    },
    emptySpace : {
        backgroundColor : "white",
        borderRadius : baseBorderRadius,
        height : 6,
        width : 6,
    }
})

export default SelectBoxItem;
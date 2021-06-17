import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';


const SelectBoxItem = ({ onSelect , value , children , selectedInStore}) => {
    const appendStyle = useStyle(style , selectedInStore)
    return (
        <TouchableOpacity style={appendStyle.container} onPress={() => onSelect(value)}>
            <Para style={appendStyle.text} size={16}>{`${children}`.trim()}</Para>
            <View style={appendStyle.statusBullet} />
        </TouchableOpacity>
    )
}


const style = ({ primary , baseBorderRadius  } , selectedInStore) => StyleSheet.create({
    container : {
        padding: 10,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center',
        marginVertical : 10,
        // backgroundColor : "red"
    },
    statusBullet : {
        borderRadius : baseBorderRadius -5 ,
        width: 10,
        height: 10,
        backgroundColor : selectedInStore ?  generateColor(primary , 5) : "white",
        marginLeft : 10,
        marginBottom : -3
    },
    text : {
        color: selectedInStore ? primary : "black",
    }
})

export default SelectBoxItem;
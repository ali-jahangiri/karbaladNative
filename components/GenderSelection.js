import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';



const GenderSelector = ({ selectHandler }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    const [currentSelected, setCurrentSelected] = useState(null)

    return (
        <View style={appendStyle.container}>
            <TouchableOpacity style={[appendStyle.item , currentSelected === 0 ? appendStyle.selectedItem :  {}]} onPress={() => {
                selectHandler('Genders' , 0);
                setCurrentSelected(0)
            }}>
                <Para color={currentSelected === 0 ? primary : "grey" } weight="bold" align="center">مرد</Para>
            </TouchableOpacity>
            <TouchableOpacity style={[appendStyle.item , currentSelected === 1 ? appendStyle.selectedItem :  {}]} onPress={() => {
                selectHandler("Genders" , 1);
                setCurrentSelected(1);
            }}>
                <Para color={currentSelected === 1 ? primary : "grey"} weight="bold" align="center">زن</Para>
            </TouchableOpacity>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "100%",
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",
        overflow: "hidden",
        marginVertical : 15
    },
    item : {
        flex: 1,
        backgroundColor : "#2e2e2e2e",
        paddingVertical : 15
    },  
    selectedItem : {
        backgroundColor : generateColor(primary , 5)
    }
})

export default GenderSelector;
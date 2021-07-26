import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';



const CarSelectionHeaderLabel = ({ collapse , setCollapse , label }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <TouchableOpacity onPress={() => setCollapse(false)} style={[appendStyle.container , !collapse ? {justifyContent : "center" } : {}]}>
        {
            collapse ? <View style={appendStyle.collapseContainer}>
                        <Feather name="chevron-down" size={24} /></View> 
            : null
        }
        <View style={{ flexDirection : "row" , alignItems : 'center' }}>
            <Para size={16} align="center" weight="bold">{label}</Para>
            {
                collapse ? <View style={appendStyle.checkBadge}>
                                <Feather name="check" color={primary} size={24} />
                            </View> : null
            }
        </View>
    </TouchableOpacity>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'space-between',
        marginVertical : 10
    },
    collapseContainer : { padding: 10 },
    checkBadge : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius - 5,
        padding: 5,
        marginLeft : 10
    },
})

export default CarSelectionHeaderLabel;
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';
import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';

import { valueFinder } from "./InsuranceQuickEdit";

const InsuranceQuickEditItem = ({ label , onEdit , value , index  , store , tempStore  }) => {
    
    const currentPartOfStore = store.find(el => el.lbLName === label);

    const wasChange = !!tempStore[currentPartOfStore.formName] || false;
    const appendStyle = useStyle(style , wasChange);
    const { primary } = useStyle();
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.labelContainer}>
                <Para >{label}</Para>
                <View style={appendStyle.index}>
                    <Para>{index}</Para>
                </View>
            </View>
            <TouchableOpacity 
                onPress={() => onEdit({ label , value , key : currentPartOfStore.formName ,  typesName :currentPartOfStore.typesName })} 
                style={appendStyle.ctaContainer}>
                <Feather 
                    style={{ marginHorizontal : 10 }} 
                    name={wasChange ? "edit-3" : "edit-2"} 
                    size={24} 
                    color={wasChange ? primary : "grey"} /> 
                {
                    Array.isArray(value) ? value?.map((el , i) =>  <Para key={i} style={{ marginHorizontal : 10 }} weight="bold" align="right" color={wasChange ? primary : "grey"} >{i + 1} . {el}</Para>)
                    : <Para 
                        style={{ marginHorizontal : 10 }} 
                        weight="bold" 
                        align="right" 
                        color={wasChange ? primary : "grey"} >
                                {valueFinder(store.find(el => el.formName === currentPartOfStore.formName) , tempStore[currentPartOfStore.formName]) || value}
                    </Para>
                }
            </TouchableOpacity>
        </View>
    )
}

const maxWidth = "100%"

const style = ({ baseBorderRadius , primary } , wasChange ) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal :  "5%",
        justifyContent : 'space-between',
        marginVertical : 20
    },
    index : {
        backgroundColor : "#2e2e2e10",
        borderRadius : baseBorderRadius,
        width: 40,
        height : 40,
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 10
    },
    ctaContainer : {
        flexDirection : 'row',
        alignItems :'center',
        alignSelf : "flex-start",
        backgroundColor : wasChange ?  generateColor(primary ,2) : "lightgrey",
        padding: 10,
        borderRadius : baseBorderRadius,
        maxWidth : maxWidth,
        marginTop : 5
    },
    labelContainer : {
        flexDirection : 'row',
        alignSelf : 'flex-end',
        alignItems : 'center'
    }
})

export default InsuranceQuickEditItem;
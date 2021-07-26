import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';
import { Feather } from '@expo/vector-icons';
import { generateColor, toFarsiNumber } from '../utils';

import { valueFinder } from '../screens/InsuranceQuickEdit'; 

const InsuranceQuickEditItem = ({ label , onEdit , value , index  , store , tempStore  }) => {
    
    const currentPartOfStore = store.find(el => el.lbLName === label);

    const wasChange = !!tempStore[currentPartOfStore.formName] || false;
    const appendStyle = useStyle(style , wasChange);
    const { primary } = useStyle();


    const mainValue = valueFinder(store.find(el => el.formName === currentPartOfStore.formName) , tempStore[currentPartOfStore.formName]) || value
    
    const multiItemRender = () => {
        if(Array.isArray(mainValue)) {
            return mainValue
                    .map((el , i) => <Para 
                                        size={16} 
                                        align='right' 
                                        color={wasChange ? primary : "grey"} 
                                        weight="bold" 
                                        key={i}>
                                            {el}
                                        </Para>)
        }else return (
            <Para style={{ marginHorizontal : 10 }} 
                  weight="bold" 
                  align="right"
                  size={16}
                  color={wasChange ? primary : "grey"} >
                  {toFarsiNumber(valueFinder(store.find(el => el.formName === currentPartOfStore.formName) , tempStore[currentPartOfStore.formName]) || value || "")}
            </Para>
        );
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.labelContainer}>
            <TouchableOpacity 
                onPress={() => onEdit({ label , value , key : currentPartOfStore.formName ,  typesName :currentPartOfStore.typesName })} 
                style={appendStyle.ctaContainer}>
                <Feather 
                    style={{ marginHorizontal : 10 }} 
                    name={wasChange ? "edit-3" : "edit-2"} 
                    size={24} 
                    color={wasChange ? primary : "grey"} /> 
                </TouchableOpacity>
                <View style={{ flexDirection : "row" , alignItems : 'center' }}>
                    <Para >{label}</Para>
                    <View style={appendStyle.index}>
                        <Para color="grey">{toFarsiNumber(index)}</Para>
                    </View>
                </View>
            </View>
            <View style={appendStyle.valueContainer}>
                <View style={{ marginHorizontal : 10 , flexDirection : "row" , flexWrap : 'wrap-reverse' , justifyContent : "flex-end" }}>
                    {multiItemRender()}
                </View>
                <View style={appendStyle.valueBullet} />
            </View>
        </View>
    )
}

const maxWidth = "100%"

const style = ({ baseBorderRadius , primary } , wasChange ) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal :  "5%",
        justifyContent : 'space-between',
        marginVertical : 20,
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
        justifyContent : "center",
        backgroundColor : wasChange ?  generateColor(primary ,2) : "#2e2e2e10",
        height: 55,
        width: 55,
        borderRadius : baseBorderRadius,
        maxWidth : maxWidth,
    },
    labelContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : "flex-start"
    },
    valueContainer : {
        flexDirection : 'row',
        justifyContent : 'flex-end',
        alignItems : "center",
    },  
    valueBullet : {
        width: wasChange ? 55 :  36,
        height : 10,
        backgroundColor : wasChange ? generateColor(primary , 2) :  '#2e2e2e10',
        borderRadius : baseBorderRadius
    }
})

export default InsuranceQuickEditItem;
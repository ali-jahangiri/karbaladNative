import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, numberSeparator, toFarsiNumber } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

const InsPayDeliveryOption = ({ setOption , currentOption , items , setPrice }) => {
    const appendStyle = useStyle(style);

    console.log(currentOption);

    const selectHandler = (id , price) => {
        setPrice(price);
        setOption(id);
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <Para size={18} weight="bold">روش ارسال</Para>
                <Feather style={{ marginLeft : 10 }} name="box" size={24} color="black" />
            </View>
            {
                items.map((el , i) => (
                    <TouchableOpacity onPress={() => selectHandler(el.id , el.addAmount)} style={[appendStyle.item , currentOption === el.id ? appendStyle.selectedItem : {}]} key={i}>
                        <View>
                            {
                                !el.addAmount ? <Para>رایگان</Para> : <View style={{ flexDirection : "row" , alignItems : "center" }}>
                                    <Para size={14} color="grey" style={{ marginRight : 5 }}>تومان</Para>
                                    <Para weight="bold" size={16}>{numberSeparator(toFarsiNumber(el.addAmount))}</Para>
                                </View>
                            }
                        </View>
                    <View style={appendStyle.optionName}>
                        <Para>{el.name}</Para>
                    </View>
                    <Image style={[{ opacity : .5 , } , currentOption === el.id ? appendStyle.selectedItemImage : {}]} resizeMode="contain" source={{ 
                        uri : imageFinder(el.image),
                        width: 40,
                        height: 40,
                    }}  />
                    </TouchableOpacity>
                ))
            }
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    item : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 5,
        padding: 10
    },
    selectedItem : {
        backgroundColor : generateColor(primary , 2),
        borderRadius : baseBorderRadius,
    },
    bullet : {
        width : 10,
        height : 10,
        backgroundColor : primary,
        borderRadius : baseBorderRadius
    },
    header : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'flex-end',
        marginBottom : 10
    },
    optionName :{
        flex: 1,
        paddingRight : 15
    }
})

export default InsPayDeliveryOption
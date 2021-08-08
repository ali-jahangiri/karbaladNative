import { Feather } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import client from '../../client';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';

const  { CATEGORY_LIST } = client.static

const ReminderCategoryPicker = ({ selectedItem , selectHandler }) => {
    const appendedStyle = useStyle(style);
    const scrollRef = useRef();

    const onSelect = value => {
        const itemIndex = CATEGORY_LIST.findIndex(el => el === value);
        scrollRef.current.scrollTo({x: (itemIndex * 200 ) + 5});
        selectHandler(value)
    }

    return (
        <View style={{ padding : 20 }}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' , marginTop : 10 }}>
                <Para color="grey" size={17} weight="bold">موضوع دسته بندی</Para>
                <View style={appendedStyle.bullet} />
            </View>
            <ScrollView ref={scrollRef} horizontal style={appendedStyle.scrollContainer}>
                {
                    CATEGORY_LIST.map((el , i ) => (
                        <TouchableOpacity onPress={() => onSelect(el)} style={[appendedStyle.itemContainer ,  selectedItem === el ? appendedStyle.selectedItem : null]} key={i}>
                            <View style={{ alignItems : 'center' , justifyContent : 'center' , flexDirection : "row"}}>
                                {
                                    selectedItem === el && <Feather style={{ marginRight : 10 }} name="check" size={24} color="black" />
                                }
                            <Para>{el}</Para>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    selectedItem : {
        backgroundColor : generateColor(primary, 5),
    },
    bullet : {
        width : 25,
        height:  25,
        borderRadius : baseBorderRadius - 5,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 15
    },
    itemContainer : {
        borderRadius : baseBorderRadius,
        marginBottom : 10,
        padding: 25,
        width : 200,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 1),
        marginRight : 5
    },
    scrollContainer : {
        borderRadius : baseBorderRadius,
        marginTop : 25,
    }
})

export default ReminderCategoryPicker;
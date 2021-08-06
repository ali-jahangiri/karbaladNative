import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { max } from 'react-native-reanimated';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

const MultiSelect = ({ values = [], onChange , items = [] }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    const selectHandler = item => {
        const wasSelected = values.find(el => el === item.id);
        if(wasSelected) {
            // removing from selected list
            onChange({ value : [...values.filter(el => el !== item.id)] })
        }else {
            // adding to list
            onChange({ value : [...values , item.id] })
        }
    }
    return (
        <ScrollView style={appendStyle.directoryWrapper}>
            {
                
                items.map((el , i) => (
                    <TouchableOpacity style={appendStyle.itemContainer} onPress={() => selectHandler(el)} key={i}>
                        <View style={[appendStyle.statusBullet , { backgroundColor : values.find(item => item === el.id) ? generateColor(primary , 5) : '#efefef' }]} >
                            {
                                values.find(item => item === el.id) && <Feather name="check" size={24} color={primary} />
                            }
                        </View>
                        <Para size={16}>{el.dataName}</Para>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    directoryWrapper : {
    },  
    itemContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        padding: 10,
        marginVertical : 10
    },  
    statusBullet : {
        borderRadius : baseBorderRadius ,
        width: 40,
        height: 40,
        backgroundColor :  generateColor(primary , 5),
        alignItems : 'center',
        justifyContent : 'center'
    },
    text : {

    },
    selectedItem : {
        backgroundColor : 'red',
    }
})

export default MultiSelect;
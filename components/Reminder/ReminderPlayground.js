import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';

import { ReminderDatePicker , ReminderDescriptionInput , ReminderCategoryPicker } from "./index"

const ReminderPlayground = ({ valueStore , changeHandler , ctaHandler , ctaText , isInSendProcess }) => {
    const appendStyle = useStyle(style);
    const [isValid, setIsValid] = useState(false);
    

    useEffect(() => {
        const filled = Object.keys(valueStore);
        if(filled.length > 2) setIsValid(true);
        else setIsValid(false)
    } , [valueStore])  


    return (
        <View style={appendStyle.container}>
            <View style={{ flex : 1  }}>
                <ScrollView>
                    <ReminderCategoryPicker selectedItem={valueStore?.category} selectHandler={selectedItem => changeHandler('category' , selectedItem)} />
                    <ReminderDatePicker value={valueStore?.date} setValue={date => changeHandler("date" , date)} />
                    <ReminderDescriptionInput value={valueStore?.des} setValue={value => changeHandler("des" , value)} />
                </ScrollView>
            </View>
            <TouchableOpacity disabled={isInSendProcess || !isValid} style={[appendStyle.createCta , isInSendProcess || !isValid ? appendStyle.disabledCta : {}]} onPress={ctaHandler}>
                <Feather style={{ marginRight : 5 }} name={isInSendProcess ? "loader" : "chevron-left"} size={24} color="black" />
                <Para weight="bold" size={18}>{ctaText}</Para>
            </TouchableOpacity>
        </View>
    )
}


const style = ({ primary , baseBorderRadius  }) => StyleSheet.create({
    container : {
        flex: 1,
    },
    disabledCta :{ 
        opacity: .5
    },
    createCta : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 5),
        padding : 15,
        marginHorizontal : 15,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        marginBottom : 20
    }
})

export default ReminderPlayground;
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';



const NewReminderTrigger = ({ setIsInCreateMode }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <TouchableOpacity onPress={() => setIsInCreateMode(true)} style={appendStyle.createNewReminder}>
                <Feather name="plus" size={24} color={generateColor(primary , 8)} />
                <Para color={generateColor(primary , 8)} weight="bold">ثبت یادآور جدید</Para>
        </TouchableOpacity>
    )
}

const style = ({ baseBorderRadius }) => StyleSheet.create({
    createNewReminder : {
        flexDirection : 'row' , 
        alignItems : 'center', 
        justifyContent : 'center' , 
        paddingVertical : 20 , 
        borderBottomLeftRadius : baseBorderRadius ,
        borderBottomRightRadius : baseBorderRadius
    },
})

export default NewReminderTrigger;
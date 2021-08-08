import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';


const EmptyChat = ({ focusForNewMessageInEmptyState }) => {
    const{ primary } = useStyle();
    
    return (
        <View style={style.container}>
            <Feather name="message-square" size={40} color={generateColor(primary , 7)} />
            <TouchableOpacity style={{ alignItems : 'center' }} onPress={focusForNewMessageInEmptyState}>
                <Para color="grey" size={16} weight="bold">پیامی وجود ندارد</Para>
                <View style={{ flexDirection : "row" }}>
                    <Para color={primary}> با پشتیبانی در تماس باشید</Para>
                    <Para color="grey">نیاز به کمک دارید ؟</Para>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const style = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    }
})

export default EmptyChat;
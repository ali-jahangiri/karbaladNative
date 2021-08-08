import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';



const ReminderDescriptionInput = ({ value , setValue }) => {
    const appendedStyle = useStyle(style);
    
    return (
        <View style={{ margin : 15 }}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' }}>
                    <Para color="grey" size={17} weight="bold">شرح مختصر</Para>
                    <View style={appendedStyle.bullet} />
            </View>
            <View style={{ width : "100%" }}>
                <TextInput multiline style={appendedStyle.input} placeholder="شرح مختصری از مطلبی که می خواهید به شما یادآوری شود..." value={value} onChangeText={setValue} />
            </View>
        </View>   
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        marginVertical : 15,
    },
    input : {
        fontFamily : "bold",
        color: 'grey',
        minHeight : 70,
    },
    bullet : {
        width : 25,
        height:  25,
        borderRadius : baseBorderRadius - 5,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 15
    },
})

export default ReminderDescriptionInput;
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';


const MessageInput = ({sendMessage , isSending , setInputRef , currentFeedbackMode }) => {
    const appendStyle = useStyle(style , currentFeedbackMode);
    const [value, setValue] = useState('');
    
    const sendMessageHandler = () => {
        sendMessage(value);
        setValue("");
    }

    const inputRef = useRef();


    useEffect(() => {
        setInputRef(inputRef.current)
    } , [inputRef])

    return (
        <View style={appendStyle.container}>
            <TouchableOpacity disabled={!value} onPress={sendMessageHandler} style={[appendStyle.sendTriggerContainer , !value ? appendStyle.sendTriggerDisabled : {}]}>
                <Feather style={appendStyle.sendIcon} name="send" size={24} color="black" />
            </TouchableOpacity>
            <TextInput ref={inputRef} multiline style={appendStyle.input} placeholder="پیام خود را وارد کنید..." value={value} onChangeText={setValue} />
            {
                currentFeedbackMode ?  currentFeedbackMode === "bug" ? <View style={appendStyle.statusBox}><Para weight="bold" color="red">خطا در</Para></View> : <View style={appendStyle.statusBox}><Para color="green" weight="bold">پیشنهاد </Para></View> :null
            }
        </View>
    )
}


const style = ({primary , baseBorderRadius , ctaTextColor} , currentFeedbackMode) => StyleSheet.create({
    container: {
        width: "90%",
        marginHorizontal : "5%",
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : baseBorderRadius,
        overflow: 'hidden',
        backgroundColor : currentFeedbackMode ? currentFeedbackMode === "bug" ? "#ff262642" : '#c9d8b696' : generateColor(primary , 8),
        minHeight: 60
    },
    statusBox : {
        padding : 15,
        
    },
    sendTriggerDisabled : { opacity: .5 },
    input : {
        fontFamily : 'bold',
        fontSize : 16,
        color: ctaTextColor,
        paddingHorizontal : 15,
        height: "100%",
        flex: 1,
    },
    sendIcon : {
        transform: [{ rotate : "225deg" }],
        color: ctaTextColor
    },
    sendTriggerContainer : {
        padding: 15,
        height : "100%",
        backgroundColor : "#2222",
        paddingLeft : 25 ,
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center',
    }
})

export default MessageInput;
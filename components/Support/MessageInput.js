import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';


const MessageInput = ({sendMessage , isSending , setInputRef }) => {
    const appendStyle = useStyle(style);
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
            <TextInput ref={inputRef} style={appendStyle.input} placeholder="پیام خود را وارد کنید..." value={value} onChangeText={setValue} />
        </View>
    )
}


const style = ({primary , baseBorderRadius , ctaTextColor}) => StyleSheet.create({
    container: {
        width: "90%",
        marginHorizontal : "5%",
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius : baseBorderRadius,
        overflow: 'hidden',
        backgroundColor : generateColor(primary , 8),
        height: 60
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
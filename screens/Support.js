import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import useFetch from '../Providers/useFetch';

import Loading from '../components/Loading';


import { ChatHeader, MessageDirectory, MessageInput ,  } from "../components/Support"


const Support = () => {
    const appendStyle = useStyle(style);
    const fetcher = useFetch();
    const [isInMessageSending, setIsInMessageSending] = useState(false);
    const [chatItems, setChatItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getRefreshed, setGetRefreshed] = useState(false);

    
    const internalInputRef = useRef();

    const setInputRef = ref => internalInputRef.current = ref


    const focusForNewMessageInEmptyState = () => internalInputRef.current?.focus();

    const userSupportReqHandler = () => {
        return fetcher("userSupport")
                .then(({ data }) => {
                    setChatItems(data.filter(el => !el.message.startsWith("$_bug::") && !el.message.startsWith("$_feedback::") ).reverse());
                })
    }

    const sendMessageHandler = message => {
        setIsInMessageSending(true);
        fetcher("UserAddSupport" , { message })
            .then(({ data }) => data) 
            .then(_ => {
                userSupportReqHandler()
            })
    }


    useEffect(() => {
        let timer = 0;
        if(loading) {
            userSupportReqHandler()
                .then(_ => setLoading(false));
        }else {
            // timer = setInterval(() => {
            //     userSupportReqHandler()
            //         .then(_ => {
            //             setGetRefreshed(true)
            //             let timeoutTimer = setTimeout(() => {
            //                 setGetRefreshed(false);
            //                 clearTimeout(timeoutTimer)
            //             } , 3000)
            //         })
            // } , 60000);
        }
        return () => clearInterval(timer)
    } , [loading])


    return (
        <View style={appendStyle.container}>
            <ChatHeader getRefreshed={getRefreshed} />
            {
                loading ? <Loading /> : <MessageDirectory focusForNewMessageInEmptyState={focusForNewMessageInEmptyState} items={chatItems} />
            }
            <MessageInput setInputRef={setInputRef} isSending={isInMessageSending} sendMessage={sendMessageHandler} />
        </View>
    )
}


const style = () => StyleSheet.create({
    container : {
        flex: 1,
    }
})

export default Support;
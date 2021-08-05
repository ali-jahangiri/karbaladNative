import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import useFetch from '../Providers/useFetch';
import { generateColor, toFarsiNumber } from '../utils';

import { SimpleLineIcons } from '@expo/vector-icons';

import dayjs from 'dayjs';

import DirectionCta from "../components/DirectionCta"
import { useNavigation } from '@react-navigation/core';
import Loading from '../components/Loading';
import { useSelector } from '../Store/Y-state';

const UserMessage = ({ message , time }) => {
    const appendStyle = useStyle(userMessageStyle);

    return (
        <View style={appendStyle.container}>
            <View style={{ flexDirection : 'row' , alignContent : 'flex-end' , flex : 1 , justifyContent : 'flex-start' }}>
                <View style={appendStyle.innerContainer}>
                    <Para>{message}</Para>
                    <Para size={13} style={appendStyle.time}>{toFarsiNumber(time)}</Para>
                </View>
                </View>
        </View>   
    )
}

const userMessageStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-end',
        width: "100%",
        marginVertical : 25,
        paddingLeft : '5%'
    },
    time : {
        position: 'absolute',
        bottom: -30,
        right: 0,
        color: 'grey',
    },
    innerContainer : {
        backgroundColor : generateColor(primary, 5),
        maxWidth : "78%",
        padding: 15,
        borderRadius : baseBorderRadius,
        borderTopLeftRadius : 0,
        flexDirection : "row"
    },
})



const Header = ({ getRefreshed }) => {
    const appendStyle = useStyle(headerStyle);
    const { primary } = useStyle()
    const navigation = useNavigation();

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <DirectionCta direction="left" iconColor={generateColor(primary , 9)} containerBgColor={generateColor(primary , 2)} onPress={navigation.goBack} />
                <Para size={18} weight="bold">پشتیبانی</Para>
                <View style={[appendStyle.supportIconContainer , getRefreshed && { backgroundColor : "#57837B" }]}>
                    {
                        getRefreshed ? <MaterialCommunityIcons name="star-four-points-outline" size={25} color={'#C9D8B6'} /> : <SimpleLineIcons name="support" size={25} color={generateColor(primary , 9)} />
                    }
                </View>
            </View>
        </View>
    )
}


const headerStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        paddingTop : StatusBar.currentHeight + 20,
        paddingVertical : StatusBar.currentHeight,
    },
    supportIconContainer : {
        backgroundColor : generateColor(primary , 2),
        padding: 15,
        borderRadius : baseBorderRadius
    },
    innerContainer : {
        width: "90%",
        marginHorizontal : "5%",
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
    }
})

const AdminMessage = ({ message , time }) => {
    const appendStyle = useStyle(adminMessageStyle);
    return (
        <View style={appendStyle.container}>
            <View style={{ flexDirection : 'row' , alignContent : 'flex-end' , flex : 1 , justifyContent : 'flex-end' }}>
                <View style={appendStyle.innerContainer}>
                    <Para>{message}</Para>
                    <Para size={13} style={appendStyle.time}>{toFarsiNumber(time)}</Para>
                </View>
                </View>
        </View>
    )
}
const adminMessageStyle = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-end',
        width: "100%",
        marginVertical : 25,
        paddingRight : '5%'
    },
    time : {
        position: 'absolute',
        bottom: -30,
        color: 'grey',
    },
    innerContainer : {
        backgroundColor : "#f4f6fa",
        maxWidth : "78%",
        padding: 15,
        borderRadius : baseBorderRadius,
        borderTopRightRadius : 0,
        flexDirection : "row"
    },
})

const MessageInput = ({ sendMessage , isSending , setInputRef }) => {
    const appendStyle = useStyle(messageInputStyle);
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

const messageInputStyle = ({ primary , baseBorderRadius , ctaTextColor }) => StyleSheet.create({
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
        backgroundColor : "#2222",
        paddingLeft : 25 ,
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center',
    }
})


const EmptyChat = ({ focusForNewMessageInEmptyState }) => {
    const{ primary } = useStyle();
    
    return (
        <View style={emptyChatStyle.container}>
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


const emptyChatStyle = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center',
    }
})

const MessageDirectory = ({ items , focusForNewMessageInEmptyState}) => {
    const appendStyle = useStyle(directoryStyle);
    const containerRef = useRef();
    
    const haveItemsForShow = !items.length;


    return (
        <View style={appendStyle.container}>
            <ScrollView contentContainerStyle={{ flex : haveItemsForShow ? 1 : 0 , paddingBottom : !haveItemsForShow ? 10 : 0 }} ref={containerRef} onContentSizeChange={() => containerRef.current.scrollToEnd({animated: true})}>
                {
                    haveItemsForShow ? <EmptyChat focusForNewMessageInEmptyState={focusForNewMessageInEmptyState} /> : items.map((el , i) => {
                        if(el.fromAdmin) return <UserMessage message={el.message} key={i} time={dayjs(el.createTime).calendar('jalali').locale('fa').format('YYYY/MM/DD')} />
                        else return <AdminMessage key={i} message={el.message} time={dayjs(el.createTime).calendar('jalali').locale('fa').format("YYYY/MM/DD")} />
                    })
                }
            </ScrollView>
        </View>
    )
}

const directoryStyle = () => StyleSheet.create({
    container : { flex: 1,}
})

const Support = () => {
    const appendStyle = useStyle(style);
    const fetcher = useFetch();
    const [isInMessageSending, setIsInMessageSending] = useState(false);
    const [chatItems, setChatItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [getRefreshed, setGetRefreshed] = useState(false);

    const navHash = useSelector(state => state.navigation.navigationHash);

    const internalInputRef = useRef();

    const setInputRef = ref => {
        internalInputRef.current = ref
    }


    const focusForNewMessageInEmptyState = () => {
        internalInputRef.current?.focus();
    }

    const userSupportReqHandler = () => {
        return fetcher("userSupport")
                .then(({ data }) => {
                    setChatItems(data.reverse());
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
            timer = setInterval(() => {
                userSupportReqHandler()
                    .then(_ => {
                        setGetRefreshed(true)
                        let timeoutTimer = setTimeout(() => {
                            setGetRefreshed(false);
                            clearTimeout(timeoutTimer)
                        } , 1000)
                    })
            } , 60000);
        }
        return () => clearInterval(timer)
    } , [loading])


    return (
        <View style={appendStyle.container}>
            <Header getRefreshed={getRefreshed} />
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
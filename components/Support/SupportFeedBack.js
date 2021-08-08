import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { useStyle } from '../../Hooks/useStyle';

import { ChatHeader } from '.';
import Para from '../Para';
import { Feather, Ionicons } from '@expo/vector-icons';
import MessageInput from './MessageInput';
import useFetch from '../../Providers/useFetch';
import Drawer from '../Drawer';
import { generateColor } from '../../utils';


const SupportFeedBack = () => {
    const appendedStyle = useStyle(style);
    const [currentMode, setCurrentMode] = useState(null);
    
    const [feedbackSend, setFeedbackSend] = useState(false);

    const fetcher = useFetch();

    const sendFeedbackReq = passedInputValue => {
        const message = (() => {
            if(currentMode === "bug") return `$_bug::${passedInputValue}`;
            else return `$_feedback::${passedInputValue}`;
        })()
        fetcher("UserAddSupport" , { message })
            .then(() => setFeedbackSend(true))
    }

    const resetHandler = () => {
        setFeedbackSend(false);
        setCurrentMode(null)
    }

    return (
        <>
            <View style={appendedStyle.container}>
            <ChatHeader haveBugBadge getRefreshed={false} />
                <View style={{ flex : 1 }}>
                <ScrollView>
                    {
                        !currentMode || currentMode === "bug" ? <TouchableOpacity onPress={() => setCurrentMode("bug")} activeOpacity={.7} style={appendedStyle.contentContainer}>
                        <View style={[appendedStyle.badgeContainer , { backgroundColor : '#ff262642' }]}>
                            <Ionicons name="bug-outline" size={24} color="red" />
                        </View>
                        <Para style={appendedStyle.title}>آیا در روند اجرای برنامه به مشکلی برخورد کرده اید ؟ </Para>
                        <Para color="grey">اگر در یکی از مراحل استعلام ، انتخاب ، سفارش بیمه نامه و یا غیره به مشکلی برخود کرده اید با ما در ارتباط باشید</Para>
                        {
                            !currentMode && <Feather name="chevron-left" size={24} color="black" />
                        }
                        {
                                currentMode ? <TouchableOpacity onPress={() => setCurrentMode(null)} style={appendedStyle.backTrigger}><Para color="grey" weight="bold">بازگشت</Para><Feather style={{ marginLeft : 10 , color : "grey" }} name="arrow-right" size={24} color="black" /></TouchableOpacity> : null
                        }
                        </TouchableOpacity> : null
                    }
                    {
                        !currentMode || currentMode === "feedback" ? <TouchableOpacity onPress={() => setCurrentMode("feedback")} activeOpacity={.7} style={appendedStyle.contentContainer}>
                            <View style={[appendedStyle.badgeContainer , { backgroundColor : "#c9d8b696"}]}>
                                <Feather name="message-square" size={24} color="green" />
                            </View>
                            <Para style={appendedStyle.title}>پیشنهادی دارید ؟ </Para>
                            <Para color="grey">اگر انتقاد ، پیشنهاد و یا نظری در راستای بهبود عملکرد برنامه دارید آن را با ما در میان بگذارید </Para>
                            {
                                !currentMode && <Feather name="chevron-left" size={24} color="black" />
                            }
                            {
                                currentMode ? <TouchableOpacity onPress={() => setCurrentMode(null)} style={appendedStyle.backTrigger}><Para color="grey" weight="bold">بازگشت</Para><Feather style={{ marginLeft : 10 , color : "grey" }} name="arrow-right" size={24} color="black" /></TouchableOpacity> : null
                            }
                        </TouchableOpacity> : null
                    }
                    </ScrollView>
                </View>
                {
                    currentMode ? <MessageInput sendMessage={sendFeedbackReq} currentFeedbackMode={currentMode} setInputRef={() => {}}  /> : null
                }
        </View>
        {
            feedbackSend ? <Drawer onClose={resetHandler} onCancel={resetHandler}>
                <View style={{ height : "100%" , alignItems : 'center' , justifyContent : 'space-between'}}>
                        <View style={appendedStyle.successBadge}>
                            <Feather name="check" size={24} color="#4A503D" />
                        </View>
                        <Para size={18} weight="bold">{`${currentMode === "bug" ? "گزارش" : "پیشنهاد"}`} شما ارسال شد </Para>
                            <TouchableOpacity onPress={resetHandler} style={appendedStyle.drawerCta}>
                                <Para align="center" size={17} weight="bold">تایید</Para>
                            </TouchableOpacity>
                    </View>
            </Drawer> : null
        }
        </>
    )
}


const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        flex: 1
    },
    contentContainer: {
        width : "90%",
        marginHorizontal : "5%",
        marginVertical : 20,
        borderWidth : 2,
        padding : 20,
        borderRadius : baseBorderRadius,
        borderColor : "#F8F5F1"
    },
    backTrigger : {
        flexDirection : "row",
        justifyContent : 'flex-end',
        marginTop : 20
    },
    title : {
        fontSize : 22
    },
    badgeContainer : {
        marginBottom : 15,
        padding : 15,
        borderRadius : baseBorderRadius,
        alignSelf : "flex-end"
    },
    successBadge : {
        width : 65 , height : 65 , backgroundColor : '#B5CDA3' , alignItems : 'center' , justifyContent : 'center',
        borderRadius : baseBorderRadius,
        marginTop : -60
    },
    drawerCta : {
        width : "90%",
        marginHorizontal : "5%",
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding : 15
    },
})

export default SupportFeedBack;
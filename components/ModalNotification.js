import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useStyle } from "../Hooks/useStyle";
import { generateColor, persister } from '../utils';
import Para from "./Para";

const MobileModalAlert = ({ componentStyles , componentDatas }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const appendedStyle = useStyle(style);
    const [isAlertFresh, setIsAlertFresh] = useState(false);


    useEffect(() => {
        persister.get("alertUniqueCode")
            .then(res => {
                if(res !== componentDatas.alertRefresher) {
                    let timer = setTimeout(() => {
                        setIsModalVisible(true);
                        clearTimeout(timer);
                    } , 3000);

                    setIsAlertFresh(true)
                    persister.set("alertUniqueCode" , componentDatas.alertRefresher);
                }
            })
    } , [])

    return isAlertFresh ? (
        <View>
            <Modal
                animationType="slide"
                visible={isModalVisible}
                useNativeDriver={true}
                onRequestClose={() => setIsModalVisible(false)} >
                <View style={appendedStyle.modalContainer}>
                    <View style={appendedStyle.headerPanel}>
                        <View style={appendedStyle.infoBox}>
                            <AntDesign style={appendedStyle.notifIcon} name="notification" size={24} color="black" />
                        </View>
                        <View style={{ width : "80%" }}>
                            <View>
                                <Para weight="bold" size={29}>{componentDatas.title}</Para>
                                <View style={appendedStyle.titleDivider} />
                            </View>
                            <Para color="grey">
                                {componentDatas.desc}
                            </Para>
                        </View>
                    </View>
                </View>
                <ScrollView style={appendedStyle.contentContainer}>
                    <Para>{componentDatas.content}</Para>
                </ScrollView>
                <TouchableOpacity style={appendedStyle.closeTrigger} onPress={() => setIsModalVisible(false)}>
                        <Feather style={{ marginRight : 10 }} name="check" size={24} color="black" />
                        <Para size={18}>تایید</Para>
                </TouchableOpacity>
            </Modal>
        </View>
    ) : null
}


const style = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {

    },
    modalContainer : {
        padding : 10
    },
    headerPanel : {
        flexDirection : "row",
        padding : 10
    },
    notifIcon : {
        color: primary,
    },
    titleDivider :{
        width : "50%",
        alignSelf : "flex-end",
        height : 2 ,
        backgroundColor : primary,
        marginBottom : 10
    },
    infoBox : {
        width: 60,
        height : 60,
        backgroundColor : generateColor(primary , 5),
        alignItems : 'center',
        justifyContent : "center",
        borderRadius : baseBorderRadius
    },
    contentContainer : {
        paddingHorizontal : 20
        
    },
    closeTrigger : {
        width : "90%",
        marginHorizontal : "5%",
        marginBottom : 10,
        padding : 10,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 5),
        marginTop : 10,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : "center"
    }
})

export default MobileModalAlert;
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../../utils';
import Para from '../Para';



const ReminderItem = ({ remindTime , description, catName , deleteHandler , editHandler , id }) => {
    const appendedStyle = useStyle(style);
    const [controllerActive, setControllerActive] = useState(false);
    const { primary } = useStyle();

    return (
        <View style={appendedStyle.container}>
            <View style={{ flexDirection: 'row-reverse' }}>
                <View style={appendedStyle.dateContainer}>
                    <Para color={primary}>{toFarsiNumber(dayjs(remindTime).calendar("jalali").locale("fa").format('YYYY/MM/DD'))}</Para> 
                </View>
                <View style={appendedStyle.contentContainer}>
                    <Para size={16} weight="bold">{catName}</Para>
                    <Para size={14} color="grey">{description}</Para>
                </View>
                <TouchableOpacity onPress={() => setControllerActive(prev => !prev)} style={appendedStyle.controllerTrigger}>
                    <Feather name={controllerActive ? "x" : 'more-vertical'} size={24} color="#9e9e9e" />
                </TouchableOpacity>
            </View>
            {
                controllerActive ? <View style={appendedStyle.controller}>
                <TouchableOpacity style={[appendedStyle.cta ,{ backgroundColor : generateColor("#CE1212" , 5) }]} onPress={() => {
                    setControllerActive(false)
                    deleteHandler(id)
                }}>
                    <Para color="red">حذف</Para>
                    <Feather style={{ marginLeft : 5 }} name="x" size={24} color="red" />
                </TouchableOpacity>
                <TouchableOpacity style={[appendedStyle.cta ,{ backgroundColor : generateColor("#8E9775" , 5) }]} onPress={() => {
                    setControllerActive(false)
                    editHandler(id)
                }}> 
                    <Para color="green">ویرایش</Para>
                    <Feather style={{ marginLeft : 5 }} name="edit-2" size={24} color="green" />
                </TouchableOpacity>
                </View> : null
            }
        </View>
    )
}



const style = ({ primary , baseBorderRadius  }) => StyleSheet.create({
    container : {
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingVertical : 15,
    },
    controller : {
        flexDirection : "row",
        justifyContent : 'space-between',
        marginTop : 10,
        width : '100%'
    },
    dateContainer : {
        backgroundColor : generateColor(primary , 1),
        borderRadius : baseBorderRadius,
        padding : 15,
        alignItems :'center',
        justifyContent : 'center',
        flexDirection : "row",
        height: '100%'
    },
    controllerTrigger : {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor :"#F6F5F5",
        padding:  15,
        borderRadius : baseBorderRadius
    },
    contentContainer : {
        flex: 1,
        marginRight : 10
    },
    cta : {
        flexDirection : "row",
        justifyContent : 'center',
        width : "49%",
        alignItems : 'center',
        padding: 15,
        borderRadius : baseBorderRadius,
    },
})

export default ReminderItem;
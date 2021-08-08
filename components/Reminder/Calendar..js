import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';

import DirectionCta from '../DirectionCta';
import Para from '../Para';
import EmptyScreen from '../../screens/EmptyScreen';
import ReminderPlayground from './ReminderPlayground';
import NewReminderTrigger from './NewReminderTrigger';
import NearToCurrentDayReminder from './NearToCurrentDayReminder';


const Calendar = ({ haveItem , isInCreateMode , setIsInCreateMode , items , valueStore , isInSendingProcess , changeHandler , createHandler }) => {
    const appendStyle = useStyle(style , !!haveItem);
    const { primary , baseBorderRadius } = useStyle()
    const navigation = useNavigation();

    return (
        <View style={[appendStyle.container, isInCreateMode ? { flex : 1 , marginTop : StatusBar.currentHeight , backgroundColor : generateColor(primary , 2) } : {}]}>
                <View style={[appendStyle.holder , { left : "10%" }]} />
                    <View style={[appendStyle.holder , { left : "85%" }]} />
                <View style={appendStyle.topHeader}>
                    <View style={appendStyle.createHeader}>
                            <DirectionCta onPress={() => isInCreateMode ?  setIsInCreateMode(false) : navigation.goBack()} direction="left" containerBgColor={generateColor(primary , 5)} />
                            <Para weight="bold" size={22}>{isInCreateMode ? "ایجاد یادآور" : "یادآور"}</Para>
                    </View> 
                </View>
                {
                    isInCreateMode ? <ReminderPlayground
                                        isInSendProcess={isInSendingProcess}
                                        valueStore={valueStore}
                                        changeHandler={changeHandler} 
                                        ctaHandler={createHandler}
                                        ctaText="ثبت یادآور"
                                    /> : null
                }

                {
                    !haveItem && !isInCreateMode?  
                                <View style={{ flex : 1 }}>
                                        <EmptyScreen extendStyle={{ with : "100%" }} 
                                        message="یادآوری وجود ندارد" 
                                        desc={<View>
                                                <Para color='grey'>شما هیچ یادآوری تنطیم نکرده اید . </Para>
                                                <TouchableOpacity onPress={setIsInCreateMode} style={{ flexDirection : "row-reverse" , alignItems : 'center' , justifyContent : 'center' , marginTop : 10 , backgroundColor : generateColor(primary , 2) , borderRadius : baseBorderRadius , padding : 15 }}>
                                                <Para color={primary}>یادآوری ایجاد کنید</Para>
                                                <Feather name="plus" size={24} color={primary} />
                                                </TouchableOpacity>
                                            </View>} />
                                </View>
                             : null
                }
                {
                    haveItem && !isInCreateMode ? (
                        <>
                            <NearToCurrentDayReminder items={items} />
                            <NewReminderTrigger setIsInCreateMode={setIsInCreateMode} />
                        </>
                    ): null
                }
        </View>
    )
}


const style = ({ primary , baseBorderRadius } , haveItem) => StyleSheet.create({
    container : {
        flex: haveItem ? 0 : 1,
        marginTop : StatusBar.currentHeight + 30 ,
        backgroundColor : generateColor(primary , haveItem ? 6 : 2),
        borderRadius : baseBorderRadius,
    },
    createHeader : {
        marginTop : 25,
        paddingHorizontal : 15,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingVertical : 10,
        height: 105
    },
    holder : {
        width : 10,
        height: 45,
        backgroundColor : primary,
        borderRadius : baseBorderRadius,
        position: 'absolute',
        top: -15,
    },
    topHeader : {
        borderTopLeftRadius : baseBorderRadius,
        borderTopRightRadius : baseBorderRadius,
        width : "100%",
        minHeight : 65,
        backgroundColor : generateColor(primary , haveItem ? 8 : 6)
    }
})

export default Calendar;
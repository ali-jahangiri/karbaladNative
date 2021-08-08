import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../../utils';
import Para from '../Para';

const makeNumber = date => Number(dayjs(date).calendar("jalali").locale("fa").format('YYYYMMDD'));

const NearToCurrentDayReminder = ({ items }) => {
    
    
    const appendStyle = useStyle(style);
    
    const nearItem = (() => {
        if(items.length) {
            const today = Number(dayjs().calendar("jalali").calendar('jalali').locale('fa').format('YYYYMMDD'))
            return items.filter(el => makeNumber(el.remindTime) > today).sort((a , b) => makeNumber(a.remindTime) - makeNumber(b.remindTime)).sort((_ , b) => makeNumber(b.remindTime) - today).map(el => ({ ...el , remindTime : dayjs(el.remindTime).calendar("jalali").locale("fa").format("YYYY/MM/DD")}))[0]
        }else return null
    })()


    return (
        <View style={[appendStyle.calenderRow , { flexDirection : "column-reverse" , alignItems : 'flex-end' , justifyContent : 'center' }]}>
                <View style={{ marginTop : 10}}>
                    <View style={{ flexDirection : "row" }}>
                        <Para style={{ marginRight : 10 }}>{toFarsiNumber(nearItem.remindTime)}</Para>
                        <Para size={16} weight="bold">{nearItem.catName}</Para>
                        <View style={appendStyle.divider} />
                    </View>
                    <Para>{nearItem.description}</Para>
                    </View>
                <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                    <Para size={18} weight="bold">نزدیک ترین یادآور : </Para>
                    <View style={appendStyle.calenderRowIconContainer}>
                        <Feather name="chevrons-down" size={20} color="black" />
                    </View>
                </View>
        </View>
    )
}



const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    calenderRow : {
        width : "90%",
        marginHorizontal : "5%",
        backgroundColor : "white",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 15,
        borderRadius : baseBorderRadius,
        marginTop : 15
    },
    calenderRowIconContainer : {
        backgroundColor : generateColor(primary , 2) , 
        padding : 10 ,
        borderRadius : baseBorderRadius,
        marginLeft : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    divider: {
        width : 25, 
        height : 2,
        backgroundColor : primary,
        alignSelf : 'center',
        marginHorizontal : 10
    },
})

export default NearToCurrentDayReminder;
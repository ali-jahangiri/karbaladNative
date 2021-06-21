import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, persianDate } from '../utils';
import GenderSelector from './GenderSelection';
import Para from './Para';
import RequirementInput from './RequirementInput';

import { Feather } from '@expo/vector-icons';
import DatePickerInput from './DatePickerInput';

const formItems = [
    {
        key : "Name",
        label : "نام",
    },
    {
        key : "Family",
        label : "نام خانوادگی",
    },
    {
        key : "NCode",
        label : "کد ملی",
        type : "numeric"
    },
    {
        key : "Mobile",
        label : "تلفن همراه",
        type : "phone-pad"
    },
    {
        key : "BirthDay",
        label : "تاریخ تولد",
        component : (handler , value) => {
            return (
                <DatePickerInput value={value || persianDate.now} onChange={value => handler("BirthDay" , value)} />
            )
        }
    },
    {
        key : "Genders",
        label : "جنسیت",
        component : handler => <GenderSelector selectHandler={handler} />
    },
    {
        key : "InsAddress",
        label : "آدرس دقیق",
    },

]

const InsurerDetails = ({ onChange , store }) => {
    const appendStyle = useStyle(style);
    const [currentActiveInput, setCurrentActiveInput] = useState(null)
    const [showMore, setShowMore] = useState(true);

    const changeHandler = (key , value) => {
        onChange(prev => ({
            ...prev,
            [key] : value
        }))
    }


    return (
        <View style={appendStyle.container}>
            <TouchableOpacity onPress={() => setShowMore(!showMore)} style={appendStyle.header}>
                <View style={{ padding : 10 }} >
                    <Feather name={`chevron-${showMore ? "up" : "down"}`} size={24} color="black" />
                </View>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para weight="bold" size={18}>مشخصات بیمه گذار</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </TouchableOpacity>
            <View style={{ display : showMore ? "flex" : "none" }}>
            {
                formItems
                .map((el , i) => {
                    if(el.component) return el.component(changeHandler , store?.[el.key])
                    else return (
                        <RequirementInput
                            keyboardType={el.type}
                            label={el.label}
                            formName={el.key}
                            store={store}
                            index={i}
                            onChange={changeHandler}
                            currentActive={currentActiveInput}
                            setCurrentActive={setCurrentActiveInput}
                            key={i}
                    />
                    )
                })
            }   
            </View>
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : "5%",
    },
    header : {
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : "center",
        marginTop : 20,
        marginBottom : 15
    },
    titleDivider : {
        width: 15,
        height: 15,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 10
    },
})

export default InsurerDetails;
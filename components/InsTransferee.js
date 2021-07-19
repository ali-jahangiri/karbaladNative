import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';
import RequirementInput from './RequirementInput';

import DropDown from './DropDown';

const InsTransferee = ({ onChange , store , areas }) => {
    const [shouldGetInsurerData, setShouldGetInsurerData] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [currentActiveInput, setCurrentActiveInput] = useState(null)
    
    const appendStyle = useStyle(style , shouldGetInsurerData);
    const { primary } = useStyle();


    const changeHandler = (key , value) => {
        onChange(prev => ({
            ...prev,
            [key] : value
        }))
    }

    const formItems = [
        {
            key : "reciverName",
            label : "نام",
            inherentValueKey : "Name"
        },
        {
            key : "reciverFamily",
            label : "نام خانوادگی",
            inherentValueKey : "Family"
        },
        {
            key : "reciverMobile",
            label : "تلفن همراه",
            type : "phone-pad",
            inherentValueKey : "Mobile"
        },
        {
            key : "reciverPhone",
            label : "تلفن ثابت",
            type : "phone-pad",
        },
        {
            key : "AreaId",
            label : "منطقه",
            component : () => <DropDown
                                runOnInitial
                                key={"25e_69_983"}
                                onSelect={id => changeHandler('AreaId' , id)}
                                placeholder="لطفا منطقه سکونت خود را انتخاب کنید" 
                                items={areas} 
                                labelKey="fullName" />
        },
        {
            key : "ExactAddress",
            label : "آدرس دقیق",
            inherentValueKey : "InsAddress"
        },
        
    ]


    return (
        <View style={appendStyle.container}>
            <TouchableOpacity onPress={() => setShowMore(!showMore)} style={appendStyle.header}>
                <View style={{ padding : 10 }} >
                    <Feather name={`chevron-${showMore ? "up" : "down"}`} size={24} color="black" />
                </View>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para weight="bold" size={18}>مشخصات تحویل گیرنده</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </TouchableOpacity>
            <View style={{ display : showMore ? "flex" : "none" }}>

            <View style={appendStyle.copyContainer}>
                <View style={appendStyle.copyBtnContainer}>
                    <TouchableOpacity style={appendStyle.copyBtn} onPress={() => setShouldGetInsurerData(prev => !prev)}>
                        <Para color={shouldGetInsurerData ? primary : "grey"}>{shouldGetInsurerData ? "بله" : "خیر"}</Para>
                    </TouchableOpacity>
                </View>
                <Para style={{ flex : 1.5 }} >تحویل گیرنده بیمه گزار است؟</Para>
            </View>
            {
                formItems.map((el , i) => {
                    if(el?.component) return el.component()
                    else return (
                        <RequirementInput
                            label={el.label}
                            onChange={changeHandler}
                            formName={el.key}
                            index={i}
                            setCurrentActive={setCurrentActiveInput}
                            store={store}
                            keyboardType={el.type}
                            currentActive={currentActiveInput}
                            key={i}
                            defaultValue={shouldGetInsurerData && store?.[el?.inherentValueKey]}
                    />
                    )
                })
            }
            </View>
        </View>
    )
}

const style = ({ primary , baseBorderRadius } , isCopyingEnable) => StyleSheet.create({
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
    copyContainer : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'space-between',
        
    },
    copyBtn : {
        backgroundColor : isCopyingEnable ?  generateColor(primary , 5) : '#2e2e2e2e',
        padding: 20,
        borderRadius : baseBorderRadius
    },
    copyBtnContainer : {
        flexDirection : "row",
        flex: .7,
        justifyContent : 'space-between',
    }
})

export default InsTransferee;
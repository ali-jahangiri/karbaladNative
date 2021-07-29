import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';
import RequirementInput from './RequirementInput';

import DropDown from './DropDown';

const InsTransferee = ({ onChange , store , areas , setIsValid }) => {
    const [shouldGetInsurerData, setShouldGetInsurerData] = useState(false);
    const [currentActiveInput, setCurrentActiveInput] = useState(null)
    
    const appendStyle = useStyle(style , shouldGetInsurerData);
    const { primary } = useStyle();

    const validateGetComplete = (newObject) => {
        const reqListForPassing = formItems.map(el => shouldGetInsurerData ? el?.inherentValueKey || el.key : el.key);
        reqListForPassing.forEach(el => {
            if(!newObject?.[el]) setIsValid(false);
            else setIsValid(true)
        })
    }

    const changeHandler = (key , value) => {
        onChange(prev => ({
            ...prev,
            [key] : value
        }))

        validateGetComplete({ ...store , [key] : value })
    }

    const formItems = [
        {
            key : "reciverName",
            label : "نام",
            inherentValueKey : "Name",
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
            <View style={{ alignItems : 'flex-end' }}>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para weight="bold" size={18}>مشخصات تحویل گیرنده</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </View>
            <View>

            <TouchableOpacity onPress={() => setShouldGetInsurerData(prev => !prev)} style={[appendStyle.copyContainer , { backgroundColor : shouldGetInsurerData ? generateColor(primary , 8) : "grey" }]}>
                <View style={appendStyle.yesContainer}>
                    <Para color={shouldGetInsurerData ? primary : "black"} >{shouldGetInsurerData ? "بله" : "خیر"}</Para>
                </View>
                <Para style={{ flex : 1.5 }} >تحویل گیرنده بیمه گزار است؟</Para>
            </TouchableOpacity>
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
    yesContainer : {
        padding: 10,
        paddingHorizontal : 25,
    },
    copyContainer : {
        borderRadius : baseBorderRadius,
        padding: 15,
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'space-between',
        marginVertical : 5
    },
    copyBtn : {
        backgroundColor : isCopyingEnable ?  generateColor(primary , 5) : '#2e2e2e2e',
        padding: 20,
        borderRadius : baseBorderRadius
    },
})

export default InsTransferee;
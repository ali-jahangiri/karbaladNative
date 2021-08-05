import React, { useState } from 'react';
import { StyleSheet , View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, persianDate } from '../utils';
import GenderSelector from './GenderSelection';
import Para from './Para';
import RequirementInput from './RequirementInput';

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
        type : "numeric",
        validation : (value) => {
            const regex = /^[0-9]{10}$/
            if(regex.test(Number(value))) {
                return true
            }else return false
        },
        maxLength : 11
    },
    {
        key : "Mobile",
        label : "تلفن همراه",
        type : "phone-pad",
        validation : (value) => {
            if(Number.isNaN(value)) return false
            else if(value.length > 10) return true
            else return false
        },
        maxLength: 11
    },
    {
        key : "BirthDay",
        label : "تاریخ تولد",
        component : (handler , value) => {
            return (
                <View key="32b284c4-80d0-476d-867f" style={{ marginVertical : 10 }}>  
                    <Para color="grey" weight="bold" style={{ marginTop : 10 , marginRight : 10 }} >تاریخ تولد</Para>
                    <DatePickerInput hitStoreAtInitial  value={value || persianDate.now} onChange={value => handler("BirthDay" , value)} />
                </View>
            )
        }
    },
    {
        key : "Genders",
        label : "جنسیت",
        component : (handler , value) => <GenderSelector key="bbf22ecc-3ff0-488d-9a75-4084d13eb208" value={value} selectHandler={handler} />
    },
    {
        key : "InsAddress",
        label : "آدرس دقیق",
    },

]

const InsurerDetails = ({ onChange , store , setIsValid }) => {
    const appendStyle = useStyle(style);
    const [haveError, setHaveError] = useState('');

    const validation = (newObject , key , value) => {
        const reqListForPassing = formItems.map(el => el.key);
        reqListForPassing.forEach(el => {
            const currentItem = formItems.find(el => el.key === key)
            if(Boolean(currentItem.validation)) {
                if(!currentItem.validation(value)) {
                    setHaveError(key);
                    setIsValid(false);
                }else {
                    setHaveError('');
                    setIsValid(true);
                }
            }else {
                if(value) setIsValid(true)
                else setIsValid(false)
            }
        if(!newObject?.[el]) setIsValid(false);
        })
    }

    const changeHandler = (key , value) => {
        onChange(prev => ({
            ...prev,
            [key] : value
        }))
        validation({ ...store , [key] : value } , key , value);
    }

    return (
        <View style={appendStyle.container}>
            <View style={{ alignItems: "flex-end" }}>
                <View style={{ flexDirection : "row" , alignItems : "center" }}>
                    <Para weight="bold" size={18}>مشخصات بیمه گذار</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </View>
            <View>
            {
                formItems
                .map((el , i) => {
                    if(el.component) return el.component(changeHandler , store?.[el.key])
                    else return (
                        <RequirementInput
                            maxLength={el?.maxLength}
                            haveError={haveError === el.key}
                            defaultValue={store[el.key]}
                            keyboardType={el.type}
                            label={el.label}
                            formName={el.key}
                            store={store}
                            onChange={changeHandler}
                            key={i} />
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
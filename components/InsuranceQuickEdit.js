import React, { useEffect, useState } from 'react';
import { StyleSheet, View , StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';

import { generateColor, numberSeparator } from '../utils';
import InputDetector from '../utils/inputDetector';

import Drawer from './Drawer';
import InsuranceQuickEditItem from './InsuranceQuickEditItem';
import NextStepBtn from './NextStepBtn';
import Para from './Para';

import { Feather } from '@expo/vector-icons';

export const valueFinder = (store , selectedValue) =>  {
    switch(store.typesName) {
        case "Info" : 
            break;
        case "DropDown" :
        case "CheckedForm" : {
            // if(carCase)
            if(Array.isArray(selectedValue)) {
                return store.formData
                        .filter(el => selectedValue.includes(el.id))
                        .map((el) => el.dataName)
                        .toString()
            }
            return store.formData.find(el => el.id === selectedValue)?.dataName
        }
        case "CreateYear": {
            return selectedValue ?  store.formData.find(el => el.id === selectedValue).dataName : selectedValue
            
        }
        case "Date" : 
        case "Long" :
        case "Int" :
        case "Float" : {
            return selectedValue ? numberSeparator(selectedValue) : selectedValue
        }
        default : {
            return selectedValue;
        }
        
    }
}

const InsuranceQuickEdit = ({ navigation , route : { params } }) => {
    const appendStyle = useStyle(style);
    const [currentSetting, setCurrentSetting] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [currentFormName, setCurrentFormName] = useState("");
    const [currentTypeName, setCurrentTypeName] = useState("");
    const [tempState, setTempState] = useState({});


    // this value define current selected option for changing and
    const currentForm = params.selectedInsData.find(el => el.lbLName === currentSetting);


    const selectAnChangeOptionHandler = ({ label , key , typesName}) => {
        setIsDrawerOpen(true);
        setCurrentFormName(key);
        setCurrentSetting(label);
        setCurrentTypeName(typesName);
    }

    const temporaryChangeHandler = ({key = currentFormName , value , isNested }) => {
        // if we are change a key of selected insurance case , if new value don't have any difference with settled value in store , don't apply it and don't change temporary state 
        // if(params.valueStore[key] === value) return undefined
        
        // store values should store any ways because we need recovery feature
        setTempState(prev => ({
            ...prev,
            [isNested ? `Nested_${key}` : key] : value,
        }));

        if(key === "searchFilterBase") return;
        if(!currentForm?.formData[0]?.isCar && !['Float' , "Int" , "Long" , "CheckedForm" , "Date"].includes(currentTypeName)) {
            setIsDrawerOpen(false)
        }
    }

    const applyChangeHandler = () => {
        setIsDrawerOpen(false);
        setTempState(prev => ({ ...prev , searchFilterBase : "" }))
    };

    const discardHandler = () => {
        const leanedObject = {};
        // clean up temporary state from passed value (input)
        Object.entries(tempState)
            .map(([key , value]) => {
                if(key !== currentFormName) leanedObject[key] = value
        });
        setTempState({...leanedObject , searchFilterBase : ""});
        setIsDrawerOpen(false);
    }


    const getNewResultHandler = () => {
        const newStore = {...params.valueStore , ...tempState}
        navigation.navigate("insuranceResultPreview" , { id : params.id , valueStore : newStore , flattedStage : params.selectedInsData })
    }


    const givUpHandler = () => {
        setTempState({})
        navigation.goBack()
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <NextStepBtn onPress={givUpHandler} />
                <Para size={18} weight="bold" >ایجاد تغییر در بیمه</Para>
            </View>

            <ScrollView style={appendStyle.itemsDirectory}>
                {
                    params?.server.map((el , i) => (
                        <InsuranceQuickEditItem
                            index={i + 1}
                            tempStore={tempState}
                            store={params.selectedInsData}
                            value={valueFinder(params.selectedInsData.find(item => item.formName === el.name) , params.valueStore[el.name])}
                            label={el.lable} 
                            key={i}
                            onEdit={selectAnChangeOptionHandler} />
                    ))
                }
            </ScrollView>
            {
                // if we have a change in temp value , then we gonna see controller ( confirmChange )
                Object.values(tempState).length ? <TouchableOpacity style={appendStyle.newResultCta} onPress={getNewResultHandler}>
                            <Feather style={{ marginRight : 10 }} name="arrow-left" size={24} color="black" />
                            <Para weight="bold" align="center">استعلام مجدد</Para>
                        </TouchableOpacity> : null
            }
            {
                isDrawerOpen && 
                <Drawer 
                    onCancel={discardHandler}
                    onClose={() => setIsDrawerOpen(false)}
                    onDone={applyChangeHandler} 
                    title={currentSetting} 
                    extendStyle={{ padding : 10 }}
                    showController={currentForm?.formData[0]?.isCar || tempState?.searchFilterBase || ['Float' , "Int" , "Long" , "CheckedForm" , "Date"].includes(currentTypeName)}
                    >
                    <View style={{ flex : 1 }}>
                        {
                            <InputDetector
                                formData={currentForm.formData}
                                typesName={currentForm.typesName}
                                formName={currentForm.formName}
                                temporary={{ value: tempState , setValue : temporaryChangeHandler }}
                                isCarCase={currentForm?.formData[0]?.isCar && params?.carCategory}
                                formNameNested={`Nested_${currentFormName}`}
                                maxNumber={currentForm?.maxNumber}
                                minNumber={currentForm?.minNumber}
                                step={currentForm?.step}
                            />
                        }
                    </View>
                </Drawer>
            }
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {flex : 1,},
    header : {
        paddingTop : StatusBar.currentHeight + 20,
        paddingBottom : StatusBar.currentHeight + 10,
        backgroundColor : generateColor(primary , 8),
        paddingHorizontal : "10%",
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    newResultCta : {
        width: "90%",
        marginHorizontal : "5%",
        backgroundColor : generateColor(primary , 5),
        padding : 15,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : baseBorderRadius
    }
})

export default InsuranceQuickEdit;
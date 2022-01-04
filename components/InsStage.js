import React, { useState } from 'react';
import { StatusBar, StyleSheet, View ,  Alert } from 'react-native';
import client from '../client';

import { useStyle } from '../Hooks/useStyle';

import { persianDate, toFarsiNumber } from '../utils';
import { generateColor } from '../utils';
import InputDetector from '../utils/inputDetector';

import InsStageController from './InsStageController';
import InsStageOptionalBadge from './InsStageOptionalBadge';
import Para from './Para';
import StepTimeline from './StepTimeline';

const InsStage = props => {
    const { stageNumber , nextStageHandler , prevStageHandler , categoryName , store , typesName , formData , formName , carCategory , isRequierd , lbLName , setIsInInitialInputRender , isInDynamicFlow , setAvailableRenderClone , initialInsuranceNameFallback } = props
    
    const NESTED_KEY_NAME = `Nested_${formName}`;
    
    const appendStyle = useStyle(style);
    const [err, setErr] = useState(false);
    
    const baseObject = { 
        searchFilterBase : "" , 
        formName : store[formName] || formName , 
        [NESTED_KEY_NAME] : store[NESTED_KEY_NAME],
        date : persianDate.dateInstance 
    }

    const [temporaryValue, setTemporaryValue] = useState(baseObject);


    const temporaryChangeHandler = ({key = formName , value , isNested}) => {
        // save change inside temp state in all case
        setTemporaryValue(prev => ({
            ...prev,
            [isNested ? `Nested_${key}`: key] : value
        }));
        // if component that trigger changeHandler was searchBoc , we shouldn't go to next step therefore : || key === "searchFilterBase"
        // or current step input type was one of 'Float' , "Int" , "Long" , "CheckedForm" , 'Date' , 'String' don't go next step until we user trigger next btn
        if(carCategory || client.static.WHITE_LIST_FOR_PREVENTING_AUTO_NEXT.includes(typesName) || key === "searchFilterBase") return undefined;
        else {
            // push change directly in main end result store without user event 
            const newClonedTemp = {...temporaryValue , [isNested ? `Nested_${key}`: key] : value};
            const haveNestedKey = formData[0]?.hasNestedData ? { [NESTED_KEY_NAME]: newClonedTemp[NESTED_KEY_NAME] } : undefined
            const pureTarget = {
                [formName] : newClonedTemp[formName],
                ...haveNestedKey
            }
            nextStageHandler(pureTarget)
            setTemporaryValue(prev => ({ ...prev , searchFilterBase : "" }))
        }
    }
    

    const onDropDownChangeHandler = (value) => {
        if(isInDynamicFlow) {
            const targetInputFormData = formData.find(el => el.id === value);
            setIsInInitialInputRender(false);

            setAvailableRenderClone(prev => ({
                ...prev,
                [formName] : {
                    actives : targetInputFormData.actives,
                    deActives : targetInputFormData.deActives
                }
            }))
        }
        temporaryChangeHandler({ value })
    }

    const pushToNextStageHandler = () => {
        // !Important this is a special case witch nested propertied is a required field
        if(carCategory && !temporaryValue[NESTED_KEY_NAME]) return setErr(true);
        
        if(isRequierd && (!temporaryValue[formName] && !temporaryValue[NESTED_KEY_NAME] )) setErr(true);
        
        else {
            const haveNestedKey = formData[0]?.hasNestedData ? { [NESTED_KEY_NAME]: temporaryValue[NESTED_KEY_NAME] } : undefined
            setErr(false);
            const pureTarget = {
                [formName] : temporaryValue[formName],
                ...haveNestedKey
            }
            nextStageHandler(pureTarget)
            setTemporaryValue(prev => ({ ...prev , searchFilterBase : "" }))
        }
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <StepTimeline 
                        eachItemWithStepper={100 / stageNumber.length}
                        itemsLength={stageNumber.length} 
                        currentStage={stageNumber.currentStage} />
                        
                <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , width : "100%"}}>
                    <View style={appendStyle.stageNumber}>
                        {
                            stageNumber.currentStage + 1 === stageNumber.length + 1 ?
                                 <Para>مرحله آخر</Para> : 
                                 <Para> مرحله {toFarsiNumber(stageNumber.currentStage + 1)} از {toFarsiNumber(stageNumber.length + 1)}</Para>
                        }
                    </View>
                    <Para style={{ flex : 1 }} weight="bold" size={20}>{categoryName || initialInsuranceNameFallback}</Para>
                </View>
                <View>
                    <View style={appendStyle.titleContainer}>
                        <Para style={{ paddingLeft : 25 }} color='grey' size={18}>{lbLName}</Para>
                        <View style={appendStyle.divider} />
                    </View>
                </View>
                {
                    isRequierd === false && <InsStageOptionalBadge />
                }
            </View>
                <View style={appendStyle.stagePlayground}>
                    {
                        <InputDetector
                            onDropDownChangeHandler={onDropDownChangeHandler}
                            pushToNextStageHandler={pushToNextStageHandler}
                            formNameNested={`Nested_${formName}`}
                            formName={formName}
                            isCarCase={carCategory}
                            typesName={typesName} 
                            temporary={{value : temporaryValue , setValue : temporaryChangeHandler}} 
                            {...props} />
                    }
                </View>
            {
                err && Alert.alert("" , "مراحل را تکمیل کنید."  , 
                    [{
                        text: "تایید",
                        onPress : () => setErr(false)},
                    ])
            }
            <InsStageController 
                nextLabe={stageNumber.currentStage + 1 === stageNumber.length + 1 && "اتمام"} 
                backLabel={stageNumber.currentStage + 1 === 1 && "بازگشت"} 
                onNext={pushToNextStageHandler} 
                onPrevious={prevStageHandler} />
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
        width : "90%",
        marginHorizontal : "5%"
    },
    header : {
        marginTop: StatusBar.currentHeight + 10,
        alignItems : 'flex-end',
        justifyContent : 'space-between',
        width: "100%",
    },
    stageNumber : {
        flexDirection : 'row',
        padding: 10,
        alignSelf : "flex-start"
    },
    stagePlayground : {
        flex : 1,
    },
    titleContainer : {
        flexDirection : "row" , 
        alignItems : 'center' , 
        justifyContent : 'center',
        marginVertical : 6,
        width : "100%",
    },  
    divider : {
        width: 25,
        height: 10,
        backgroundColor : generateColor(primary , 3),
        borderRadius : baseBorderRadius,
        marginLeft : 10
    },
    optionalStepContainer: {
        backgroundColor : "#fffcfc",
        borderRadius : baseBorderRadius,
        padding: 10,
        borderWidth : 2,
        borderColor : '#ededed',
    }
})

export default InsStage;
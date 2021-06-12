import React, { useEffect, useState } from 'react';
import { StyleSheet, View , ActivityIndicator } from 'react-native';
import InsuranceStepperIntro from '../components/InsuranceStepperIntro';
import Para from '../components/Para';
import InsStage from '../components/InsStage';

import api from "../api";

import { useStyle } from '../Hooks/useStyle';
import { carCaseChecker } from '../utils';

const InsuranceStepper = ({ id , name }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [insuranceData, setInsuranceData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [inputValue, setInputValue] = useState({});

    const appendStyle = useStyle(style)

    useEffect(() => {
        setLoading(true)
        api.post("https://insurco.ir/MobileApi/GetInsuranceForm" , { categoryId : id })
            .then(({ data }) => {
                setInsuranceData(data)
                setLoading(false)
            });
    } , [])

    // TODO change text of prev btn when stage is === 1
    // TODO add fallback for destructuring key for title and so on
    console.log(insuranceData , '*');
    const nextStepHandler = () => {
        setCurrentStage(prev => prev + 1)
    }


    const previousStepHandler = () => {

    }

    const stageRenderChecker = () => {
        if(currentStage === 0) {
            return <InsuranceStepperIntro 
                        nextStepHandler={nextStepHandler} 
                        desc={insuranceData.description} 
                        title={insuranceData.title} />
        }else {
            const flattedStage = insuranceData.pages.map(el => el.forms).flat(1)
            const currentStageData = flattedStage[currentStage];
            console.log('currentStage' , currentStageData);
            
            return <InsStage
                carCategory={carCaseChecker(currentStageData.formData ,insuranceData.carGroup )}
                inputValue={inputValue}
                inputValueSetter={setInputValue}
                stageNumber={{ length : flattedStage.length , currentStage }} 
                title={insuranceData.pages[currentStage].title}  
                categoryName={name} 
                {...currentStageData} />
        }
    }

    return loading ? 
    <ActivityIndicator />
    : <>
        <View style={appendStyle.container}>
            {
                stageRenderChecker()
            }
        </View>
      </>
}

const style = ({ primary }) => StyleSheet.create({
    container : {
        flex: 1,
    }
})

export default InsuranceStepper;
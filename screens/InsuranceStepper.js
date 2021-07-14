import React, { useEffect, useState } from 'react';
import { StyleSheet, View  } from 'react-native';
import InsuranceStepperIntro from '../components/InsuranceStepperIntro';
import InsStage from '../components/InsStage';

import useFetch from "../Providers/useFetch"

import { useStyle } from '../Hooks/useStyle';
import { carCaseChecker } from '../utils';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import client from '../client';

const InsuranceStepper = ({ id , name }) => {
    const navigation = useNavigation();

    const [currentStage, setCurrentStage] = useState(0);
    const [insuranceData, setInsuranceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seeIntro, setSeeIntro] = useState(false);
    const [valueStore, setValueStore] = useState({});


    const fetcher = useFetch(true);
    const appendStyle = useStyle(style)
    
    useEffect(() => {
        setLoading(true)
        fetcher
            .then(({ api , appToken }) => {
                api.post('GetInsuranceForm'  , { categoryId : id } , { headers : {
                    appToken
                } })
                    .then(({data}) => {
                        setInsuranceData(data)
                        setLoading(false)
                    })
            })
    } , [])


    const nextStepHandler = haveNewTempValueForSet => {
        setCurrentStage(prev => prev + 1);
        if(haveNewTempValueForSet) setValueStore(prev => ({ ...prev , ...haveNewTempValueForSet}))
    }   

    const previousStepHandler = () => {
        if(!currentStage && seeIntro) {
            setSeeIntro(false);
        }else setCurrentStage(prev => prev - 1)
    };

    const stageRenderChecker = () => {
        if(!seeIntro) {
            return <InsuranceStepperIntro 
                        nextStepHandler={() => setSeeIntro(true)} 
                        desc={insuranceData.description} 
                        title={insuranceData.title} />
        }else {
            const flattedStage = insuranceData.pages
                                    .map(el => el.forms)
                                    .flat(1)
                                    .filter(el => el.typesName !== client.static.INPUT_DETECTOR.INFO);
            const currentStageData = flattedStage[currentStage];

            // if we reach to end step (stage) of insurance stepper we should navigate to result preview
            
            if(!currentStageData) {
                navigation.navigate("insuranceResultPreview" , { id , valueStore , flattedStage , carCategory : insuranceData?.carGroup});
                return null
            }
            
            
            else {
                return <InsStage
                            nextStageHandler={nextStepHandler}
                            prevStageHandler={previousStepHandler}
                            carCategory={carCaseChecker(currentStageData.formData ,insuranceData.carGroup )}
                            store={valueStore}
                            stageNumber={{ length : flattedStage.length - 1, currentStage }} 
                            title={insuranceData.pages[currentStage]?.title}  
                            categoryName={name}
                            {...currentStageData} />
            }
        }
    }

    return loading ? <Loading />
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
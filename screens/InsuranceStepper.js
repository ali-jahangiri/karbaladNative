import React, { useEffect, useState } from 'react';
import { StyleSheet, View  } from 'react-native';
import InsuranceStepperIntro from '../components/InsuranceStepperIntro';
import InsStage from '../components/InsStage';

import useFetch from "../Providers/useFetch"

import { useStyle } from '../Hooks/useStyle';
import { carCaseChecker, detectAvailableInsuranceInput } from '../utils';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/Loading';
import client from '../client';
import { detectIsInInsuranceDynamicFlow } from '../utils';

const InsuranceStepper = ({ route : { params : { id , name }} }) => {
    const navigation = useNavigation();

    const [currentStage, setCurrentStage] = useState(0);
    const [insuranceData, setInsuranceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [seeIntro, setSeeIntro] = useState(false);
    const [valueStore, setValueStore] = useState({});

    const [availableRenderClone, setAvailableRenderClone] = useState({});
    const [isInInitialInputRender, setIsInInitialInputRender] = useState(true);
    const [isInDynamicFlow, setIsInDynamicFlow] = useState(false);

    const [redirectKey, setRedirectKey] = useState(0);

    const fetcher = useFetch();
    const appendStyle = useStyle(style);
    const insInputAvailableHandler = detectAvailableInsuranceInput(availableRenderClone , isInInitialInputRender);
    
    useEffect(() => {
        setLoading(true)
        fetcher('GetInsuranceForm' , { categoryId : id })
            .then(({ data }) => {
                setInsuranceData(data)
                if(detectIsInInsuranceDynamicFlow(data)) setIsInDynamicFlow(true);
                setLoading(false)
            }).catch(err => {
                throw new Error(err.message)
            })

    } , [id]);

    useEffect(() => {
        if(!loading) {
            const flattedStage = insuranceData.pages
                                        .map(el => el.forms)
                                        .flat(1)
                                        .filter(el => el.typesName !== client.static.INPUT_DETECTOR.INFO);
            const filteredFlattedStage = insInputAvailableHandler(flattedStage);
            const currentStageData = filteredFlattedStage[currentStage];
            if(!currentStageData) {
                const clonedStore = JSON.stringify({
                    id , 
                    valueStore,
                    flattedStage , 
                    carCategory : insuranceData?.carGroup
                })
                navigation.replace("insuranceResultPreview" , { ...JSON.parse(clonedStore) });
            }
        }
    } , [redirectKey , currentStage])
    

    const nextStepHandler = haveNewTempValueForSet => {
        setCurrentStage(prev =>  prev + 1);
        if(haveNewTempValueForSet) setValueStore(prev => ({ ...prev , ...haveNewTempValueForSet}));
        setRedirectKey(Date.now())
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
            const filteredFlattedStage = insInputAvailableHandler(flattedStage);
            const currentStageData = filteredFlattedStage[currentStage];
            if(!currentStageData) return null
            // if we reach to end step (stage) of insurance stepper we should navigate to result preview
            // NOTE initialInsuranceNameFallback is for a situation when we have a static insurance id redirection and don't provide a name for that
            return <InsStage
                        initialInsuranceNameFallback={insuranceData.title}
                        setAvailableRenderClone={setAvailableRenderClone}
                        isInDynamicFlow={isInDynamicFlow}
                        setIsInInitialInputRender={setIsInInitialInputRender}
                        nextStageHandler={nextStepHandler}
                        prevStageHandler={previousStepHandler}
                        carCategory={carCaseChecker(currentStageData.formData ,insuranceData.carGroup )}
                        store={valueStore}
                        stageNumber={{ length : filteredFlattedStage.length - 1, currentStage }} 
                        title={insuranceData.pages[currentStage]?.title}  
                        categoryName={name}
                        {...currentStageData} />
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

const style = () => StyleSheet.create({
    container : {
        flex: 1,
    }
})

export default InsuranceStepper;
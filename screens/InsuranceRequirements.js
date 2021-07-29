import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import RequirementDocument from '../components/RequirementDocument';
import FurtherInfo from '../components/FurtherInfo';
import InsurerDetails from '../components/InsurerDetails';
import InsTransferee from '../components/InsTransferee';
import Para from '../components/Para';
import Btn from '../components/Btn';
import RequirementInstallmentIntro from '../components/RequirementInstallmentIntro';

import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import useFetch from '../Providers/useFetch';
import Loading from '../components/Loading';
import { useDispatch } from '../Store/Y-state';
import { setTabBarState } from '../Store/Slices/uiSlice';
import DirectionCta from '../components/DirectionCta';
import RequirementInstallmentIntroHeader from '../components/RequirementInstallmentIntroHeader';
import { useIsFocused } from '@react-navigation/native';

// !Important add money info section latter on

const InsuranceRequirements = ({ route : { params } , navigation }) => {
    
    const [loading, setLoading] = useState(true);
    const [staticStore, setStaticStore] = useState({});
    const [dynamicStore, setDynamicStore] = useState({});
    const [docItems, setDocItems] = useState({});
    const [areas, setAreas] = useState([]);
    const [inInsRecord, setInInsRecord] = useState(false);
    const [error, setError] = useState(null);
    const [isValidToGoNextStage, setIsValidToGoNextStage] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);

    const { primary } = useStyle();
    
    const fetcher = useFetch();
    const appendStyle = useStyle(style);
    const dispatch = useDispatch();
    const scrollContainer = useRef();



    useEffect(() => {
        const reqBody = {
            InstallmentId : params.installmentId , 
            formulaId : params.factorId, 
            requestId : params.reqId
        }

        fetcher('AddFactor' , reqBody)
            .then(({ data }) => {
                console.log(data , 'initial data');
                setDocItems(data);
                setAreas(data.areas);
                setLoading(false)
                
            })
    } , [])
    
    useEffect(() => {
        if(docItems) {
            dispatch(() => setTabBarState('#171717'))
            StatusBar.setBarStyle('light-content');
        }
    } , [])
    
    const isFocused = useIsFocused()

    useEffect(() => {
        if(docItems) {
            if(!isFocused) {
                dispatch(() => setTabBarState("transparent"))
                StatusBar.setBarStyle("dark-content")
            }else {
                dispatch(() => setTabBarState('#171717'))
                StatusBar.setBarStyle('light-content');
            }
        }
    } , [isFocused])

    const intro = docItems?.moneyInfo?.installment && <RequirementInstallmentIntro setIsValid={setIsValidToGoNextStage} data={docItems.moneyInfo} />

    const reqImage = docItems?.requierds?.filter(el => el.typeImage).length &&
        <RequirementDocument
            value={dynamicStore}
            setIsValid={setIsValidToGoNextStage}
            setValue={setDynamicStore} 
            items={docItems.requierds?.filter(el => el.typeImage)} />;

    const reqText = docItems?.requierds?.filter(el => !el.typeImage).length && <FurtherInfo 
        value={dynamicStore}
        setIsValid={setIsValidToGoNextStage}
        setValue={setDynamicStore}
        items={docItems.requierds.filter(el => !el.typeImage)} />

    const details = <InsurerDetails setIsValid={setIsValidToGoNextStage} store={staticStore} onChange={setStaticStore}     />
    const transferee  = <InsTransferee setIsValid={setIsValidToGoNextStage}  areas={areas} onChange={setStaticStore} store={staticStore} />
    
    const stageList = [ intro , reqImage , reqText , details , transferee].filter(el => el);



    const nextStepHandler = () => {
        // * NOTE => if one of static field have some problem whit they validation , then 'isValidToGoNext' state get false and we cannot go next stage or submit result . also the static field error appears inside the responsible parent stage with helper state

        if(currentStage + 1 === stageList.length) return goToPaymentHandler();

        if(isValidToGoNextStage) {
            setCurrentStage(prev => prev + 1);
            setIsValidToGoNextStage(false);
        }else {
            Alert.alert("مراحل را تکمیل نمایید" , null , [
                {text : "بستن" , onPress(){}}
            ])
        }
    }


    
    const comeBackHomeHandler = () => navigation.navigate("home")

    const goToPaymentHandler = () => {
        Keyboard.dismiss();
        
        const sendObject = {
            ...staticStore ,
            factorId : docItems.factorCode ,
            request : JSON.stringify(dynamicStore)
        };


        setInInsRecord(true);
        fetcher("GetRequirements" , sendObject)
                .then(({ data }) => {
                    setError(null);
                        if(!data.hasData) {
                            // TODO handle this case , for now i throw a err
                            throw new Error("مشکلی رخ داده است ، مجددا تلاش نمایید")
                            // navigation.navigate("insuranceRequirementConfirm" , { id : docItems.factorCode , message : data.message })
                        }else {
                            const { data : response , message } = data
                            navigation.navigate('insurancePayment' , { id : response.id , loadingMessageHelper : message });
                        }
                }).catch(err => {
                    setError(err.message);
                })
    }


    // navigation.reset({ index  : 0 , routes : [{ name : "home" }]  })

    return loading ? <Loading /> 
    : <View style={appendStyle.container}>
        <View style={appendStyle.innerContainer}>
            <View style={appendStyle.stageHeader}>
                {
                    docItems?.moneyInfo?.installment && currentStage === 0 ? <RequirementInstallmentIntroHeader /> 
                    : <View style={appendStyle.stageHeaderContainer}>
                        <DirectionCta 
                            containerBgColor={generateColor(primary , 5)} 
                            icon="home" 
                            onPress={comeBackHomeHandler} />
                            <Para size={20} weight="bold">{docItems.moneyInfo.catName}</Para>
                        </View>
                }
            </View>
            <ScrollView  ref={scrollContainer}  style={appendStyle.scrollContainer} contentContainerStyle={{ width : "95%"  , marginHorizontal : "2.5%"}}>
                {stageList[currentStage]}
            </ScrollView>
        </View>
        <View style={appendStyle.ctaContainer}>
            <Btn disabled={inInsRecord || !isValidToGoNextStage} bgAlpha={null} onPress={nextStepHandler} extendStyle={{ flex : 1  }} title={inInsRecord ? "در حال ارسال..." :  currentStage + 1 === stageList.length ? 'اتمام' : "بعدی"} />
            {!!currentStage && 
                <Btn disabled={inInsRecord} bgAlpha={null} 
                    extendStyle={{ flex : .5 , marginLeft : 10 }} 
                    title="قبلی" 
                    onPress={() => setCurrentStage(prev => prev - 1)} />
            }
        </View>
    </View>
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    ctaContainer  : {
        padding : 15,
        backgroundColor : generateColor(primary , 9),
        borderRadius : baseBorderRadius,
        width: "90%",
        marginHorizontal : "5%",
    },
    container : {
        flex: 1,
        backgroundColor : '#171717'
    },
    ctaContainer : {
        width: "95%",
        marginHorizontal : "2.5%",
        minHeight : 25,
        flexDirection : "row",
        justifyContent : 'center',
        marginVertical : 20,
        marginTop : 25,
    },
    scrollContainer : {
        flex: 1.8,
        width : "100%"
    },
    innerContainer : {
        marginTop : StatusBar.currentHeight + 5,
        borderRadius : baseBorderRadius,
        width: "95%",
        marginHorizontal : "2.5%",
        backgroundColor : 'white',
        alignItems : "center",
        justifyContent : "center",
        flex: 1,
    },
    stageHeader : {
        width : "90%",
        marginTop : 15,
        marginBottom : 25,
        flex: .1
    },
    stageHeaderContainer : {
        flexDirection : "row" , 
        justifyContent : 'space-between' , 
        alignItems : 'center' , 
        zIndex : 55 , 
        backgroundColor : "white" 
    }
})

export default InsuranceRequirements;
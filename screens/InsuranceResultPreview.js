import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View , TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {useStyle} from "../Hooks/useStyle"
import { generateColor } from '../utils';
import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';

import Para from "../components/Para";
import InsuranceResultPreviewItem from '../components/InsuranceResultPreviewItem';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import ScreenWrapper from '../components/ScreenWrapper';

const InsuranceResultPreview = ({ route : { params : { id , valueStore , flattedStage : selectedInsData , carCategory } } , navigation }) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [responseValues, setResponseValues] = useState({});
    const appendStyle = useStyle(style);
    const { headerTitleColor } = useStyle()
    const [reqId, setReqId] = useState('');

    
    const navHash = useSelector(state => state.navigation.navigationHash);
    const fetcher = useFetch();

    useEffect(() => {
        setInitialLoading(true);
        fetcher('GetInsuranceQuoteId' , { formData : JSON.stringify({ ...valueStore , Id : String(id) }) })
            .then(({ data }) => data)
            .then(receivedId => {
                fetcher("GetInsuranceQuotes" ,  { formulaId : receivedId})
                    .then(({ data }) => {
                        setResponseValues(data);
                        setReqId(receivedId);
                        setInitialLoading(false);
                    }).catch(err => {
                        throw new Error(err.message)
                    })
            })

        return () => {
            // with this state change , we force entire component get re render and all new params and send new request
            setInitialLoading(true);
        }
    } , [navHash , valueStore]);
    

    const quickEditHandler = () => {
        if(responseValues?.insuranceQuotes?.factorItems) {
            navigation.push('insuranceQuickEdit' ,{ server :  responseValues.insuranceQuotes.factorItems , valueStore , selectedInsData , id , carCategory })
        }
    }

    const goHomeHandler = () => navigation.navigate('home')

    
    if(initialLoading) return <Loading />
    else {
        const catFullName = responseValues?.insuranceQuotes?.addInsCoAmountV2[0]?.catFullName;
        
        return (
            <ScreenWrapper>
            <View style={appendStyle.header}>
                <TouchableOpacity onPress={quickEditHandler} style={appendStyle.editContainer}>
                    <Feather name="edit-2" size={30} color={headerTitleColor} />   
                </TouchableOpacity>
                <View style={{ flex : 1 }}>
                    {
                        catFullName ? <>
                            <Para color={headerTitleColor}>نتایج جستجو در : </Para>
                            <Para color={headerTitleColor} weight="bold" size={20}>{catFullName}</Para>
                        </>
                        : <Para color={headerTitleColor} size={20} weight="bold">نتایج جستجو : </Para>
                    }
                </View>
            </View>
            {
                responseValues?.insuranceQuotes?.addInsCoAmountV2?.length ? (<ScrollView >
                {
                    responseValues?.insuranceQuotes?.addInsCoAmountV2?.map((el , i) => (
                        <InsuranceResultPreviewItem
                                haveInstallment={responseValues?.installmetFormouls?.includes(el.formulId)}
                                visualAlert={el.visualAlert}
                                reqId={reqId}
                                installmentList={responseValues.installmetFormouls}
                                factorItems={responseValues.insuranceQuotes.factorItems} 
                                {...el}
                                key={i} />
                    ))
                }
                <TouchableOpacity style={appendStyle.goHome} onPress={goHomeHandler}>
                    <Para color="lightgrey" align="center">بازگشت به خانه</Para>
                    <Feather style={{ marginLeft : 10 }} name="arrow-right" size={24} color="lightgrey" />
                </TouchableOpacity>
                </ScrollView> ) : <EmptyState
                                        actionHandler={goHomeHandler}
                                        title="نتیجه ای یافت نشد:(" 
                                        desc="نتیجه ای برای این استعلام حاصل نشد . مجددا تلاش نمایید." 
                                        ctaText="بازگشت"/>
            } 
                
           
        </ScreenWrapper>
        )
    }
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    header : {
        backgroundColor : generateColor(primary , 8),
        paddingTop : StatusBar.currentHeight * 2,
        paddingBottom : StatusBar.currentHeight * 1.5,
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : "10%"
    },
    editContainer : {
        borderRadius : baseBorderRadius,
        backgroundColor : '#fff2',
        padding: 12,
        marginRight : 5
    },
    goHome : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        padding: 15,
        marginTop : 10
    }
})

export default InsuranceResultPreview;
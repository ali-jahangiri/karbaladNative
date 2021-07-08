import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import Para from "./Para";
import InsuranceResultPreviewItem from './InsuranceResultPreviewItem';

import {useStyle} from "../Hooks/useStyle"

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Loading from './Loading';
import EmptyState from './EmptyState';
import useFetch from '../Providers/useFetch';

const InsuranceResultPreview = ({ route : { params : { id , valueStore , flattedStage : selectedInsData , carCategory } } , navigation }) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [responseValues, setResponseValues] = useState({});
    const appendStyle = useStyle(style);

    const [reqId, setReqId] = useState('');

    const fetcher = useFetch(true);

    useEffect(() => {
        fetcher
            .then(({ api , appToken }) => {
                api.post('GetInsuranceQuoteId' , { formData : JSON.stringify({ ...valueStore , Id : id }) } , { headers : {appToken} })
                    .then(({ data }) =>  data)
                    .then(receivedId => {
                        api.post('GetInsuranceQuotes' , { formulaId : receivedId} , { headers : {appToken}})
                            .then(({ data }) => {
                                setResponseValues(data);
                                setReqId(receivedId);
                                setInitialLoading(false);
                            })
                    });
            })
        return () => {
            // with this state change , we force entire component get re render and all new params and send new request
            setInitialLoading(true);
        }
    } , [valueStore]);
    
    
    const quickEditHandler = () => {
        navigation.push('insuranceQuickEdit' ,{ server :  responseValues.insuranceQuotes.factorItems , valueStore , selectedInsData , id , carCategory })
    }

    return initialLoading ? <Loading /> : (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <TouchableOpacity onPress={quickEditHandler} style={appendStyle.editContainer}>
                    <Feather name="edit-2" size={30} color="white" />   
                </TouchableOpacity>
                <View>
                        <Para>نتایج جستجو در : </Para>
                        <Para weight="bold" size={20}>{responseValues?.insuranceQuotes?.addInsCoAmountV2[0].catFullName}</Para>
                </View>
            </View>
            {
                responseValues?.insuranceQuotes?.addInsCoAmountV2?.length ? (<ScrollView >
                {
                    responseValues?.insuranceQuotes?.addInsCoAmountV2?.map((el , i) => (
                        <InsuranceResultPreviewItem
                                reqId={reqId}
                                installmentList={responseValues.installmetFormouls}
                                factorItems={responseValues.insuranceQuotes.factorItems} 
                                {...el}
                                key={i} />
                    ))
                }
                </ScrollView> ) : <EmptyState
                    actionHandler={() => navigation.push('home')}
                    title="نتیجه ای یافت نشد:(" 
                    desc="نتیجه ای برای این استعلام حاصل نشد . مجددا تلاش نمایید." 
                    ctaText="بازگشت"/>
            } 
                
           
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1
    },
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
        padding: 12
    }
})

export default InsuranceResultPreview;
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import Para from "./Para";
import InsuranceResultPreviewItem from './InsuranceResultPreviewItem';

import api from "../api";
import {useStyle} from "../Hooks/useStyle"

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

const InsuranceResultPreview = ({ route : { params : { id , valueStore , flattedStage : selectedInsData } } , navigation }) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [responseValues, setResponseValues] = useState({});
    const appendStyle = useStyle(style);
    useEffect(() => {
        api.post('GetInsuranceQuoteId' , { formData : JSON.stringify({ ...valueStore , Id : id }) })
            .then(({ data }) =>  data)
            .then(id => {
                api.post('GetInsuranceQuotes' , { formulaId : `${id}` })
                    .then(({ data }) => {
                        setResponseValues(data);
                        setInitialLoading(false)
                    })
            })
    return () => {
        // with this state change , we force entire component get re render and all new params and send new request
        setInitialLoading(true)
    }
    } , [valueStore]);
    
    const quickEditHandler = () => {
        navigation.push('insuranceQuickEdit' ,{ server :  responseValues.insuranceQuotes.factorItems , valueStore , selectedInsData , id })
    }
    
    return initialLoading ? <Para>loading</Para> : (
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
            <ScrollView >
            {
                responseValues?.insuranceQuotes?.addInsCoAmountV2?.map((el , i) => (
                    <InsuranceResultPreviewItem {...el} key={i} />
                ))
            }
            </ScrollView>
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
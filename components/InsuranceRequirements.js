import React, { useEffect, useState } from 'react';
import ScreenWrapper from './ScreenWrapper';

import TabScreenHeader from "./TabScreenHeader";

import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import RequirementDocument from './RequirementDocument';
import FurtherInfo from './FurtherInfo';
import InsurerDetails from './InsurerDetails';
import InsTransferee from './InsTransferee';
import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

import useFetch from '../Providers/useFetch';

import config from '../config';

import { useSelector } from "../Store/Y-state";

const InsuranceRequirements = ({ route : { params } , navigation }) => {
    const [loading, setLoading] = useState(true);

    const [staticStore, setStaticStore] = useState({});
    const [dynamicStore, setDynamicStore] = useState({});
    const [docItems, setDocItems] = useState({});

    const privateKey = useSelector(state => state.auth.appKey);


    const fetcher = useFetch(true);

    // const privateKey = useSelector(state => state.auth.appKey)
    

    useEffect(() => {
        fetcher
            .then(({ api , appToken }) => {
                return api.post(`AddFactor` , {
                        InstallmentId : params.installmentId , 
                        formulaId : params.factorId, 
                        requestId : params.reqId
                    } , { headers : {appToken , ticket : privateKey , packageName : config.packageName} })
                    .then(({data}) => {
                        setDocItems(data);
                        setLoading(false)
                    }).catch(err => {
                        console.log(err);
                    })
            }).catch(err => {
                console.log(err)
            })
    } , [])


    const appendStyle = useStyle(style)
    
    const goToPaymentHandler = () => {
        console.log(staticStore , "-*");
        fetcher
            .then(({ api , appToken }) => {
                api.post("GetRequirements" , { ...staticStore , factorId : params.factorId , request : JSON.stringify(dynamicStore) } ,{ headers : { appToken, ticket: privateKey }})
                        .then(data => {
                        console.log(data , "DONR");
                })
            })
        // api.post("InsurancePay" , {
        //     ...staticStore,
        //     request : JSON.stringify(dynamicStore),
        //     factorId : params.factorId
        // })
        // .then(({ data : { data : { id } } }) => {
        // })
        // let mockId = params.factorId
        // navigation.navigate('insurancePayment' , { mockId });
    }

    useEffect(() => {
        console.log('!!!!!!!!!!!!!', staticStore);
    } , [staticStore])


    return loading ? <Para>loadimng</Para> : <ScreenWrapper>
    <TabScreenHeader navigation={navigation} title="تکمیل مشخصات" extendStyle={{  }} />
        <ScrollView contentContainerStyle={{ paddingBottom : 20 }}>
            <RequirementDocument 
                onChange={setDynamicStore} 
                items={docItems.requierds.filter(el => el.typeImage)} />
            <FurtherInfo
                valueStore={dynamicStore}
                onChange={setDynamicStore}
                items={docItems.requierds.filter(el => !el.typeImage)} />
            <InsurerDetails
                store={staticStore}
                onChange={setStaticStore}
            />
            <InsTransferee
                onChange={setStaticStore}
                store={staticStore}
            />
        </ScrollView>
        <TouchableOpacity onPress={goToPaymentHandler} style={appendStyle.ctaContainer}>
            <Para weight="bold" align="center">ثبت اطلاعات و پرداخت</Para>
        </TouchableOpacity>
</ScreenWrapper>
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    header : {

    },
    ctaContainer  : {
        padding : 15,
        backgroundColor : generateColor(primary , 9),
        borderRadius : baseBorderRadius,
        width: "90%",
        marginHorizontal : "5%",
    }
})

export default InsuranceRequirements;
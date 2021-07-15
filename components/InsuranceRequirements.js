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
import Loading from './Loading';

// !Important add money info section latter on
// TODO add input validation

const InsuranceRequirements = ({ route : { params } , navigation }) => {
    const [loading, setLoading] = useState(true);

    const [staticStore, setStaticStore] = useState({});
    const [dynamicStore, setDynamicStore] = useState({});
    const [docItems, setDocItems] = useState({});

    const privateKey = useSelector(state => state.auth.appKey);


    const fetcher = useFetch(true);

    useEffect(() => {
        fetcher
        .then(({ api , appToken }) => {
            return api.post(`AddFactor` , {
                        InstallmentId : params.installmentId , 
                        formulaId : params.factorId, 
                        requestId : params.reqId
                    } , { headers : {appToken , ticket : privateKey , packageName : config.packageName} })
                    .then(({ data }) => {
                        setDocItems(data);
                        console.log('received' , data);
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
        const sendObject = {
            ...staticStore ,
            factorId : docItems.factorCode ,
            request : JSON.stringify(dynamicStore)
        };
        
        console.log(params.factorId , docItems.factorCode , "```````````````````");
        console.log('endResultObject' , sendObject);
        console.log('endResultObjectJson' , JSON.stringify(sendObject));
        
        fetcher
            .then(({ api , appToken }) => {
                api
                    .post(`${config.serverPath}/MobileApi/GetRequirements` ,
                            { ...sendObject } ,
                            { headers : {appToken , ticket : privateKey , packageName : config.packageName} })
                        .then(data => { 
                        console.log(data , "DONR") })
                    .catch(err => {
                        console.log('mf err' , err);
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



return loading ? <Loading /> : <ScreenWrapper>
    <TabScreenHeader navigation={navigation} title="تکمیل مشخصات" extendStyle={{  }} />
        <ScrollView contentContainerStyle={{ paddingBottom : 20 }}>
            <RequirementDocument 
                onChange={setDynamicStore} 
                items={docItems.requierds?.filter(el => el.typeImage)} />
            {
                docItems.requierds?.filter(el => !el.typeImage).length ? <FurtherInfo
                valueStore={dynamicStore}
                onChange={setDynamicStore}
                items={docItems.requierds.filter(el => !el.typeImage)} /> : null
            }
            
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
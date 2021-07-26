import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';

import TabScreenHeader from "../components/TabScreenHeader";

import { Alert, Keyboard, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import RequirementDocument from '../components/RequirementDocument';
import FurtherInfo from '../components/FurtherInfo';
import InsurerDetails from '../components/InsurerDetails';
import InsTransferee from '../components/InsTransferee';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

import useFetch from '../Providers/useFetch';

import config from '../config';

import { useSelector } from "../Store/Y-state";
import Loading from '../components/Loading';
import client from '../client';

// !Important add money info section latter on

const InsuranceRequirements = ({ route : { params } , navigation }) => {
    const [loading, setLoading] = useState(true);

    const [staticStore, setStaticStore] = useState({});
    const [dynamicStore, setDynamicStore] = useState({});
    const [docItems, setDocItems] = useState({});

    const [areas, setAreas] = useState([]);

    const [inInsRecord, setInInsRecord] = useState(false);


    const [error, setError] = useState(null);


    const ticket = useSelector(state => state.auth.appKey);


    const fetcher = useFetch(true);

    useEffect(() => {
        fetcher()
        .then(({ api , appToken }) => {
            return api.post(`AddFactor` , {
                        InstallmentId : params.installmentId , 
                        formulaId : params.factorId, 
                        requestId : params.reqId
                    } , { headers : {appToken , ticket } })
                    .then(({ data }) => {
                        setDocItems(data);
                        setAreas(data.areas);
                        setLoading(false)
                    }).catch(err => {
                        console.log(err , 'err');
                    })
            }).catch(err => {
            })
    } , [])


    const appendStyle = useStyle(style)
    
    
    
    const truthyValidation = () => {
        let wasAnyError = false;
        const singleSourceStore = {
            ...staticStore,
            ...dynamicStore
        }

        Object.entries(singleSourceStore).map(([_ , value]) => {
            if(!value) wasAnyError = true;
        })
        
        
        if(wasAnyError) {
            Alert.alert(client.static.REQUIREMENT_FIELD_ERROR_MESSAGE , client.static.REQUIREMENT_FIELD_ERROR_MESSAGE_DESC , [
                {
                    onPress(){},
                    text : "تایید",
                }
            ]);
            return true
        }else return false;
    }


    
    const goToPaymentHandler = () => {
        Keyboard.dismiss();
        if(truthyValidation()) return;
        const sendObject = {
            ...staticStore ,
            factorId : docItems.factorCode ,
            request : JSON.stringify(dynamicStore)
        };
        setInInsRecord(true);
            fetcher()
            .then(({ api , appToken }) => {
                api.post("GetRequirements" , { ...sendObject } ,{ headers : {appToken , ticket  } })
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
                        })
                    .catch(err => {
                        setError(err)
                    })
            })
    }


    return loading ? <Loading /> : <ScreenWrapper>
    <TabScreenHeader navigation={navigation} title="تکمیل مشخصات" extendStyle={{  }} />
        <ScrollView contentContainerStyle={{ paddingBottom : 20 }}>
            {
                docItems.requierds?.filter(el => el.typeImage).length ? 
                <RequirementDocument 
                    onChange={setDynamicStore} 
                    items={docItems.requierds?.filter(el => el.typeImage)} /> : null    

            }
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
                areas={areas}
                onChange={setStaticStore}
                store={staticStore}
            />
        </ScrollView>
        <TouchableOpacity disabled={inInsRecord} onPress={goToPaymentHandler} style={[appendStyle.ctaContainer , inInsRecord ? appendStyle.inInsRecord : {}]}>
            <Para size={16} weight="bold" align="center">{
                !inInsRecord ? "ثبت اطلاعات و پرداخت" : "در حال ثبت بیمه..."
            }</Para>
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
    },
    inInsRecord : {
        opacity: .5
    }
})

export default InsuranceRequirements;
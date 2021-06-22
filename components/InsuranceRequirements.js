import React, { useState } from 'react';
import ScreenWrapper from './ScreenWrapper';

import TabScreenHeader from "./TabScreenHeader";

import mock from "../utils/mock.fuck";
import { Appearance, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import RequirementDocument from './RequirementDocument';
import FurtherInfo from './FurtherInfo';
import InsurerDetails from './InsurerDetails';
import InsTransferee from './InsTransferee';
import Para from './Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

import api from "../api";

const InsuranceRequirements = ({ route : { params } , navigation }) => {

    const [staticStore, setStaticStore] = useState({});
    const [dynamicStore, setDynamicStore] = useState({});

    const appendStyle = useStyle(style)
    
    const goToPaymentHandler = () => {
        // api.post("" , {
        //     ...staticStore,
        //     request : JSON.stringify(dynamicStore),
        //     factorId : params.factorId
        // })
        // .then(({ data : { data : { id } } }) => {
        // })
        let mockId = params.factorId
        navigation.navigate('insurancePayment' , { mockId });
    }

    return (
        <ScreenWrapper>
            <TabScreenHeader navigation={navigation} title="تکمیل مشخصات" extendStyle={{  }} />
                <ScrollView contentContainerStyle={{ paddingBottom : 20 }}>
                    <RequirementDocument 
                        onChange={setDynamicStore} 
                        items={mock.requierds.filter(el => el.typeImage)} />
                    <FurtherInfo
                        valueStore={dynamicStore}
                        onChange={setDynamicStore}
                        items={mock.requierds.filter(el => !el.typeImage)} />
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
    )
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
import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

import api from '../api';
import InstallmentItem from '../components/InstallmentItem';
import Para from '../components/Para';

import TabScreenHeader from '../components/TabScreenHeader';

import ScreenWrapper from "../components/ScreenWrapper";
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

const Installment = ({ route : { params : { factorId , reqId , installment_Value} } , navigation }) => {
    const [installment, setInstallment] = useState({});
    const [loading, setLoading] = useState(true);
    
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    useEffect(() => {
        api.post("getInsstallments" , { formulaId : factorId , requestId : reqId })
            .then(({ data }) => {
                setInstallment(data);
                setLoading(true);
            })
    } , []);


    const navigateToRequirementHandler = (id) => {
        navigation.push("insuranceRequirements" , { factorId , reqId , installmentId: id })
    }

    return (
        <ScreenWrapper>
            <TabScreenHeader 
                navigation={navigation} 
                title="انتخاب طرح قسطی" 
                extendStyle={{ backgroundColor : generateColor(primary , 6) , marginBottom : 20 }} />
            {
                loading ? 
                <ScrollView>
                    {
                        installment
                        ?.installmentData
                        ?.map((el , i) => <InstallmentItem
                                            onSelect={navigateToRequirementHandler}
                                            isLastItem={i === installment?.installmentData.length - 1}
                                            key={i} 
                                            details={el.details} 
                                            title={el.title} 
                                            insuranceInstallmentPrice={installment_Value}
                                            {...el} />)
                    }
                </ScrollView>
                : <Para>loading</Para>
            }
        </ScreenWrapper>
    )
}


const style = () => StyleSheet.create({
    container : {

    },
    header : {
        marginTop : StatusBar.currentHeight + 10 
    }
})


export default Installment;
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import api from '../api';
import Para from '../components/Para';

import ScreenWrapper from "../components/ScreenWrapper";

const Installment = ({ route : { params : { installmentId , reqId } } , navigation }) => {
    const [installment, setInstallment] = useState({});
    
    useEffect(() => {
        api.post("getInsstallments" , { formulaId : installmentId , requestId : 22671 })
            .then(({ data }) => {
                console.log(data , 'data');
            })
    } , [])
    return (
        <ScreenWrapper>
            <Para>500</Para>
        </ScreenWrapper>
    )
}


const style = () => StyleSheet.create({
    container : {

    }
})


export default Installment;
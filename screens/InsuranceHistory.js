import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ScreenHeader from '../components/ScreenHeader';
import InsuranceHistoryDirectory from '../components/InsuranceHistoryDirectory';
import ScreenWrapper from "../components/ScreenWrapper";


import { historyList } from "../utils/mockHis";
import InsuranceHistoryDetails from '../components/InsuranceHistoryDetails';
import InsuranceHistoryImages from './InsuranceHistoryImages';
import { useSelector } from '../Store/Y-state';
import Loading from '../components/Loading';


const Stack = createStackNavigator();

const Home = () => {
    const completelyLoaded = useSelector(state => state.initial.completelyLoaded);
    const insHistoryList = useSelector(state => state.initial?.userData?.insuranceCart?.customModel);

    if(!completelyLoaded) return <Loading />
    else return (
        <>
            <ScreenHeader title="بیمه نامه " />
            <InsuranceHistoryDirectory item={insHistoryList} />
        </>
    )
}

const InsuranceHistory = () => (
    <ScreenWrapper>
        <Stack.Navigator screenOptions={{ headerShown : false }}>
            <Stack.Screen name="insuranceHistoryList" component={Home} />
            <Stack.Screen name="insuranceHistoryDetails" component={InsuranceHistoryDetails} />
            <Stack.Screen name="insuranceHistoryImages" component={InsuranceHistoryImages} />
        </Stack.Navigator>
    </ScreenWrapper>
)


export default InsuranceHistory;
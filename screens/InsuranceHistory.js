import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ScreenHeader from '../components/ScreenHeader';
import InsuranceHistoryDirectory from '../components/InsuranceHistoryDirectory';
import ScreenWrapper from "../components/ScreenWrapper";


import { historyList } from "../utils/mockHis";
import InsuranceHistoryDetails from '../components/InsuranceHistoryDetails';
import InsuranceHistoryImages from './InsuranceHistoryImages';


const Stack = createStackNavigator();

const Home = () => (
    <>
        <ScreenHeader title="بیمه نامه " />
        <InsuranceHistoryDirectory item={historyList} />
    </>
)

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
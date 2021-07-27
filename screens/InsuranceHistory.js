import React, { useEffect, useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import ScreenHeader from '../components/ScreenHeader';
import InsuranceHistoryDirectory from '../components/InsuranceHistoryDirectory';
import ScreenWrapper from "../components/ScreenWrapper";


import InsuranceHistoryDetails from './InsuranceHistoryDetails';
import InsuranceHistoryImages from './InsuranceHistoryImages';
import { useSelector } from '../Store/Y-state';
import Loading from '../components/Loading';
import useFetch from '../Providers/useFetch';


const Stack = createStackNavigator();

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [insItems, setInsItems] = useState([]);

    const navHash = useSelector(state => state.navigation.navigationHash)

    const fetcher = useFetch()
    
    useEffect(() => {
        setLoading(true);
        fetcher("UserInsurance")
            .then(({ data }) => {
                setInsItems(data);
                setLoading(false);
            })
    } , [navHash])


    if(loading) return <Loading />
    return (
        <>
            <ScreenHeader title="بیمه نامه " />
            <InsuranceHistoryDirectory items={insItems} />
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
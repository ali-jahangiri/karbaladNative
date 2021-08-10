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
import { useIsFocused } from '@react-navigation/native';
import RefreshAlert from '../components/RefreshAlert';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';


const Stack = createStackNavigator();

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [insItems, setInsItems] = useState([]);
    const [refresh, setRefresh] = useState(false);


    const navHash = useSelector(state => state.navigation.navigationHash)
    const fetcher = useFetch()
    const isFocused = useIsFocused()
    

    const dataFetcherInstance = () => {
        return fetcher("UserInsurance")
                .then(({ data }) => {
                    setInsItems(data);
                })
    }

    useEffect(() => {
        if(loading) {
            dataFetcherInstance()
                .then(_ => setLoading(false));
        }else {
            dataFetcherInstance()
                .then(_ => {
                    setRefresh(true);
                    let timer = setTimeout(() => {
                        setRefresh(false);
                        clearTimeout(timer)
                    } , 2500)
                })
        }
    } , [navHash , isFocused])


    if(loading) return <Loading />
    return (
        <>
            <HeaderProvider title="بیمه نامه" />
            <DirectionProvider>
                <InsuranceHistoryDirectory items={insItems} />
            </DirectionProvider>
            {
                refresh ? <RefreshAlert /> : null
            }
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
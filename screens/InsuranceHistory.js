import React from 'react';
import { ScrollView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack";

import ScreenWrapper from "../components/ScreenWrapper";
import InsuranceHistoryDetails from './InsuranceHistoryDetails';
import InsuranceHistoryImages from './InsuranceHistoryImages';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';
import client from '../client';
import useScreenDynamic from '../Hooks/useScreenDynamic/useScreenDynamic';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';



const Stack = createStackNavigator();

const Home = () => {
    const [screenDetailsLoading , screenDetails , screenDetailsExtractor] = useScreenDynamic(client.static.ROUTES_GUID.myInsurance);
    
    return (
        <React.Fragment>
            <HeaderProvider title={!screenDetailsLoading ?screenDetailsExtractor("data" , "pageTitle").value : ""} />
            <DirectionProvider>
                <ScrollView>
                    {
                        !screenDetailsLoading && <ComponentGenerator ownerProps={{ haveNestedComponents : !!screenDetails.components.length }} itemListForRender={screenDetails.components} />
                    }
                </ScrollView>
            </DirectionProvider>
        </React.Fragment>
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
import React from 'react';
import { View } from 'react-native';


import ScreenHeader from '../components/ScreenHeader';
import InsuranceDirectory from '../components/InsuranceDirectory';

// TODO remove mock data

import mock from "../utils/mockIns" 

import TabScreenHeader from '../components/TabScreenHeader';
import HomeInsRouter from '../Router/HomeInsRouter';

const InsIndexScreen = ({ navigation }) => {
    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);

    return (
        <View style={{flex : 1}}>
            <ScreenHeader title="خانه" />
            <InsuranceDirectory handler={routeChangeHandler} items={mock} />
        </View>
    )
}


const NestedInsStepScreen = ({ route : { params : { cat , name } }, navigation }) => {
    
    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);   
    
    return (
        <View style={{flex : 1}}>
            <TabScreenHeader title={name} navigation={navigation} />
            {
                <InsuranceDirectory handler={routeChangeHandler} items={cat} />
            }
        </View>
    )
}

const Home = () => <HomeInsRouter 
                        indexScreen={InsIndexScreen} 
                        nestedScreen={NestedInsStepScreen}  />


export default Home;
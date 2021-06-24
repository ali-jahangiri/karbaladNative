import React from 'react';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../Hooks/useStyle';
import { Home , Wallet , Profile ,InsuranceHistory } from "../screens"

import TabBarItem from "./TabBarItem";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    const { primary } = useStyle();
    return (
        <Tab.Navigator tabBarOptions={{ showLabel : false , activeTintColor : primary , style : { borderWidth : 0 , borderTopColor : "transparent" , height: 70 , elevation : 0  , flexDirection : "row" , justifyContent : 'space-between' } , tabStyle : {backgroundColor : 'transparent' ,elevation : 0 }}}>
            <Tab.Screen 
                name="home" 
                component={Home}
                options={{ tabBarButton : props => <TabBarItem {...props} /> , tabBarIcon : ({ color , size }) =>  <Feather name="home" color={color} size={size} /> }} />
            <Tab.Screen 
                name="insurance" 
                component={InsuranceHistory}
                options={{ tabBarButton : props => <TabBarItem {...props} /> , tabBarIcon : ({ color , size }) =>  <Feather name="file" color={color} size={size} /> }} />
            <Tab.Screen 
                name="wallet" 
                component={Wallet}
                options={{ tabBarButton : props => <TabBarItem {...props} /> , tabBarIcon : ({ color , size }) =>  <Feather name="credit-card" color={color} size={size} /> }} />
            <Tab.Screen 
                name="profile" 
                component={Profile}
                options={{ tabBarButton : props => <TabBarItem {...props} /> , tabBarIcon : ({ color , size }) =>  <Feather name="user" color={color} size={size} /> }} />
        </Tab.Navigator>
    )
}




export default TabNavigation;
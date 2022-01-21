import React from 'react';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../Hooks/useStyle';
import { Home , Wallet , Profile ,InsuranceHistory } from "../screens"

import TabBarItem from "./TabBarItem";
import { useSelector } from '../Store/Y-state';
import useData from '../Hooks/useData/useData';

const Tab = createBottomTabNavigator();

const DEFAULTS_SETUP = {
    home : {
        component : Home,
        icon : "home" 
    },
    insurance : {
        component : InsuranceHistory,
        icon : "file"
    },
    wallet : {
        component : Wallet,
        icon : "credit-card"
    },
    profile : {
        component : Profile,
        icon : "user"
    },
}

const TabNavigation = () => {
    const { primary } = useStyle();
    const data = useData()
    const tabBarBgColor = useSelector(state => state.ui.tabBarBgColor);

    return (
        <Tab.Navigator tabBarOptions={{ showLabel : false , activeTintColor : primary , style : { borderWidth : 0 , borderTopColor : "transparent" , height: 70 , elevation : 0  , flexDirection : "row" , justifyContent : 'space-between' , backgroundColor : tabBarBgColor} , tabStyle : {backgroundColor : 'red' ,elevation : 0 }}}>
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
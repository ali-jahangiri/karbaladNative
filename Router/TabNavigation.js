import React from 'react';
import { createBottomTabNavigator  } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';

import { useStyle } from '../Hooks/useStyle';
import { Home , Wallet , Profile ,InsuranceHistory, GhostScreen } from "../screens"

import TabBarItem from "./TabBarItem";
import { useSelector } from '../Store/Y-state';
import useData from '../Hooks/useData/useData';
import { Image } from 'react-native';
import { booleanExtractor, imageFinder } from '../utils';

const Tab = createBottomTabNavigator();

export const DEFAULTS_SETUP = [
    {
        component : InsuranceHistory,
        icon : "file",
        staticName : "بیمه_نامه_ها",
        routeName : "insurance",
        title : "بیمه نامه"
    },
    {
        component : Wallet,
        icon : "credit-card",
        staticName : "کیف_پول",
        routeName : "wallet",
        title : "کیف پول"
    },
    {
        component : Profile,
        icon : "user",
        staticName : "پروفایل",
        routeName : "profile",
        title : "پروفایل"
    },
]

const TabNavigation = () => {
    const { showTitle , iconSize } = useStyle();
    const { menu , homeIcon } = useData();
    
    const tabBarBgColor = useSelector(state => state.ui.tabBarBgColor);

    return (
        <Tab.Navigator tabBarOptions={{ showLabel : false , style : { borderWidth : 0 , borderTopColor : "transparent" , height: 70 , elevation : 0  , flexDirection : "row" , justifyContent : 'space-between' , backgroundColor : tabBarBgColor} , tabStyle : {backgroundColor : 'red' ,elevation : 0 }}}>
            <Tab.Screen 
                name="home" 
                component={Home}
                options={{ tabBarButton : props => <TabBarItem title={booleanExtractor(showTitle) ? "خانه" : ""} {...props} /> , tabBarIcon : ({ color , size }) =>  !homeIcon ? <Feather name="home" color={color} size={size} /> : <Image resizeMode='contain' source={{ uri : imageFinder(homeIcon) , width : iconSize , height : iconSize }} />}} />
                {
                
                    menu.map((menuItem , index) => (() => {
                        const haveStaticDefinition = DEFAULTS_SETUP.find(defaultMenu => defaultMenu.staticName === menuItem.Link || defaultMenu.staticName === menuItem.Name);
                        const WrappedGhostScreen = ({ ...rest }) => <GhostScreen guid={menuItem.Link} routeName={menuItem.Name} {...rest} />;

                        return <Tab.Screen
                                    key={index}
                                    name={haveStaticDefinition ? haveStaticDefinition.routeName : "Ghost"}
                                    component={haveStaticDefinition ? haveStaticDefinition.component : WrappedGhostScreen}
                                    options={{ tabBarButton : props => <TabBarItem title={booleanExtractor(showTitle) && (haveStaticDefinition ? haveStaticDefinition.title : menuItem.Name)} {...props} /> , tabBarIcon : () => <Image resizeMode='contain' source={{ uri : imageFinder(menuItem.IconName) , width : iconSize , height : iconSize }} /> }} />
                    })())
                }
        </Tab.Navigator>
    )
}




export default TabNavigation;
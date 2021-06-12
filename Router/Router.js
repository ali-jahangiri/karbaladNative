import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

import TabNavigation from "./TabNavigation";
import navigationTheme from './navigationTheme';

const Router = () => (
    <NavigationContainer theme={navigationTheme}>
            <TabNavigation />
    </NavigationContainer>
)

export default Router;
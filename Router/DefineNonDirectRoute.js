import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import useData from "../Hooks/useData/useData";
import { DEFAULTS_SETUP } from "./TabNavigation";

const Stack = createStackNavigator();

const DefineNonDirectRoute = () => {
    const { menu } = useData();
    return (
        <Stack.Navigator>
            
        </Stack.Navigator>
    )
}


export default DefineNonDirectRoute;
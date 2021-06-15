import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeInsRouter = ({ indexScreen , nestedScreen , resultPreview }) => {
    return (
        <React.Fragment>
            <Stack.Navigator mode="card" screenOptions={{ headerShown : false }}>
                <Stack.Screen name="home" component={indexScreen} />
                <Stack.Screen name="stepScreen" component={nestedScreen} />
                <Stack.Screen name="insuranceResultPreview" component={resultPreview} />
            </Stack.Navigator>
        </React.Fragment>
    )
}


export default HomeInsRouter;
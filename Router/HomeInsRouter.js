import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const HomeInsRouter = ({ indexScreen , nestedScreen }) => {
    return (
        <>
            <Stack.Navigator mode="card" screenOptions={{ headerShown : false }}>
                <Stack.Screen name="home" component={indexScreen} />
                <Stack.Screen name="stepScreen" component={nestedScreen} />
            </Stack.Navigator>
        </>
    )
}


export default HomeInsRouter;
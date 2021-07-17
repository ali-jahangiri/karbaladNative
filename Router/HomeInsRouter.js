import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

const HomeInsRouter = ({ indexScreen , nestedScreen , resultPreview , resultConfirm , quickEdit , installment , requirement , payment , paymentMoreDetails , requirementConfirm}) => {
    return (
        <React.Fragment>
            <Stack.Navigator screenOptions={{ headerShown : false }}>
                <Stack.Screen name="home" component={indexScreen} />
                <Stack.Screen name="stepScreen" component={nestedScreen} />
                <Stack.Screen name="insuranceResultPreview" component={resultPreview} />
                <Stack.Screen name="insuranceQuickEdit" component={quickEdit} />
                <Stack.Screen name="insuranceConfirm" component={resultConfirm} />
                <Stack.Screen name="insuranceInstallment" component={installment} />
                <Stack.Screen name="insuranceRequirements" component={requirement} />
                <Stack.Screen name="insurancePayment" component={payment} />
                <Stack.Screen name="insurancePaymentMoreDetails" component={paymentMoreDetails} />
                <Stack.Screen name="insuranceRequirementConfirm" component={requirementConfirm} />
            </Stack.Navigator>
        </React.Fragment>
    )
}


export default HomeInsRouter;
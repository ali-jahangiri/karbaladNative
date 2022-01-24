import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import InsuranceResultPreview from '../screens/InsuranceResultPreview';
import InsuranceConfirm from '../screens/InsuranceConfirm';
import InsuranceQuickEdit from '../screens/InsuranceQuickEdit';
import Installment from '../screens/Installment';
import InsuranceRequirements from '../screens/InsuranceRequirements';
import InsurancePay from '../screens/InsurancePay';
import MoreDetailsPay from '../screens/MoreDetailsPay';
import Playground from '../screens/Playground';
import InsuranceStepper from '../screens/InsuranceStepper';
import AllCategoryFlatted from '../screens/AllCategoryFlatted';
import useData from '../Hooks/useData/useData';
import { DEFAULTS_SETUP } from './TabNavigation';

const Stack = createStackNavigator();

const HomeInsRouter = ({ indexScreen , nestedScreen }) => {
    const { menu } = useData()

    return (
        <React.Fragment>
            <Stack.Navigator screenOptions={{ headerShown : false }}>
                <Stack.Screen name="home" component={indexScreen} />
                {
                    DEFAULTS_SETUP.filter(defaultMenuItem => !menu.find(el => el.Link === defaultMenuItem.staticName)).map((screen , index) => (
                        <Stack.Screen key={index} component={screen.component} name={screen.routeName} />
                    ))
                }
                <Stack.Screen name="allFlattedCategory" component={AllCategoryFlatted} />
                <Stack.Screen name="insStepper" component={InsuranceStepper} />
                <Stack.Screen name="stepScreen" component={nestedScreen} />
                <Stack.Screen name="insuranceResultPreview" component={InsuranceResultPreview} />
                <Stack.Screen name="insuranceQuickEdit" component={InsuranceQuickEdit} />
                <Stack.Screen name="insuranceConfirm" component={InsuranceConfirm} />
                <Stack.Screen name="insuranceInstallment" component={Installment} />
                <Stack.Screen name="insuranceRequirements" component={InsuranceRequirements} />
                <Stack.Screen name="insurancePayment" component={InsurancePay} />
                <Stack.Screen name="insurancePaymentMoreDetails" component={MoreDetailsPay} />
                <Stack.Screen name="playground" component={Playground} />
            </Stack.Navigator>
    </React.Fragment>
    )
}

export default HomeInsRouter;
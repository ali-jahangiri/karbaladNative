import React, { useEffect } from 'react';

import ScreenHeader from '../components/ScreenHeader';
import InsuranceDirectory from '../components/InsuranceDirectory';


import TabScreenHeader from '../components/TabScreenHeader';
import HomeInsRouter from '../Router/HomeInsRouter';
import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';
import InsuranceResultPreview from '../components/InsuranceResultPreview';
import InsuranceConfirm from '../components/InsuranceConfirm';
import InsuranceQuickEdit from '../components/InsuranceQuickEdit';
import Installment from './Installment';
import InsuranceRequirements from '../components/InsuranceRequirements';
import InsurancePay from '../components/InsurancePay';
import MoreDetailsPay from '../components/MoreDetailsPay';
import { useDispatch, useSelector } from '../Store/Y-state';
import useFetch from '../Providers/useFetch';
import { setUserData, setWasCompletelyLoaded } from '../Store/Slices/initialSlice';
import CommutingProvider from '../Providers/CommutingProvider';
import { Button } from 'react-native';
import { persister } from '../utils';


const InsIndexScreen = ({ navigation }) => {
    const catItems = useSelector(state => state.initial.insCat);
    const fetcher = useFetch(true);
    const ticket = useSelector(state => state.auth.appKey);
    const storeDispatcher = useDispatch();

    const commutingHash = useSelector(state => state.navigation.navigationHash);


    useEffect(() => {
        storeDispatcher(() => setWasCompletelyLoaded(false));
        fetcher()
            .then(({ api , appToken }) => {
                console.log(appToken , "home");
                return api.post("userProfile" , {} , {
                    headers : {
                        ticket,
                        appToken
                    }
                }).then(({data}) => {
                    storeDispatcher(() => setUserData(data))
                    storeDispatcher(() => setWasCompletelyLoaded(true));
                }).catch(err => {
                    console.log(err  , 'shit');
                })
            })        
    } , [commutingHash])


    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);

    return (
        <ScreenWrapper>
            <ScreenHeader title="خانه" />
            <InsuranceDirectory handler={routeChangeHandler} items={catItems} />
            <Button title="clear" onPress={() => persister.remove("userPrivateKey")} />
        </ScreenWrapper>
    )
}


const NestedInsStepScreen = ({ route : { params : { cat , name , id } }, navigation }) => {
    
    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);   
        
    const renderChecker = () => {
        // don't have any sub item , therefore this is end stage of selection insurance category's
        if(!cat.length) return <InsuranceStepper name={name} id={id} />
        else return (
            <ScreenWrapper>
                <TabScreenHeader title={name} navigation={navigation} />
                {
                    <InsuranceDirectory handler={routeChangeHandler} items={cat} />
                }
            </ScreenWrapper>
        )
    }

    return renderChecker()
}

const Home = () => {
    return (
        <CommutingProvider>
            <HomeInsRouter
                        indexScreen={InsIndexScreen} 
                        nestedScreen={NestedInsStepScreen}
                        resultPreview={InsuranceResultPreview}
                        resultConfirm={InsuranceConfirm}
                        quickEdit={InsuranceQuickEdit}  
                        installment={Installment}
                        requirement={InsuranceRequirements}
                        payment={InsurancePay}
                        paymentMoreDetails={MoreDetailsPay}
                        />
        </CommutingProvider>
    )
}

export default Home;
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


const InsIndexScreen = ({ navigation }) => {
    const catItems = useSelector(state => state.initial.insCat);
    const fetcher = useFetch(true);
    const ticket = useSelector(state => state.auth.appKey);
    const storeDispatcher = useDispatch();

    useEffect(() => {
        fetcher
            .then(({ api , appToken }) => {
                api.post("userProfile" , {} , {
                    headers : {
                        ticket,
                        appToken
                    }
                }).then(({data}) => {
                    console.log(data);
                    storeDispatcher(() => setUserData(data))
                    storeDispatcher(() => setWasCompletelyLoaded())
                })
            })        
    } , [])


    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);

    return (
        <ScreenWrapper>
            <ScreenHeader title="خانه" />
            <InsuranceDirectory handler={routeChangeHandler} items={catItems} />
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

const Home = () => <HomeInsRouter
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

export default Home;
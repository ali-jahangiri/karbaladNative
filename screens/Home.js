import React, { useEffect } from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import TabHeaderBadge from '../components/ScreenHeader';
import InsuranceDirectory from '../components/InsuranceDirectory';
import TabScreenHeader from '../components/TabScreenHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import { useDispatch, useSelector } from '../Store/Y-state';
import useFetch from '../Providers/useFetch';
import { setUserData, setWasCompletelyLoaded } from '../Store/Slices/initialSlice';
import { Button } from 'react-native';
import { persister } from '../utils';

const InsIndexScreen = ({ navigation }) => {
    const catItems = useSelector(state => state.initial.insCat);
    const fetcher = useFetch(false);
    const storeDispatcher = useDispatch();

    const commutingHash = useSelector(state => state.navigation.navigationHash);


    useEffect(() => {
        storeDispatcher(() => setWasCompletelyLoaded(false));
        fetcher("userProfile" , {})
            .then(({ data }) => {
                storeDispatcher(() => setUserData(data))
                storeDispatcher(() => setWasCompletelyLoaded(true));
            })
    } , [commutingHash])


    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);

    return (
        <ScreenWrapper>
            <TabHeaderBadge title="خانه" />
            <InsuranceDirectory handler={routeChangeHandler} items={catItems} />
            <Button title="clear" onPress={() => persister.remove("userPrivateKey")} />
        </ScreenWrapper>
    )
}


const NestedInsStepScreen = ({ route : { params : { cat , name , id } }, navigation }) => {
    
    const routeChangeHandler = routeParameters => {
        navigation.push('stepScreen' , routeParameters);   
    }
        
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

const Home = () => (
    <HomeInsRouter indexScreen={InsIndexScreen} nestedScreen={NestedInsStepScreen}/>
)

export default Home;
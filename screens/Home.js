import React, { useEffect } from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import TabHeaderBadge from '../components/ScreenHeader';
import InsuranceDirectory from '../components/InsuranceDirectory';
import TabScreenHeader from '../components/TabScreenHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import { useSelector } from '../Store/Y-state';

const InsIndexScreen = ({ navigation }) => {
    const catItems = useSelector(state => state.initial);
    
    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);


    useEffect(() => {
        navigation.navigate("playground")
    } , [])

    return (
        <ScreenWrapper>
        <TabHeaderBadge title="خانه" />
            <InsuranceDirectory handler={routeChangeHandler} items={catItems} />
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
                <TabScreenHeader title={name} />
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
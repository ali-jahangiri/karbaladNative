import React from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import InsuranceDirectory from '../components/InsuranceDirectory';
import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import { useSelector } from '../Store/Y-state';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';
import CategoryProvider from '../Providers/CategoryProvider/CategoryProvider';


const InsIndexScreen = ({ navigation }) => {
    const catItems = useSelector(state => state.initial);
    
    const routeChangeHandler = routeParameters => 
        navigation.push('stepScreen' , routeParameters);


        return (
        <ScreenWrapper>
            <HeaderProvider title="خانه" />
            <DirectionProvider>
                <CategoryProvider handler={routeChangeHandler} items={catItems} />
            </DirectionProvider>
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
                <HeaderProvider title={name} isNested />
                <DirectionProvider >
                    <CategoryProvider items={cat} handler={routeChangeHandler} />
                </DirectionProvider>
            </ScreenWrapper>
        )
    }

    return renderChecker()
}

const Home = () => (
    <HomeInsRouter indexScreen={InsIndexScreen} nestedScreen={NestedInsStepScreen}/>
)

export default Home;
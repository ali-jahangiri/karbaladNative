import React from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';
import CategoryProvider from '../Providers/CategoryProvider/CategoryProvider';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';
import { ScrollView } from 'react-native';


const InsIndexScreen = () => (
    <ScreenWrapper>
        <HeaderProvider title="خانه" />
            <ScrollView>
                <DirectionProvider>
                    <ComponentGenerator />
                </DirectionProvider>
            </ScrollView>
    </ScreenWrapper>
)


const NestedInsStepScreen = ({ route : { params : { cat , name , id } }, navigation }) => {
    
   const renderChecker = () => {
        // don't have any sub item , therefore this is end stage of selection insurance category's
        if(!cat.length) return <InsuranceStepper name={name} id={id} />
        else return (
            <ScreenWrapper>
                <HeaderProvider title={name} isNested />
                <DirectionProvider >
                    <CategoryProvider passedNestedItems={cat} />
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
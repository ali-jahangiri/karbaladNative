import React from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';
import CategoryProvider from '../Providers/CategoryProvider/CategoryProvider';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';
import { Button, ScrollView } from 'react-native';

const InsIndexScreen = () => (
    <ScreenWrapper>
        {/* <HeaderProvider title="خانه" /> */}
            <ScrollView>
                {/* <DirectionProvider> */}
                    <ComponentGenerator />
                {/* </DirectionProvider> */}
            </ScrollView>
    </ScreenWrapper>
)


const NestedInsStepScreen = ({ route : { params : { cat , name , id } }}) => {
    
        // don't have any sub item , therefore this is end stage of selection insurance category's
        return !cat.length ? <InsuranceStepper route={{ params : { id , name } }} />
        : (
            <ScreenWrapper>
                {/* <HeaderProvider title={name} isNested /> */}
                {/* <DirectionProvider > */}
                    <CategoryProvider passedNestedItems={cat} />
                {/* </DirectionProvider> */}
            </ScreenWrapper>
        )
}

const Home = () => (
    <HomeInsRouter indexScreen={InsIndexScreen} nestedScreen={NestedInsStepScreen}/>
)

export default Home;
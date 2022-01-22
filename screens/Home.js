import React from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import CategoryProvider from '../Providers/CategoryProvider/CategoryProvider';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';
import { Image, ScrollView } from 'react-native';
import useData from '../Hooks/useData/useData';
import { imageFinder } from '../utils'
import HomeUserProfileBox from '../components/HomeUserProfileBox';


const InsIndexScreen = () => {
    const { businessIcon } = useData();
    const headerHomeIcon = businessIcon.slice(businessIcon.indexOf("/" , 1) + 1);
    
    return (
        <ScreenWrapper>
        <HeaderProvider isNested={<HomeUserProfileBox />} title={<Image resizeMode='contain' style={{ marginVertical : -15 }} source={{ uri : imageFinder(headerHomeIcon) , width : 50 , height : 50}} />} />
                <ScrollView>
                    <ComponentGenerator />
                </ScrollView>
        </ScreenWrapper>
    )
}


const NestedInsStepScreen = ({ route : { params : { cat , name , id } }}) => {
    
        // don't have any sub item , therefore this is end stage of selection insurance category's
        return !cat.length ? <InsuranceStepper route={{ params : { id , name } }} />
        : (
            <ScreenWrapper>
                <HeaderProvider title={name} isNested />
                <CategoryProvider passedNestedItems={cat} />
            </ScreenWrapper>
        )
}

const Home = () => (
    <HomeInsRouter indexScreen={InsIndexScreen} nestedScreen={NestedInsStepScreen}/>
)

export default Home;
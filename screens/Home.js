import React from 'react';

import HomeInsRouter from '../Router/HomeInsRouter';

import ScreenWrapper from '../components/ScreenWrapper';
import InsuranceStepper from './InsuranceStepper';

import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import CategoryProvider from '../Providers/CategoryProvider/CategoryProvider';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';
import { Image, ScrollView } from 'react-native';
import useData from '../Hooks/useData/useData';
import useStyle from "../Hooks/useStyle/useStyle"
import { imageFinder } from '../utils'
import HomeUserProfileBox from '../components/HomeUserProfileBox';


const InsIndexScreen = () => {
    const { brandIcon } = useData();
    const { headerBrandIconSize } = useStyle();

    return (
        <ScreenWrapper>
        <HeaderProvider 
            isNested={<HomeUserProfileBox />} 
            title={<Image resizeMode='contain' style={{ marginVertical : -15 }} source={{ uri : imageFinder(brandIcon) , width : headerBrandIconSize , height : headerBrandIconSize}} />}
        />
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
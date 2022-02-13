import React from 'react';
import CategoryRow from '../../components/CategoryRow/CategoryRow';
import { DynamicImage, DynamicText , DynamicSlider , CircleSlider, SliderLabeled, DirectInsurance } from '../../components/DynamicComponents';
import ImageGallery from '../../components/DynamicComponents/ImageGallery/ImageGallery';
import InsuranceDirectory from '../../components/InsuranceDirectory';
import { useSelector } from '../../Store/Y-state';

import { makeLeanComponentVariables } from "../../utils"
import MobileModalAlert from '../../components/ModalNotification';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import FAQ from '../../components/FAQ';
import ScrollableGridLayout from '../../components/ScrollableGridLayout/ScrollableGridLayout';
import DefaultMyInsurance from '../../components/DefaultMyInsurance';
import DefaultWallet from '../../components/DefaultWallet';
import DefaultResult from '../../components/DefaultResult';


const _dynamicElementComponent = ({...rest}) => ({
    MobileInsuranceCategoryBox : <InsuranceDirectory {...rest} />,
    MobileInsuranceCategoryRow : <CategoryRow {...rest} />,
    MobileInsuranceCategoryGrid : <CategoryGrid {...rest} />,
    MobileImage : <DynamicImage {...rest} />,
    MobileText : <DynamicText {...rest} />,
    MobileSlider : <DynamicSlider {...rest} />, 
    MobileCircleSlider : <CircleSlider {...rest} />,
    MobileSliderLabeled : <SliderLabeled {...rest} />,
    DirectInsurance : <DirectInsurance {...rest} />,
    MobileImageGallery : <ImageGallery {...rest} />,
    MobileFAQ : <FAQ {...rest} />,
    MobileAlert : <MobileModalAlert {...rest} />,
    ScrollableGridLayout : <ScrollableGridLayout {...rest} />,

    DefaultMyInsurance : <DefaultMyInsurance {...rest} />,
    DefaultWallet : <DefaultWallet {...rest} />,
    DefaultResult : <DefaultResult {...rest} />,
})

const ComponentGenerator = ({ itemListForRender , ownerProps = {} }) => {
    const dynamicComponentList = useSelector(state => state.dynamicComponent) || [];
    
    const componentListForRender = itemListForRender || dynamicComponentList;

    const dynamicComponentsProps = (element , index) => ({
        componentDatas : makeLeanComponentVariables(element.ComponentDatas),
        componentStyles : makeLeanComponentVariables(element.ComponentStyles),
        key : index,
        ...ownerProps,
    });

    return componentListForRender.map((el , i) => _dynamicElementComponent(dynamicComponentsProps(el , i))?.[el.Name])
}


export default ComponentGenerator;
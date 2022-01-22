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
    ScrollableGridLayout : <ScrollableGridLayout {...rest} />
})

const ComponentGenerator = ({ itemListForRender }) => {
    const dynamicComponentList = useSelector(state => state.dynamicComponent) || [];
    
    const componentListForRender = itemListForRender || dynamicComponentList;

    return componentListForRender.map((el , i) => _dynamicElementComponent({ componentDatas : makeLeanComponentVariables(el.ComponentDatas) , componentStyles : makeLeanComponentVariables(el.ComponentStyles) , key : i })?.[el.Name])
}


export default ComponentGenerator;
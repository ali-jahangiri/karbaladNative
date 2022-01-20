import React from 'react';
import CategoryRow from '../../components/CategoryRow/CategoryRow';
import { DynamicImage, DynamicText , DynamicSlider , CircleSlider, SliderLabeled, DirectInsurance } from '../../components/DynamicComponents';
import { BadgeHeader , NegativeHeader , ShallowHeader, FadeHeader , HeaderFullWidth , BoxHeader } from "../../components/Header"
import ImageGallery from '../../components/DynamicComponents/ImageGallery/ImageGallery';
import InsuranceDirectory from '../../components/InsuranceDirectory';
import { useSelector } from '../../Store/Y-state';

import { makeLeanComponentVariables } from "../../utils"
import MobileModalAlert from '../../components/ModalNotification';
import CategoryGrid from '../../components/CategoryGrid/CategoryGrid';
import FAQ from '../../components/FAQ';


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
    MobileAlert : <MobileModalAlert {...rest} />
})

const ComponentGenerator = () => {
    const dynamicComponentList = useSelector(state => state.dynamicComponent) || [];
    return dynamicComponentList.map((el , i) => _dynamicElementComponent({ componentDatas : makeLeanComponentVariables(el.componentDatas) , componentStyles : makeLeanComponentVariables(el.componentStyles) , key : i })?.[el.name])
}


export default ComponentGenerator;
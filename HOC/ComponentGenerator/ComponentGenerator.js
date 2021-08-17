import React from 'react';
import CategoryRow from '../../components/CategoryRow/CategoryRow';
import { DynamicImage, DynamicText , DynamicSlider , CircleSlider } from '../../components/DynamicComponents';
import InsuranceDirectory from '../../components/InsuranceDirectory';
import { useSelector } from '../../Store/Y-state';

import { makeLeanComponentVariables } from "../../utils"


const _dynamicElementComponent = ({...rest}) => ({
    MobileInsuranceCategoryBox : <InsuranceDirectory {...rest} />,
    MobileInsuranceCategoryRow : <CategoryRow {...rest} />,
    MobileImage : <DynamicImage {...rest} />,
    MobileText : <DynamicText {...rest} />,
    MobileSlider : <DynamicSlider {...rest} />, 
    MobileCircleSlider : <CircleSlider {...rest} />
})

const ComponentGenerator = () => {
    const dynamicComponentList = useSelector(state => state.dynamicComponent) || [];
    console.log(dynamicComponentList);
    
    return dynamicComponentList.map((el , i) => _dynamicElementComponent({ componentDatas : makeLeanComponentVariables(el.componentDatas) , componentStyles : makeLeanComponentVariables(el.componentStyles) , key : i })?.[el.name])
}


export default ComponentGenerator;
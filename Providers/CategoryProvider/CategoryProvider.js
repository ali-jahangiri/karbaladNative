import React from 'react';
import CategoryRow from '../../components/CategoryRow/CategoryRow';
import InsuranceDirectory from '../../components/InsuranceDirectory';
import { useSelector } from '../../Store/Y-state';
import { makeLeanComponentVariables } from '../../utils';

const _categoryClone = ({ ...rest }) => ({
    MobileInsuranceCategoryBox : <InsuranceDirectory {...rest} />,
    MobileInsuranceCategoryRow : <CategoryRow {...rest} />,    
})

const CategoryProvider = ({ passedNestedItems }) => {
    const filterBase = useSelector(state => state.dynamicComponent);
    const { name : selectedCategoryModeName , componentStyles : selectedCategoryStyle } = filterBase.find(el => el.name === "MobileInsuranceCategoryBox" || el.name === "MobileInsuranceCategoryRow")
    return _categoryClone({ passedNestedItems , componentStyles : makeLeanComponentVariables(selectedCategoryStyle) })[selectedCategoryModeName]
}

export default CategoryProvider;
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
    const { Name : selectedCategoryModeName , ComponentStyles : selectedCategoryStyle } = filterBase.find(el => el.Name === "MobileInsuranceCategoryBox" || el.Name === "MobileInsuranceCategoryRow")
    return _categoryClone({ passedNestedItems , componentStyles : makeLeanComponentVariables(selectedCategoryStyle) })[selectedCategoryModeName]
}

export default CategoryProvider;
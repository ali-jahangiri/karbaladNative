import React from 'react';
import CategoryRow from '../../components/CategoryRow/CategoryRow';
import InsuranceDirectory from '../../components/InsuranceDirectory';
import { useStyle } from '../../Hooks/useStyle';

const _categoryClone = ({ ...rest }) => ({
    box : <InsuranceDirectory {...rest} />,
    row : <CategoryRow {...rest} />
})

const CategoryProvider = ({ handler , items }) => {
    const { category } = useStyle()
    return _categoryClone({ items, handler })[category]
}

export default CategoryProvider;
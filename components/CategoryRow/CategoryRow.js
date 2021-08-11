import { useScrollToTop } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView } from 'react-native';
import CategoryRowItem from './CategoryRowItem';


const CategoryRow = ({ items = [] , handler }) => {
    const container = useRef();
    useScrollToTop(container);
    return (
    <ScrollView ref={container}>
            {
                items.map((el , i) => (
                    <CategoryRowItem {...el} key={i} onItemPress={handler} />
                ))
            }
    </ScrollView>
    )
}


export default CategoryRow;
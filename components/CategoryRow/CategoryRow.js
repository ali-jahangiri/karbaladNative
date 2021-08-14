import { useNavigation, useScrollToTop } from '@react-navigation/native';
import React, { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from '../../Store/Y-state';
import CategoryRowItem from './CategoryRowItem';


const CategoryRow = ({ passedNestedItems , componentStyles }) => {
    const items = useSelector(state => state.initial)
    const navigation = useNavigation()      
    const container = useRef();
    useScrollToTop(container);
    const appendStyle = style(componentStyles)

    const handler = routeParameters => {
        navigation.push('stepScreen' , routeParameters);
    }

    const itemsList = passedNestedItems || items;

    return (
        <View style={appendStyle.container}>
            <ScrollView ref={container}>
            {
                itemsList.map((el , i) => (
                    <CategoryRowItem passedStyle={componentStyles} {...el} key={i} onItemPress={handler} />
                ))
            }
            </ScrollView>
        </View>
    )
}


const style = ({ containerBgColor , containerMarginTop , containerMarginBottom }) => StyleSheet.create({
    container : {
        backgroundColor : containerBgColor,
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom)
    }
})


export default CategoryRow;
import React , { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import InsuranceCart from './InsuranceCart';
import client from '../client';
import { useSelector } from '../Store/Y-state';

const InsuranceDirectory = ({ passedNestedItems , componentStyles }) => {
    const items = useSelector(state => state.initial);
    const navigation = useNavigation();
    const container = useRef();
    const appendStyle = style(componentStyles);
    useScrollToTop(container);

    const handler = routeParameters => {
        navigation.push('stepScreen' , routeParameters);
    }

    const itemList = passedNestedItems || items

    return (
        <ScrollView style={appendStyle.mainContainer} ref={container}>
            <View style={appendStyle.container}>
            {
                itemList.map((el , i) => (
                    <InsuranceCart
                        passedStyle={componentStyles}
                        onItemPress={handler}
                        {...el}
                        key={i}  />
                ))
            }
            </View>
        </ScrollView>
    )
}

const style = ({ containerMarginTop , containerMarginBottom , containerBgColor }) => StyleSheet.create({
    container : {
        marginTop : client.style.size.spacing.screenHeaderAndDirectoryGap,
        flexDirection : 'row',
        flexWrap : 'wrap',
        width: '90%',
        marginHorizontal : "5%",
        justifyContent : 'space-between',
    },
    mainContainer : {
        backgroundColor : containerBgColor,
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
    }
})

export default InsuranceDirectory;
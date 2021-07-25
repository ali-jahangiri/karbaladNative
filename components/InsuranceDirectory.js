import React , { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import InsuranceCart from './InsuranceCart';
import client from '../client';

const InsuranceDirectory = ({ items = [] , handler}) => {
    const container = useRef();
    useScrollToTop(container);
    return (
        <ScrollView ref={container}>
            <View style={style.container}>
            {
                items.map((el , i) => (
                    <InsuranceCart
                    onItemPress={handler}
                    {...el}
                    key={i}  />
                ))
            }
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    container : {

        marginTop : client.style.size.spacing.screenHeaderAndDirectoryGap,
        flexDirection : 'row',
        flexWrap : 'wrap',
        width: '90%',
        marginHorizontal : "5%",
        justifyContent : 'space-between',
    }
})

export default InsuranceDirectory;
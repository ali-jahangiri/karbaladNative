import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import InsuranceCart from './InsuranceCart';

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
        flexDirection : 'row',
        flexWrap : 'wrap',
        width: '90%',
        marginHorizontal : "5%",
        justifyContent : 'space-between',
    }
})

export default InsuranceDirectory;
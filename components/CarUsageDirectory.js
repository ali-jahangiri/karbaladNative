import React from 'react';
import { StyleSheet, View } from 'react-native';
import CarItemUsage from './CarItemUsage';
import Para from './Para';
import StepperLabel from './StepperLabel';


const CarUsageDirectory = ({ items }) => {

    if(items?.length) return (
        <>
        <StepperLabel title="کاربری خودرو" />
        <View style={style.container}>
            {
                items?.map((el , i) => (
                    <CarItemUsage key={i} {...el} />
                ))
            }
        </View>
        </>
    )
    else return null
}

const style = StyleSheet.create({
    container : {
        flexDirection : "row",
        flexWrap : 'wrap',
        justifyContent : "space-between",
    }
})

export default CarUsageDirectory
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Para from "../components/Para";

import CarItem from './CarItem';
import StepperLabel from './StepperLabel';

const CarDirectory = ({ currentAvailableItems , handler }) => {
    if(currentAvailableItems.length) return (
        <View style={style.container}>
                <StepperLabel title="مدل خودرو" />
            {
                currentAvailableItems?.map((el ,i) => 
                    <CarItem selectHandler={handler} {...el} index={i} key={i} />)
            }
        </View>
    )
    return null
}

const style = StyleSheet.create({
    container : {
        flexDirection : 'row',
        flexWrap : "wrap",
        alignContent : 'center',
        justifyContent : 'space-between'
    },
})

export default CarDirectory;
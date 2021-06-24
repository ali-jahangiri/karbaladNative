import React from 'react';
import { StyleSheet, View } from 'react-native';

import Para from "../components/Para";

import CarItem from './CarItem';
import StepperLabel from './StepperLabel';

const CarDirectory = ({ currentAvailableItems , selectedCar , handler , categoryWasSelected ,isSearchFilterApplied }) => {
    // No result case handler
    if(!categoryWasSelected && isSearchFilterApplied && !currentAvailableItems.length) return <Para style={{ marginVertical : 20 }} align="center" weight="bold" color="grey">نتیجه ای یافت نشد.</Para>


    if(currentAvailableItems.length) return (
        <View style={style.container}>
                <StepperLabel title="مدل خودرو" />
            {
                currentAvailableItems?.map((el ,i) => 
                    <CarItem currentSelected={selectedCar} selectHandler={handler} {...el} index={i} key={i} />)
            }
        </View>
    )
    return null
}

const style = StyleSheet.create({
    container : {
        flexDirection : 'row-reverse',
        flexWrap : "wrap",
        alignContent : 'center',
        justifyContent : 'space-between'
    },
})

export default CarDirectory;
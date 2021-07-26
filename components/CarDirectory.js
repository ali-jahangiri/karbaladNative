import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Para from "../components/Para";

import CarItem from './CarItem';
import CarSelectionHeaderLabel from './CarSelectionHeaderLabel';
import StepperLabel from './StepperLabel';

const CarDirectory = ({ currentAvailableItems , selectedCar , handler , categoryWasSelected ,isSearchFilterApplied }) => {
    const [collapse, setCollapse] = useState(false);

    // No result case handler
    if(!categoryWasSelected && isSearchFilterApplied && !currentAvailableItems.length) return <Para style={{ marginVertical : 20 }} align="center" weight="bold" color="grey">نتیجه ای یافت نشد.</Para>


    const selectHandler = value => {
        setCollapse(true);
        handler(value);
    }

    if(currentAvailableItems.length) return (
        <>
        <CarSelectionHeaderLabel setCollapse={setCollapse} collapse={collapse} label="مدل خودرو" />
        <View style={style.container}>
            {
                !collapse ? (
                    currentAvailableItems?.map((el ,i) => 
                    <CarItem currentSelected={selectedCar} selectHandler={selectHandler} {...el} index={i} key={i} />)
                ) : null
            }
        </View>
        </>
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
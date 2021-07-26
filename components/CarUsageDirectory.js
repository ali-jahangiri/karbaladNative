import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CarItemUsage from './CarItemUsage';
import StepperLabel from './StepperLabel';


const CarUsageDirectory = ({ items , selectHandler , currentSelectedUsage , pushToNextStageHandler }) => {
    const [wasCarUsageSelected, setWasCarUsageSelected] = useState(false);

    const onSelectHandler = value => {
        selectHandler(value);
        setWasCarUsageSelected(true);
    }

    useEffect(() => {
        if(wasCarUsageSelected) pushToNextStageHandler();
    } , [currentSelectedUsage]);
    
    if(items?.length) return (
        <>
        <StepperLabel title="کاربری خودرو" />
        <View style={style.container}>
            {
                items?.map((el , i) => (
                    <CarItemUsage
                        currentSelected={currentSelectedUsage} 
                        selectHandler={onSelectHandler}
                        key={i} 
                        {...el} />
                ))
            }
        </View>
        </>
    )
    else return null
}

const style = StyleSheet.create({
    container : {
        flexDirection : "row-reverse",
        flexWrap : 'wrap',
        justifyContent : "space-between",
    }
})

export default CarUsageDirectory
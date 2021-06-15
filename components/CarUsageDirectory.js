import React from 'react';
import { StyleSheet, View } from 'react-native';
import CarItemUsage from './CarItemUsage';
import StepperLabel from './StepperLabel';


const CarUsageDirectory = ({ items , selectHandler , currentSelectedUsage }) => {
    
    if(items?.length) return (
        <>
        <StepperLabel title="کاربری خودرو" />
        <View style={style.container}>
            {
                items?.map((el , i) => (
                    <CarItemUsage
                    currentSelected={currentSelectedUsage} 
                    selectHandler={selectHandler}
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
        flexDirection : "row",
        flexWrap : 'wrap',
        justifyContent : "space-between",
    }
})

export default CarUsageDirectory
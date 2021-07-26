import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


const StepTimeline = ({ itemsLength , currentStage , eachItemWithStepper }) => {
    const { primary } = useStyle();
    return (
        <View style={style.container} >
            {new Array(itemsLength).fill("").map((_ , i) => (
                        <View key={i}
                            style={{ width : `${eachItemWithStepper}%` , padding : 5 , backgroundColor : i >= currentStage ? generateColor(primary , 2) : generateColor(primary , 5) }} />
                    ))
            }
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        width : "100%" , 
        flexDirection : "row-reverse" , 
        justifyContent : "space-between" , 
        borderRadius : 10 , 
        overflow : "hidden" , 
        marginBottom : 10 
    },

})

export default StepTimeline;
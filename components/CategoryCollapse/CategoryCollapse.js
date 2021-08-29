import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { useSelector } from '../../Store/Y-state';
import { imageFinder } from '../../utils';
import Para from '../Para';




const CircleItem = ({ webIcon , name , cat , isActive ,  selectHandler , index }) => {
    const appendedStyle = useStyle(circleStyle , { isActive });
    return (
        <TouchableOpacity onPress={() => selectHandler({ index , cat })} style={appendedStyle.container}>
            <View style={appendedStyle.circleContainer}>
                <Image source={{ uri : imageFinder(webIcon)  }} style={appendedStyle.image} />
            </View>
            <Para weight="bold" style={appendedStyle.label}>{name}</Para>
        </TouchableOpacity>
    )
}

const circleStyle = ({  } , { isActive }) => StyleSheet.create({
    container : {
        marginHorizontal : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    image : {
        width : "80%",
        height : "80%"
    },
    circleContainer : {
        backgroundColor : 'lightblue',
        borderRadius : 50,
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        width : 80,
        height: 80,
        borderWidth : 2,
        borderColor : isActive ? 'red' : 'lightblue'
    },
    label : {
        marginTop : 5
    }
})


const CategoryCollapse = ({ componentStyles }) => {
    const appendedStyle = useStyle(style);
    const items = useSelector(state => state.initial)
    const [currentStage, setCurrentStage] = useState(0);

    console.log(items);

    const selectHandler = index => setCurrentStage(index);

    return (
        <View style={style.container}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} style={appendedStyle.circleContainer} horizontal>
                {
                    items?.map((el , i) => <CircleItem key={i} {...el} selectHandler={selectHandler} isActive={currentStage === i} />)
                }
            </ScrollView>
        </View>
    )
}



const style = () => StyleSheet.create({
    container : {

    },
    circleContainer : {

    }
})

export default CategoryCollapse;
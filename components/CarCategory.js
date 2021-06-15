import React, { useState } from 'react';
import { StyleSheet , ScrollView , View , Image } from 'react-native';
import Para from './Para';

import { imageFinder } from '../utils';
import { useStyle } from '../Hooks/useStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import StepperLabel from './StepperLabel';

const CarCategory = ({ list , value : { CarCategoryId , searchFilterBase}, setValue}) => {
    const appendStyle = useStyle(style)
    const [currentLimit, setCurrentLimit] = useState(10);


    const categorySelectHandler = category => {
        setValue({ key : "CarCategoryId" , value : category.id });
        
        // when we select a car brand we should clean up previous car usage and wait for new usage in later  actions
        setValue({ key : "usageItems", value : [] });
    }

    // if we have a filter base for cars , we don't need see carCategory component
    if(searchFilterBase) return null;

    return (
        <ScrollView>
            <StepperLabel title="انتخاب شرکت سازنده" />
            <View style={appendStyle.container}>
                {
                    list.slice(0 , currentLimit).map((el , i) => (
                        <TouchableOpacity 
                            onPress={() => categorySelectHandler(el)} 
                            key={i}
                            style={[appendStyle.itemContainer , CarCategoryId === el.id && appendStyle.selectedItem]}
                            >
                            
                            <Image source={{
                                uri : imageFinder(el.imageUrl) ,
                                width: 60,
                                height : 60
                            }} />
                        </TouchableOpacity>
                    ))
                }
            </View>
            {
                currentLimit < list.length && 
                <TouchableOpacity style={appendStyle.moreItem} onPress={() => setCurrentLimit(prev => prev + 10)}>
                    <Feather name="plus" size={22} color="grey" />
                    <Para style={{ margin: 10 }} color="grey" align="center">گزینه های بیشتر</Para>
                </TouchableOpacity>
            }
        </ScrollView>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    itemContainer : {
        flexDirection : 'row',
        padding: 10,
        alignItems : 'center',
        margin : 5,
        borderRadius : baseBorderRadius,
        borderWidth : 2,
        borderColor : "transparent",
    },
    selectedItem : {
        borderColor : primary,        
    },
    moreItem : {
        width: '50%',
        backgroundColor : '#8b8d9408',
        marginHorizontal : "25%",
        padding: 10,
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default CarCategory;
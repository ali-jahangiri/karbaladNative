import React, { useState } from 'react';
import { StyleSheet , ScrollView , View , Image , TouchableOpacity} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Para from './Para';
import StepperLabel from './StepperLabel';

import { generateColor, imageFinder } from '../utils';
import { useStyle } from '../Hooks/useStyle';
import CarSelectionHeaderLabel from './CarSelectionHeaderLabel';


const CarCategory = ({ list , value : { CarCategoryId , searchFilterBase}, setValue}) => {
    const appendStyle = useStyle(style);
    
    const [currentLimit, setCurrentLimit] = useState(10);
    const [collapse, setCollapse] = useState(!!CarCategoryId);

    const categorySelectHandler = category => {
        setCollapse(true)
        setValue({ key : "CarCategoryId" , value : category.id });
        
        // when we select a car brand we should clean up previous car usage and wait for new usage in later  actions
        setValue({ key : "usageItems", value : [] });
    }

    // if we have a filter base for cars , we don't need see carCategory component
    if(searchFilterBase) return null;


    const renderChecker = () => {
        if(!collapse) {
            return (
                <>
                <View style={appendStyle.container}>
                {
                    list.slice(0 , currentLimit).map((el , i) => (
                        <TouchableOpacity 
                            onPress={() => categorySelectHandler(el)} 
                            key={i}
                            style={appendStyle.itemContainer}
                            >
                            {
                                CarCategoryId === el.id ? (
                                    <View style={appendStyle.checkIconContainer} />
                                ): null
                            }
                            <Image style={{ opacity : CarCategoryId === el.id ? 1 : .5  }} source={{
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
                        <Feather name="chevron-down" size={22} color="grey" />
                        <Para style={{ margin: 10 }} color="grey" align="center">گزینه های بیشتر</Para>
                    </TouchableOpacity>
                }
                </>
            )
        }else return null;
    }

    return (
        <ScrollView>
            <CarSelectionHeaderLabel collapse={collapse} setCollapse={setCollapse} label="انتخاب شرکت سازنده" />
            {renderChecker()}
        </ScrollView>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
        flexDirection : 'row',
        flexWrap : 'wrap',
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
    checkIconContainer : {
        position : "absolute" , 
        backgroundColor : generateColor(primary , 5) , 
        zIndex : 2,
        width : 80,
        height : 80,
        borderRadius : baseBorderRadius - 5
    },
    moreItem : {
        width: '50%',
        backgroundColor : '#8b8d9408',
        marginHorizontal : "25%",
        padding: 5,
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 10
    }
})

export default CarCategory;
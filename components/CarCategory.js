import React, { useState } from 'react';
import { StyleSheet , ScrollView , View , Image } from 'react-native';
import Para from './Para';
import config from '../config';
import { imageFinder } from '../utils';
import { useStyle } from '../Hooks/useStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CarCategory = ({ list , value : { CarId }, setValue}) => {
    const appendStyle = useStyle(style)
    const [currentLimit, setCurrentLimit] = useState(10);

    const nextLimitStepHandler = () => setCurrentLimit(prev => prev + 10)

    const selectHandler = id => setValue(prev => ({ ...prev ,  CarId : id}))

    return (
        <ScrollView>
            <View style={appendStyle.container}>
                {
                    list.slice(0 , currentLimit).map((el , i) => (
                        <TouchableOpacity 
                            onPress={() => selectHandler(el.id)} 
                            key={i}
                            style={[appendStyle.itemContainer , CarId === el.id ? appendStyle.selectedItem : undefined]}
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
                <TouchableOpacity style={appendStyle.moreItem} onPress={nextLimitStepHandler}>
                    <Para color="grey" align="center">گزینه های بیشتر</Para>
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
        marginVertical : 20
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
        backgroundColor : '#8b8d940d',
        marginHorizontal : "25%",
        padding: 10,
        borderRadius : baseBorderRadius
    }
})

export default CarCategory;
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, imageFinder } from '../../utils';
import Para from '../Para';


const CategoryRowItem = ({ name , onItemPress , cat , id , webIcon }) => {
    const appendStyle = useStyle(style , !!webIcon);
    return (
        <TouchableOpacity onPress={() => onItemPress({cat , name , id})} style={appendStyle.container}>
            {
                !!webIcon && <View style={appendStyle.imageContainer}>
                    <Image source={{ uri : imageFinder(webIcon) , width : 50 , height : 50}} />
                </View>
            }
            <Para style={{ marginRight : 20 , flex : 1 }} size={18}>{name}</Para>
            {
                !webIcon && <View style={appendStyle.bullet}/>
            }
        </TouchableOpacity>
    )
}


const style = ({ primary , baseBorderRadius } , haveImage) => StyleSheet.create({
    container : {
        backgroundColor : generateColor(primary, 5),
        borderRadius : baseBorderRadius,
        marginVertical : 10,
        width : "90%",
        marginHorizontal : "5%",
        overflow: 'hidden',
        flexDirection : "row" , 
        alignItems : "center",
        justifyContent :  haveImage ? "space-between" : "flex-end",
        padding : !haveImage ? 20 : 0
    },
    bullet : {
        borderRadius : baseBorderRadius,
        height : "100%",
        padding : 25,
        width : 50,
        backgroundColor : generateColor(primary , 2)
    },
    imageContainer : {
        backgroundColor : generateColor(primary, 5),
        padding : 20,
        alignItems: 'center',
        justifyContent : "center",

    }
})

export default CategoryRowItem;
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { imageFinder } from '../utils';
import Para from './Para';



const InsPayDeliveryOption = ({ onChange , currentSelected , items }) => {
    const appendStyle = useStyle(style);

    return (
        <View style={appendStyle.container}>
            {
                items.map((el , i) => (
                    <TouchableOpacityBase style={[appendStyle.item , currentSelected === el.id ? appendStyle.selectedItem : {}]} key={i}>
                        <Image style={{ opacity : .5 }} resizeMode="contain" source={{ 
                                uri : imageFinder(el.image),
                                width: 40,
                                height: 40,
                        }}  />
                        <Para>{el.name}</Para>
                    </TouchableOpacityBase>
                ))
            }
        </View>
    )
}


const style = () => StyleSheet.create({
    container : {

    },
    item : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 10
    },
    selectedItem : {

    }
})

export default InsPayDeliveryOption
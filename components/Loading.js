import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';


const Loading = () => {
    const appendStyle = useStyle(style);
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <Para color="grey" weight="bold" size={35}>در حال </Para>
                <Para style={{ marginTop : -20 }} color="grey" weight="bold" size={35}>دریافت اطلاعات</Para>
            </View>
        </View>
    )
}

const style = ({ primary }) => StyleSheet.create({
    container : {
        flex : 1,
        width: "95%",
        alignItems : 'flex-end',
        justifyContent : 'center',
    },
    innerContainer : {
        borderColor : generateColor(primary , 5),
        borderBottomWidth: 3,
    }
});

export default Loading;
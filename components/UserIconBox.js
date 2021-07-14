import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';



const UserIconBox = ({ bgAlpha }) => {
    const appendStyle = useStyle(style , bgAlpha);

    return (
        <View style={appendStyle.container}>
            <Feather name="user" style={appendStyle.icon} size={30} />
        </View>
    )
}

const style = ({ primary , baseBorderRadius } , bgAlpha = 5) => StyleSheet.create({
    container : {
    justifyContent : 'center',
    backgroundColor : generateColor(primary , bgAlpha),
    width: 70,
    height: 70,
    alignItems : 'center',
    borderRadius : baseBorderRadius,
    marginBottom : 10,
    },
    icon : {
        color: generateColor(primary , 8),
    }
})

export default UserIconBox;;
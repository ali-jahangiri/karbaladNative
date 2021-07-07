import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';

import ScreenWrapper from '../components/ScreenWrapper';
import { useStyle } from '../Hooks/useStyle';
import { useDispatch } from '../Store/Y-state';
import { generateColor } from '../utils';
import { Feather } from '@expo/vector-icons';

const Welcome = ({ continueHandler ,  }) => {
    const appendStyle = useStyle(style);

    return (
        <ScreenWrapper >
            <View style={appendStyle.container} >
                <Para weight="bold" size={22}>خوش آمدید</Para>
                <TouchableOpacity style={appendStyle.cta} onPress={continueHandler}>
                    <Feather style={{ marginRight : 10 }} name="arrow-left" size={24} color="black" />
                    <Para weight="bold" size={16} align="center">ادامه</Para>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        margin: StatusBar.currentHeight + 10,
        flex : 1,
        justifyContent : 'center'
    },
    cta : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding: 15,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center'
    }
})

export default Welcome;
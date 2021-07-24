import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';
import UserIconBox from '../UserIconBox';

import client from "../../client";
import { generateColor } from '../../utils';

const { LOGIN : { LOGIN_APP_NAME , LOGIN_SCREEN_DESK , REGISTER_KEY , LOGIN_KEY , FORGOT_key } } = client.static;

const AuthLanding = ({ setAuthMode  }) => {
    const appendStyle = useStyle(style);
    return (
        <>
            <View style={{ alignItems : "center" }}>
                <UserIconBox />
                <Para size={20} >{LOGIN_APP_NAME}</Para>
            </View>
            <View style={appendStyle.descContainer}>
                <Para>{LOGIN_SCREEN_DESK}</Para>
            </View>
            <View style={appendStyle.ctaContainer}>
                <View style={{ flexDirection : "row" , justifyContent : "space-between" }}>
                    <TouchableOpacity onPress={() => setAuthMode(LOGIN_KEY)} style={appendStyle.cta}>
                        <Para size={16} weight="bold" align="center">ورود</Para>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setAuthMode(REGISTER_KEY)} style={appendStyle.cta}>
                        <Para size={16} weight="bold" align="center">ثبت نام</Para>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setAuthMode(FORGOT_key)} style={appendStyle.forgotPasswordContainer}>
                    <Para>رمز عبور خود را فراموش کرده اید ؟ </Para>
                </TouchableOpacity>
            </View>
        </>
    )
}   

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    descContainer : {
        marginVertical : 20,
    },
    ctaContainer : {
        justifyContent : 'space-evenly',
        width : "100%"
    },
    cta : {
        padding: 15,
        backgroundColor : generateColor(primary , 5),
        width: "49%",
        textAlign : 'center',
        borderRadius : baseBorderRadius
    },
    forgotPasswordContainer : {
        backgroundColor  : "transparent",
        flexDirection : "row",
        justifyContent : 'center',
        marginTop : 20
    }
})


export default AuthLanding;
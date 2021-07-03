import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';

import Input from '../components/Input';

const SIGN_IN = "signIn";
const SING_UP = "signUp";


import { Feather } from '@expo/vector-icons';

const Login = ({  }) => {
    const appendStyle = useStyle(style);
    const [authMode, setAuthMode] = useState(null);
    const [inputValue, setInputValue] = useState({});
    const { primary } = useStyle()


    const signInHandler = () => {

    }


    const singUpHandler = () => {

    }



    const changeHandler = (key , value) => {
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }))
    }


    useEffect(() => {
        console.log(inputValue);
    } , [inputValue])

    const renderChecker = () => {
        if(!authMode) return (
            <>
            <View>
                <View style={appendStyle.icon}>
                    <Feather name="user" size={30} color="black" />
                </View>
                <Para size={20} >کــــاربلد</Para>
            </View>
            <View style={appendStyle.descContainer}>
                <Para>Et ad odio rerum et qui. Occaecati illum et sit architecto rerum cupiditate debitis. Omnis temporibus optio animi. Repellendus dicta aperiam dolorem dicta est voluptate magni architecto voluptatibus.
                Et optio ea magni nulla consectetur. Nobis atque omnis quia eos itaque incidunt voluptates eum aut. Iste in eius unde. Debitis eos consequatur aut incidunt ad aliquid. Ratione inventore porro illo in laborum accusantium.
                Culpa molestias dolorem. Veritatis qui eos vel autem mollitia in. Eveniet nihil vel ipsum est odio vel impedit.</Para>
            </View>
            <View style={appendStyle.ctaContainer}>
                <TouchableOpacity onPress={() => setAuthMode(SIGN_IN)} style={appendStyle.cta}>
                    <Para size={16} weight="bold" align="center">ورود</Para>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAuthMode(SING_UP)} style={{ backgroundColor  : "transparent" , flexDirection : "row" , justifyContent : 'center' , marginTop : 20}}>
                    <Para> کنید </Para>
                    <Para weight="bold" color={primary}>ثبت نام</Para>
                    <Para align="center">حساب کاربری ندارید ؟ </Para>
                </TouchableOpacity>
            </View>
            </>
        );
    else if(authMode === SIGN_IN) {
        return (
            <View style={appendStyle.authModeContainer}>
                <View style={appendStyle.modeHeader}>
                    <TouchableOpacity onPress={() => setAuthMode(null)}>
                        <Para  style={{ paddingHorizontal : 25 , paddingVertical : 10 , paddingLeft : 0 }} color="grey" weight="bold">بازگشت</Para>
                    </TouchableOpacity>
                    <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                        <Para style={appendStyle.modeTitle}>ورود</Para>
                        <View style={appendStyle.bullet} />
                    </View>
                </View>
                <View style={{ marginTop : 20 }}>
                    <Input 
                        align="right"
                        placeholder="نام کاربری"
                        value={inputValue?.userName}
                    />
                    <Input
                        isPassword
                        placeholder="رمز عبور"
                        value={inputValue?.userName}
                    />
                    <TouchableOpacity onPress={singUpHandler} style={appendStyle.endCta}>
                        <Feather style={{ marginRight : 10 }} name="arrow-left" size={24} color="black" />
                        <Para weight="bold" size={18}>ورود</Para>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else return (
        <View style={appendStyle.authModeContainer}>
            <View style={appendStyle.modeHeader}>
                <TouchableOpacity onPress={() => setAuthMode(null)}>
                    <Para style={{ paddingHorizontal : 25 , paddingVertical : 10 , paddingLeft : 0 }}  color="grey" weight="bold">بازگشت</Para>
                </TouchableOpacity>
                <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                    <Para style={appendStyle.modeTitle}>ثبت نام</Para>
                    <View style={appendStyle.bullet} />
                </View>
            </View>
            <View>
                <Input
                    value={inputValue?.userName}
                    placeholder="نام کاربری"
                    changeHandler={value => changeHandler('userName' , value)}
                    />
                <Input 
                    isPassword
                    placeholder="رمز عبور"
                    value={inputValue?.password}
                    changeHandler={value => changeHandler("password" , value)}
                />
                <Input 
                    isPassword
                    placeholder="تکرار رمز عبور"
                    value={inputValue?.passwordConfirm}
                    changeHandler={value => changeHandler("passwordConfirm" , value)}
                />
            </View>
            <TouchableOpacity onPress={signInHandler} style={appendStyle.endCta}>
                        <Feather style={{ marginRight : 10 }} name="arrow-left" size={24} color="black" />
                        <Para weight="bold" size={18}>ثبت نام</Para>
            </TouchableOpacity>
        </View>
    )
    }

    return (
        <View style={appendStyle.container}>
            {
                renderChecker()
            }
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center',
        width : "90%",
        margin: "5%"
    },
    endCta : {
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 8),
        padding: 15,
        borderRadius : baseBorderRadius
    },
    icon : {
        justifyContent : 'center',
        backgroundColor : generateColor(primary , 5),
        width: 70,
        height: 70,
        alignItems : 'center',
        borderRadius : baseBorderRadius
    },
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
        width: "100%",
        textAlign : 'center',
        borderRadius : baseBorderRadius
    },
    headText : {

    },
    descText : {

    },
    authModeContainer : {
        flex: 1,
        width: "90%",
        marginHorizontal : "5%",
        justifyContent : 'center'
    },
    bullet : {
        width : 30,
        height : 30,
        backgroundColor : generateColor(primary , 6),
        borderRadius : baseBorderRadius - 5,
        marginLeft : 10
    },
    modeTitle : {
        fontSize : 26,
        fontFamily : "bold",
        color: "grey",

    },
    modeHeader : {
        marginTop : StatusBar.currentHeight + 10,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
        width : "100%",
        
    }
})

export default Login
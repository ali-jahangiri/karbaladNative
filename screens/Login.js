import React, { useState } from 'react';
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';

import Input from '../components/Input';

import { Feather } from '@expo/vector-icons';

import { useDispatch } from '../Store/Y-state';

import InputNumber from "../components/InputNumber";

import client from '../client';
import useFetch from '../Providers/useFetch';


const { SIGN_IN , SING_UP } = client.static;

const VerifyInput = ({ value , changeHandler }) => {
    const appendStyle = useStyle(verifyInputStyle);

    return (
        <View style={appendStyle.container} > 
            <TextInput
                style={appendStyle.input}

                value={value}
                onChangeText={changeHandler}
            />
        </View>
    )
}

const verifyInputStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        borderColor : primary,
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        padding : 12
    },
    input : {
        fontFamily : "bold",
        fontSize : 22
    }
})



const PhoneInput = ({ value , changeHandler }) => {
    const appendStyle = useStyle(phoneInputStyle);
    return (
        <View style={appendStyle.container}>
            <TextInput
                keyboardType="number-pad"
                style={appendStyle.input}
                placeholder="شماره همراه"
                value={toFarsiNumber(value || "")}
                onChangeText={changeHandler}
            />
        </View>
    )
}

const phoneInputStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        borderWidth : 2,
        borderColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        marginVertical : 10
    },
    
    input : {
        fontSize : 22,
        fontFamily : "bold",
        padding: 15,
        textAlign : 'center'
    }
})

const Login = () => {
    const appendStyle = useStyle(style);
    const [authMode, setAuthMode] = useState(null);
    const [inputValue, setInputValue] = useState({});
    const [error, setError] = useState(null);
    const [phoneKey, setPhoneKey] = useState(null);


    const fetcher = useFetch(true);


    const { primary } = useStyle()

    const signInHandler = () => {

    }


    const singUpHandler = () => {
        
        // if(!inputValue?.userName) {
        //     return setError("نام کاربری خود را وارد نمایید")
        // }
        // if(inputValue?.password !== inputValue?.passwordConfirm) {
        //     return setError("رمز عبور با تکرار آن همخوانی ندارد . لطفا مجددا تلاش نمایید ");
        // }
        // else {
        //     const endObject = encrypt.encrypt({
        //         UserName : inputValue.userName,
        //         Password : inputValue.password,
        //     })
            
        // }
    }



    const changeHandler = (key , value) => {
        setError(null);
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }))
    }



    const phoneVerificationHandler = () => {
        fetcher
            .then(api => {
                api.post("/VerifyNumber" , {
                    mobile : inputValue?.phone
                })
                .then(data => {
                    console.log(data);
                })
            }).catch(err => {
                
            })
    }


    const renderChecker = () => {
        // FIRST STEP FOR WAIT FOR USER EVENT
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
                <PhoneInput
                    value={inputValue?.phone}
                    changeHandler={value => changeHandler("phone" , value)}
                />
                
                {/* <VerifyInput 
                    value={inputValue?.phone}
                    changeHandler={value => changeHandler("phone" , value)}
                /> */}
                
                {/* <Input
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
                /> */}
            </View>
            {
                error ?
                <View style={appendStyle.error}>
                    <Para color={'red'}>{error}</Para>
                </View> : null
            }
            <TouchableOpacity onPress={phoneVerificationHandler} style={appendStyle.endCta}>
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
    error : {
        marginBottom : 10
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
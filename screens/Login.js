import React, { useRef, useState } from 'react';
import { Button, Keyboard, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';

import Input from '../components/Input';

import { Feather } from '@expo/vector-icons';


import client from '../client';
import useFetch from '../Providers/useFetch';
import config from '../config';

// TODO remove and combine this fixNumber for have only one import from utils
import { fixNumbers } from '../utils/Date';
import { persister } from '../utils';
import { useDispatch, useSelector } from '../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen } from '../Store/Slices/authSlice';
import UserIconBox from '../components/UserIconBox';


const { REGISTER, LOGIN , FORGOT } = client.static;


const PasswordInput = ({ value , changeHandler , placeholder , autoFocus = false }) => {
    const appendStyle = useStyle(passwordInputStyle)
    return (
        <View style={appendStyle.container}>
            <TextInput
                autoFocus={autoFocus}
                style={appendStyle.input}
                placeholder={placeholder}
                secureTextEntry
                value={value}
                onChangeText={changeHandler}
            />
        </View>
    )
}

const passwordInputStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        borderColor : generateColor(primary , 5) , 
        borderWidth : 2,
        borderRadius : baseBorderRadius,
        marginVertical : 10
    },
    input : {
        fontSize : 20,
        padding: 15,
        fontFamily : "bold"
    }
})

const VerifyInput = ({ value , changeHandler }) => {
    const appendStyle = useStyle(verifyInputStyle);

    return (
        <View style={appendStyle.container} > 
            <TextInput
                autoFocus
                maxLength={4}
                keyboardType="number-pad"
                placeholder="کد تایید"
                style={[appendStyle.input , { letterSpacing : value ? 10 : 0 }]}
                value={value}
                onChangeText={changeHandler}
            />
        </View>
    )
}



const verifyInputStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        borderColor : generateColor(primary , 5),
        borderWidth : 2,
        marginVertical : 10,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        alignItems : 'center',
        height: 70
    },
    input : {
        fontFamily : "bold",
        fontSize : 25,
        padding : 15,
        textAlign : 'center',
        letterSpacing : 10,
        width : "100%",
        height : 70,
    }
})


    
const PhoneInput = ({ value , changeHandler }) => {
    const appendStyle = useStyle(phoneInputStyle);
    return (
        <View style={appendStyle.container}>
            <TextInput
                autoFocus
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
    const [stage, setStage] = useState(1);
    const [loadingCta, setLoadingCta] = useState(false);

    const fetcher = useFetch(true);
    const storeDispatcher = useDispatch();

    const inputChangeHandler = (key , value) => {
        setError(null);
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }))
    }


    const validate = (partOfState , errMessage) => {
        if(!inputValue?.[partOfState]) {
            setError(errMessage)
            return false
        }else {
            return true
        }
    }


    const registerStage = {
        stageLabel : "ثبت نام",
        "1" : {
            ctaText : 'دریافت کد تایید',
            body() {
                return (
                    <PhoneInput
                        value={inputValue?.phone}
                        changeHandler={value => inputChangeHandler("phone" , fixNumbers(value))} />
                )
            },

            ctaHandler() {
                // TODO preventing sending req when phone number
                if(validate('phone' , "شماره تماس ضروری میباشد")) {
                setLoadingCta("صبر کنید")
                   fetcher
                    .then(({ api , appToken }) => {
                        return api.post("VerifyNumber" , {
                            mobile : fixNumbers(inputValue?.phone)
                            } , {
                            headers : {
                                appToken,
                                packageName : config.packageName
                            }
                        })
                        .then(({data}) => {
                            if(data.typeId < 0) throw new Error(data.message)
                            setStage(prev => prev + 1)
                        })
                    }).catch(err => {
                        setError(err.message);
                    }).finally(() => {
                        setLoadingCta(false);
                    })
                }  
            },
            backHandler() {
                setAuthMode(null);
                setStage(1);
                setError(null);
                setInputValue({});
            }
        },
        "2" : {
            ctaText : "تایید کد",
            backHandler() {
                setStage(prev => prev - 1);
            },
            body() {
                return <VerifyInput
                value={inputValue?.verifyCode}
                changeHandler={value => verificationCodeChangeHandler(value)}
                />  
            },
            ctaHandler() {
                setError("کد تایید صحیح نمیباشد")
            },

        },
        "3" : {
            "ctaText" : "تایید و ثبت نام",
            
            backHandler() {
                setStage(prev => prev -2);
                ["verifyCode" , "password" , 'passwordConfirm']
                    .map(el => inputChangeHandler(el , "")) 
                setError(null);
                setLoadingCta(false);
            },
            body() {
                return (
                    <>
                        <PasswordInput
                            autoFocus
                            value={inputValue?.password} 
                            placeholder="رمز عبور" 
                            changeHandler={value => inputChangeHandler('password' , value)} />
                        <PasswordInput
                            value={inputValue?.passwordConfirm} 
                            placeholder="تکرار رمز عبور" 
                            changeHandler={value => inputChangeHandler('passwordConfirm' , value)} />
                    </>
                )
            },
            ctaHandler() {
                if(inputValue?.password !== inputValue?.passwordConfirm) {
                    setError('رمز عبور و تکرار آن مطابقت ندارد . مجددا برسی نمایید')
                }else {
                    const { phone , password , verifyCode } = inputValue;
                    setLoadingCta("در حال ثبت نام");
                    fetcher
                        .then(({ api , appToken }) => {
                            api.post("GetUserData" , {
                                mobile : phone,
                                pass : verifyCode,
                                newPass : password ,
                                name : "",
                            }, {
                                headers : {
                                    appToken
                                }
                            }).then(({ data }) => {
                                if(data.id < 0) {
                                    setError(data.fullName);
                                    setLoadingCta(false);
                                }else {
                                    const key = data.privatekey;
                                    persister.set("userName" , phone)
                                        .then(one => {
                                            persister.set('userPrivateKey' , key)
                                                .then(_ => {
                                                    storeDispatcher(() => setSeeWelcomeScreen(false));
                                                    storeDispatcher(() => setAppKey(key));
                                                    Keyboard.dismiss();
                                                })
                                        })
                                }
                            })
                        })
                }
            }
        }
    }



    const loginStage = {
        stageLabel : "ورود",
        "1" : {
            ctaText : 'ورود',
            body() {
                return (
                    <>
                        <Input
                            autoFocus
                            extendInputStyle={{ fontSize : 20 }}
                            placeholder="نام کاربری"
                            value={inputValue?.userName}
                            changeHandler={value => inputChangeHandler("userName", value)}
                        />
                        <Input 
                            value={inputValue?.password}
                            isPassword
                            extendInputStyle={{ fontSize : 20 }}
                            changeHandler={value => inputChangeHandler('password', value)}
                            placeholder="رمز عبور"
                        />
                    </>
                )
            },
            ctaHandler() {
                if(inputValue?.userName && inputValue?.password) {
                    fetcher
                        .then(({ api , appToken }) => {
                            api.post("GetUserData" , {
                                mobile : inputValue?.userName,
                                pass : inputValue?.password,
                                newPass : "",
                                name : ""
                            }, { headers : {
                                appToken
                            } })
                                .then(({ data })=> {
                                    const { id , fullName ,  privatekey} = data;
                                    if(id < 0) {
                                        setError(fullName);
                                    }else {
                                        persister.set("userName" , inputValue.userName)
                                            .then(one => {
                                                persister.set('userPrivateKey' , privatekey)
                                                .then(_ => {
                                                    storeDispatcher(() => setAppKey(privatekey));
                                                    Keyboard.dismiss();
                                                    storeDispatcher(() => setSeeWelcomeScreen(false))
                                                })
                                            })
                                    }
                                }).catch(err => {
                                    setError(err)
                                })
                        })
                }else {
                    if(!inputValue?.userName) {
                        setError("نام کاربری  را وارد کنید");
                    }else {
                        setError("رمز عبور را وارد کنید");
                    }
                }
            },
            backHandler() {
                setStage(1);
                setAuthMode(null);
                setError(null);
                setInputValue({});
            }
        }
    }



    const forgotStage = {
        ...registerStage,
        stageLabel : "فراموشی رمز عبور",
    }


    const stages = {
        login : loginStage,
        register : registerStage,
        forgot : forgotStage
    }



    const verificationCodeChangeHandler = value => {
        inputChangeHandler("verifyCode" , value);
        setError(null);
        if(value.length >= 4) {
            setStage(prev => prev + 1)
        }
    }


    const renderChecker = () => {
        if(!authMode) return (
            <>
            <View style={{ alignItems : "center" }}>
                <UserIconBox />
                <Para size={20} >{client.static.LOGIN_APP_NAME}</Para>
            </View>
            <View style={appendStyle.descContainer}>
                <Para>{client.static.LOGIN_SCREEN_DESK}</Para>
            </View>
            <View style={appendStyle.ctaContainer}>
                <View style={{ flexDirection : "row" , justifyContent : "space-between" }}>
                <TouchableOpacity onPress={() => setAuthMode(LOGIN)} style={appendStyle.cta}>
                    <Para size={16} weight="bold" align="center">ورود</Para>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setAuthMode(REGISTER)} style={appendStyle.cta}>
                    <Para size={16} weight="bold" align="center">ثبت نام</Para>
                </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setAuthMode(FORGOT)} style={{ backgroundColor  : "transparent" , flexDirection : "row" , justifyContent : 'center' , marginTop : 20}}>
                    <Para>رمز عبور خود را فراموش کرده اید ؟ </Para>
                </TouchableOpacity>
                <Button title="clear" onPress={() => persister.remove("userName")} />
            </View>
            </>
        );
    else return (
        <View style={appendStyle.authModeContainer}>
            <View style={appendStyle.modeHeader}>
                <TouchableOpacity onPress={() => stages[authMode][stage]?.backHandler()}>
                    <Para style={{ paddingHorizontal : 25 , paddingVertical : 10 , paddingLeft : 0 }}  color="grey" weight="bold">بازگشت</Para>
                </TouchableOpacity>
                <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                    <Para style={appendStyle.modeTitle}>{stages[authMode].stageLabel}</Para>
                    <View style={appendStyle.bullet} />
                </View>
            </View>
            <View>
                {
                    stages[authMode][stage]
                        ?.body()
                }
            </View>
            {
                error ?
                <View style={appendStyle.error}>
                    <Para color={'red'}>{error}</Para>
                </View> : null
            }
            <TouchableOpacity disabled={error || loadingCta} onPress={stages[authMode][stage].ctaHandler} style={[appendStyle.endCta , error || loadingCta ? appendStyle.disabledCta : {}]}>
                        <Feather style={{ marginRight : 10 }} name={`${loadingCta ? "loader" : "arrow-left"}`} size={24} color="black" />
                        <Para weight="bold" size={18}>
                            {
                                (() => {
                                    return loadingCta || stages[authMode][stage]?.ctaText
                                })()
                            }
                        </Para>
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
    disabledCta : {
        opacity: .3
    },  
    cta : {
        padding: 15,
        backgroundColor : generateColor(primary , 5),
        width: "49%",
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

export default Login;
import React, { useState } from 'react';
import { Keyboard, StyleSheet , View } from 'react-native';

import Input from '../components/Input';

import client from '../client';
import useFetch from '../Providers/useFetch';

import { fixNumbers } from '../utils/Date';
import { persister } from '../utils';
import { useDispatch } from '../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen } from '../Store/Slices/authSlice';

import { VerifyInput , PhoneInput, PasswordInput, AuthLanding, AuthModePlayground } from '../components/Login';


const { LOGIN } = client.static;


const Login = () => {
    const [authMode, setAuthMode] = useState(null);
    const [inputValue, setInputValue] = useState({});
    const [error, setError] = useState(null);
    const [stage, setStage] = useState(1);
    const [loadingCta, setLoadingCta] = useState(false);

    const fetcher = useFetch(false);
    const storeDispatcher = useDispatch();

    const inputChangeHandler = (key , value) => {
        setError(null);
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }))
    }

    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const passwordValidation = (pass = "", passConfirm = "") => {
        if([pass , passConfirm].includes("")) {
            setError(LOGIN.AUTH_ERRORS.EMPTY_PASSWORD)
            return false
        }else if(pass !== passConfirm) {
            setError(LOGIN.AUTH_ERRORS.DIFFERENCE_PASSWORD);
            return false
        }else if(!passRegex.test(pass)) {
            setError(LOGIN.AUTH_ERRORS.INVALID_PASSWORD)
            return false
        }else return true
    }

    const verificationCodeChangeHandler = value => {
        inputChangeHandler("verifyCode" , value);
        setError(null);
        if(value.length >= 4) {
            setStage(prev => prev + 1)
        }
    }

    const getUserDataRequest = body => {
        return fetcher('GetUserData' , {...body} )
                .then(({ data }) => {
                    const { id , fullName ,  privatekey} = data;
                    if(id < 0) {
                        setError(fullName)
                        setLoadingCta(false);
                    }else {
                        persister.set("userName" , body.mobile)
                            .then(_unusable => {
                                persister.set('userPrivateKey' , privatekey)
                                    .then(_ => {
                                        Keyboard.dismiss();
                                        storeDispatcher(() => setSeeWelcomeScreen(false));
                                        storeDispatcher(() => setAppKey(privatekey));
                                    })
                            })
                    }
                })
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
                const { phone = "" } = inputValue;

                if(phone && phone.length >= 11) {
                    setLoadingCta("صبر کنید");
                    
                    fetcher('VerifyNumber' , { mobile : fixNumbers(inputValue?.phone) })
                    .then(({ data }) => {
                         if(data.typeId < 0) throw new Error(data.message)
                         setStage(prev => prev + 1)
                    }).catch(err => {
                        setError(err.message);
                    }).finally(() => {
                           setLoadingCta(false);
                    })
                }else {
                    if(!phone) return setError(LOGIN.AUTH_ERRORS.EMPTY_PHONE)
                    else setError(LOGIN.AUTH_ERRORS.INVALID_PHONE_NUMBER_LENGTH)
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
            ctaText : "تایید و ثبت نام",
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
                if(passwordValidation(inputValue?.password , inputValue?.passwordConfirm)) {
                    const { phone , password , verifyCode } = inputValue;
                    setLoadingCta(LOGIN.PENDING_MESSAGE.PEND_IN_REGISTER);
                    getUserDataRequest({ mobile : phone, pass : verifyCode, newPass : password , name : "" });
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
                        <PasswordInput 
                            placeholder="رمز عبور" 
                            value={inputValue?.password} 
                            eyeEnable 
                            changeHandler={value => inputChangeHandler('password' , value)} />
                    </>
                )
            },
            ctaHandler() {
                if(inputValue?.userName && inputValue?.password) {
                    setLoadingCta(LOGIN.PENDING_MESSAGE.PEND_IN_LOGIN);
                    getUserDataRequest({mobile : inputValue.userName, pass : inputValue.password, newPass : "", name : ""})
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


    const stages = {
        login : loginStage,
        register : registerStage,
        forgot : { ...registerStage, stageLabel : "فراموشی رمز عبور" }
    }

    const currentStage = stages?.[authMode]?.[stage]

    const renderChecker = () => {
        if(!authMode) return <AuthLanding setAuthMode={setAuthMode} />
        else return <AuthModePlayground
                        currentStage={currentStage} 
                        error={error} 
                        loadingCta={loadingCta}
                        currentStageTitle={stages[authMode].stageLabel} />
    }

    return (
        <View style={style.container}>
            {renderChecker()}
        </View>
    )
}

const style = StyleSheet.create({
    container : {
        flex: 1,
        alignItems : 'center',
        justifyContent : 'center',
        width : "90%",
        margin: "5%",
    },
})

export default Login;
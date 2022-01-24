import React, { useState } from 'react';
import { Keyboard, StyleSheet , View } from 'react-native';

import client from '../client';
import useFetch from '../Providers/useFetch';

import { fixNumbers } from '../utils/Date';
import { persister } from '../utils';
import { useDispatch } from '../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen } from '../Store/Slices/authSlice';

import { VerifyInput , PhoneInput , AuthLanding, AuthModePlayground } from '../components/Login';
import VerifyTextHelper from '../components/Login/VerifyTextHelpler';


const { LOGIN } = client.static;

const Login = () => {
    const [authMode, setAuthMode] = useState(null);
    const [inputValue, setInputValue] = useState({});
    const [error, setError] = useState(null);
    const [stage, setStage] = useState(1);
    const [loadingCta, setLoadingCta] = useState(false);
    
    const fetcher = useFetch();
    const storeDispatcher = useDispatch();

    const inputChangeHandler = (key , value) => {
        setError(null);
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }))
    }

    
    function validateVerifyCode() {
        if(inputValue?.verifyCode && inputValue?.verifyCode.length === 4) {
            const { phone , verifyCode } = inputValue;
            setLoadingCta("ورود...");
            getUserDataRequest({ mobile : phone, pass : verifyCode, newPass : verifyCode ,name : "" });
        }else setError("کد تایید صحیح نمیباشد")
    }

    const verificationCodeChangeHandler = value => {
        inputChangeHandler("verifyCode" , value);
        setError(null);
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
                                        storeDispatcher(() => setSeeWelcomeScreen(false))
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
            ctaText : "تایید و ثبت نام",
            backHandler(comeWithWrongNumber) {
                if(comeWithWrongNumber === true) setInputValue({});
                setStage(prev => prev - 1);
            },
            body() {
                return (
                    <View>
                        <VerifyTextHelper phone={inputValue.phone} backHandler={() => this.backHandler(true)} />
                        <VerifyInput
                            value={inputValue?.verifyCode}
                            changeHandler={value => verificationCodeChangeHandler(value)}
                            />  
                    </View>
                )
            },

            ctaHandler() {
                validateVerifyCode();
            },

        },
    }



    const loginStage = {
        stageLabel : "ورود",
        "1" : { ...registerStage[1] },
        "2" : { ...registerStage[2] }
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
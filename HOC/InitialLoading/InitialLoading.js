import React , { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

import LoadingScreen from "./LoadingScreen";

import { useStyleDispatcher } from "../../Hooks/useStyle"

import Login from '../../screens/Login';

import ErrorPage from '../../screens/ErrorPage';

import encrypt from '../../utils/encrypt';
import client from '../../client';
import config from '../../config';
import { persister } from '../../utils';

import { useDispatch, useSelector } from '../../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen, setSystemTime } from '../../Store/Slices/authSlice';
import { Welcome } from '../../screens';
import { setInsCat } from '../../Store/Slices/initialSlice';

import api from '../../api';


const InitialLoading = ({ children }) => {
    const [somethingWentWrong, setSomethingWentWrong] = useState(false);
    const [forceToReRender, setForceToReRender] = useState(0);
    const [loading, setLoading] = useState(true);
    const storeDispatcher = useDispatch();

    const {appKey :  isAuth , seeWelcome} = useSelector(state => state.auth);

    const [fontLoaded , err ] = useFonts({
        light : require("../../assets/fonts/Vazir-Light.ttf"),
        regular : require('../../assets/fonts/Vazir-Regular.ttf'),
        bold : require('../../assets/fonts/Vazir-Bold.ttf'),
        black : require('../../assets/fonts/Vazir-Black.ttf'),
    });


    const styleDispatcher = useStyleDispatcher();

    const resetHandler = () => setForceToReRender(prev => !prev);


    const continueHandler = () => {
        storeDispatcher(() => setSeeWelcomeScreen(true))
    }

    useEffect(() => {
    api.post(`${config.serverPath}/baseApi/getServerTime`)
                .then(({ data }) => {
                    let serverTime = +data.split(" ")[1].split(':')[1];
                    const deviceTime = new Date().getMinutes();
                    storeDispatcher(() => setSystemTime(deviceTime - serverTime));
                    api.post(`${config.serverPath}/baseApi/getAppToken` , {
                        Key : encrypt.encrypt({
                            UserName : config.adminUserName,
                            Password : config.adminPassword,
                        }, serverTime),
                    }).then(({ data : appToken }) => {
                        if(data === client.static.ACCESS_DENIED) throw new Error(appToken);
                        setSomethingWentWrong(null);
                        return appToken
                    })
                    .then(appToken => {
                        return persister.get('userPrivateKey')
                            .then(data => {
                                if(data) {
                                    storeDispatcher(() => setSeeWelcomeScreen(true));
                                    storeDispatcher(() => setAppKey(data));
                                    return api
                                            .post(`${config.serverPath}/MobileApi/getCategories` , {} , {
                                                headers : {
                                                    appToken,
                                                }}).then(({data}) => {
                                                    storeDispatcher(() => setInsCat(data.cat));
                                            })
                                }
                            }).catch(err => {
                                throw new Error(err);
                            }).finally(() => {
                                setLoading(false);
                            })
                    })
                    .catch(err => {
                        setSomethingWentWrong(err.message)
                    })
                })

        const globalStyle = {
            baseBorderRadius : 15,
            primary : '#B05B3B',
            secondary : '#dbe6fd',
            headerTitleColor : "white",
            ctaTextColor : "black",
        }
        styleDispatcher({ globalStyle });

    } , [forceToReRender]);

    if(somethingWentWrong) {
        return <ErrorPage
                    errMessage={somethingWentWrong} 
                    resetHandler={resetHandler} />
    }


    const authRenderChecker = () => {
        if(isAuth) {
            if(!seeWelcome) {
                return <Welcome continueHandler={continueHandler} />
            }else return children
        };
        return <Login />
    }

    return  fontLoaded && !loading ? authRenderChecker() : <LoadingScreen />
}


export default InitialLoading;
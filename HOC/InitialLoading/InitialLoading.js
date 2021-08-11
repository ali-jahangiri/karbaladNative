import React , { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

import { useStyle, useStyleDispatcher } from "../../Hooks/useStyle"
import encrypt from '../../utils/encrypt';
import client from '../../client';
import config from '../../config';
import { makeLeanPallet, persister } from '../../utils';

import { useDispatch, useSelector } from '../../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen, setSystemTime } from '../../Store/Slices/authSlice';
import { setInsCat } from '../../Store/Slices/initialSlice';
import api from '../../api';




import Login from '../../screens/Login';
import InitialErrorPage from '../../screens/InitialErrorPage';
import { Welcome } from '../../screens';
import LoadingScreen from "./LoadingScreen";


const InitialLoading = ({ children }) => {
    const [somethingWentWrong, setSomethingWentWrong] = useState(false);
    const [forceToReRender, setForceToReRender] = useState(0);
    const [loading, setLoading] = useState(true);
    const storeDispatcher = useDispatch();
    const [Inhibitor, setInhibitor] = useState(true);

    const style = useStyle()

    const {appKey :  isAuth , seeWelcome} = useSelector(state => state.auth);

    const [fontLoaded , err ] = useFonts({
        light : require("../../assets/fonts/Vazir-Light.ttf"),
        regular : require('../../assets/fonts/Vazir-Regular.ttf'),
        bold : require('../../assets/fonts/Vazir-Bold.ttf'),
        black : require('../../assets/fonts/Vazir-Black.ttf'),
    });


    const styleDispatcher = useStyleDispatcher();

    useEffect(() => {
        if(err) setSomethingWentWrong(err)
    } , [err])
    
    const resetHandler = () => {
        setLoading(true)
        setSomethingWentWrong(false);
        setForceToReRender(prev => !prev)
    };
    const continueHandler = () => storeDispatcher(() => setSeeWelcomeScreen(true))

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
                            PackageName : config.packageName
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
                                    return api.post("baseData" , {} , { headers : { packageName : config.packageName , appToken } })
                                        .then(({ data }) => {
                                            const { mainData : { components } , manifest } = data;
                                            const globalStyle = makeLeanPallet(components[0].componentStyles)
                                            styleDispatcher(globalStyle)
                                            storeDispatcher(() => setInsCat(data.categories.cat));
                                            setLoading(false)
                                        })
                                }
                            }).catch(err => {
                                throw new Error(err);
                            })
                    })
                    .catch(err => {
                        setSomethingWentWrong(err.message)
                    })
                }).catch(err => setSomethingWentWrong(err.message))

    } , [forceToReRender]);


    useEffect(() => {
        if(!loading) setInhibitor(false)
    } , [loading])


    if(somethingWentWrong) {
        return <InitialErrorPage
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

    return  fontLoaded && !Inhibitor ? authRenderChecker() : <LoadingScreen />
}


export default InitialLoading;
import React , { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

import LoadingScreen from "./LoadingScreen";

import useUserDetails, { UserDetailsProvider } from '../UserDetailsProvider'

import { useStyleDispatcher } from "../../Hooks/useStyle"

import userDataMock from "../../utils/userDetails.mock";
import Login from '../../screens/Login';

import useFetch from "../../Providers/useFetch"

import ErrorPage from '../../screens/ErrorPage';

import encrypt from '../../utils/encrypt';
import client from '../../client';
import config from '../../config';
import { persister } from '../../utils';

import { useDispatch, useSelector } from '../../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen } from '../../Store/Slices/authSlice';
import { Welcome } from '../../screens';


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



    const { setter } = useUserDetails()
    const styleDispatcher = useStyleDispatcher();

    const fetcher = useFetch();


    const resetHandler = () => setForceToReRender(false);


    useEffect(() => {
        console.log('EFFECT DEPEND OF ISAUTH' , !!isAuth);
        resetHandler();
    } , [isAuth])



    const continueHandler = () => {
        storeDispatcher(() => setSeeWelcomeScreen(true))
    }


    useEffect(() => {
        fetcher.post(`${config.serverPath}/baseApi/getServerTime`)
                .then(({ data }) => {
                    let serverTime = +data.split(" ")[1].split(':')[1];
                    fetcher.post(`${config.serverPath}/baseApi/getAppToken` , {
                        Key : encrypt.encrypt({
                            UserName : config.adminUserName,
                            Password : config.adminPassword
                        }, serverTime)

                    }).then(({ data }) => {
                        if(data === client.static.ACCESS_DENIED) throw new Error(data);
                        setSomethingWentWrong(null);
                    })
                    .then(_ => {
                        return persister.get('userPrivateKey')
                            .then(data => {
                                if(data) {
                                    storeDispatcher(() => setSeeWelcomeScreen(true));
                                    storeDispatcher(() => setAppKey(data));
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

        setter(userDataMock)
        const globalStyle = {
            baseBorderRadius : 15,
            primary : '#04009A',
            secondary : '#dbe6fd',
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



const EnhancedWith = (props) => {
    return (
        <UserDetailsProvider>
            <InitialLoading {...props} />
        </UserDetailsProvider>
    )
}


export default EnhancedWith;
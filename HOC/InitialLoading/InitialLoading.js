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


const InitialLoading = ({ children }) => {
    const [somethingWentWrong, setSomethingWentWrong] = useState(false);
    const [forceToReRender, setForceToReRender] = useState(0);

    const [loaded , err ] = useFonts({
        light : require("../../assets/fonts/Vazir-Light.ttf"),
        regular : require('../../assets/fonts/Vazir-Regular.ttf'),
        bold : require('../../assets/fonts/Vazir-Bold.ttf'),
        black : require('../../assets/fonts/Vazir-Black.ttf'),
    });



    const { setter } = useUserDetails()
    const dispatcher = useStyleDispatcher()
    const fetcher = useFetch()


    const resetHandler = () => {
        setForceToReRender(false);
    }

    useEffect(() => {
        
        fetcher.post(`/baseApi/getServerTime`)
                .then(({ data }) => {
                    let serverTime = +data.split(" ")[1].split(':')[1];
                    fetcher.post("/baseApi/getAppToken" , {
                        Key : encrypt.encrypt({
                            UserName : config.adminUserName,
                            Password : config.adminPassword
                        }, serverTime)

                    }).then(({ data }) => {
                        if(data === client.static.ACCESS_DENIED) throw new Error(data);
                        setSomethingWentWrong(null);
                    }).catch(err => {
                        setSomethingWentWrong(err.message)
                    })
                })

        setter(userDataMock)
        const globalStyle = {
            baseBorderRadius : 15,
            primary : '#04009A',
            secondary : '#dbe6fd',
        }
        dispatcher({ globalStyle });

    } , [forceToReRender]);

    if(somethingWentWrong) {
        return <ErrorPage 
                    errMessage={somethingWentWrong} 
                    resetHandler={resetHandler} />
    }

    return  loaded ? <Login /> : <LoadingScreen />
}



const EnhancedWith = (props) => {
    return (
        <UserDetailsProvider>
            <InitialLoading {...props} />
        </UserDetailsProvider>
    )
}


export default EnhancedWith;
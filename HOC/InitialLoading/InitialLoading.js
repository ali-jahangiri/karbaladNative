import React , { useEffect } from 'react';
import { useFonts } from 'expo-font';

import LoadingScreen from "./LoadingScreen";

import useUserDetails, { UserDetailsProvider } from '../UserDetailsProvider'

import { useStyleDispatcher } from "../../Hooks/useStyle"
import api from '../../api';

import userDataMock from "../../utils/userDetails.mock";

const InitialLoading = ({ children }) => {
    // Note put all of your first data fetching , grab styles and mote !
    const [loaded , err ] = useFonts({
        light : require("../../assets/fonts/Vazir-Light.ttf"),
        regular : require('../..//assets/fonts/Vazir-Regular.ttf'),
        bold : require('../../assets/fonts/Vazir-Bold.ttf'),
        black : require('../../assets/fonts/Vazir-Black.ttf'),
    });
    const { setter } = useUserDetails()
    const dispatcher = useStyleDispatcher()


    useEffect(() => {
        setter(userDataMock)
        const globalStyle = {
            baseBorderRadius : 15,
            primary : '#f25998',
            secondary : '#dbe6fd',
        }
        dispatcher({ globalStyle })
    } , []);

    return  loaded ? children : <LoadingScreen />
}



const EnhancedWith = (props) => {
    return (
        <UserDetailsProvider>
            <InitialLoading {...props} />
        </UserDetailsProvider>
    )
}


export default EnhancedWith;
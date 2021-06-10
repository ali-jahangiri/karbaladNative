import React , { useEffect } from 'react';
import { useFonts } from 'expo-font';

import LoadingScreen from "./LoadingScreen";



import { useStyleDispatcher } from "../../Hooks/useStyle"

const InitialLoading = ({ children }) => {
    // Note put all of your first data fetching , grab styles and mote !
    const [loaded , err ] = useFonts({
        light : require("../../assets/fonts/Vazir-Light.ttf"),
        regular : require('../..//assets/fonts/Vazir-Regular.ttf'),
        bold : require('../../assets/fonts/Vazir-Bold.ttf'),
        black : require('../../assets/fonts/Vazir-Black.ttf'),
    });

    const dispatcher = useStyleDispatcher()
    useEffect(() => {
        const globalStyle = {
            baseBorderRadius : 15,
            primary : "#346751",
            secondary : '#dbe6fd',
        }
        dispatcher({ globalStyle })
    } , []);

    return  loaded ? children : <LoadingScreen />
}




export default InitialLoading;
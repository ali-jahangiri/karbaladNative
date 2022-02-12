import React , { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';

import { useStyleDispatcher } from "../../Hooks/useStyle"
import encrypt from '../../utils/encrypt';
import client from '../../client';
import config from '../../config';
import { dataModelExtractor, persister } from '../../utils';

import { useDispatch, useSelector } from '../../Store/Y-state';
import { setAppKey, setSeeWelcomeScreen, setSystemTime } from '../../Store/Slices/authSlice';
import { setInsCat } from '../../Store/Slices/initialSlice';
import api from '../../api';


import Login from '../../screens/Login';
import InitialErrorPage from '../../screens/InitialErrorPage';
import { Welcome } from '../../screens';
import LoadingScreen from "./LoadingScreen";
import { setDynamicComponent } from '../../Store/Slices/dynamicComponentSlice';
import useDataDispatcher from '../../Hooks/useData/useDataDispatcher';


const InitialLoading = ({ children }) => {
    const [somethingWentWrong, setSomethingWentWrong] = useState(false);
    const [forceToReRender, setForceToReRender] = useState(0);
    const [loading, setLoading] = useState(true);
    const storeDispatcher = useDispatch();
    const [Inhibitor, setInhibitor] = useState(true);

    
    const {appKey :  isAuth , seeWelcome} = useSelector(state => state.auth);

    const [fontLoaded , err ] = useFonts({
        light : require("../../assets/fonts/Vazir-Light.ttf"),
        regular : require('../../assets/fonts/Vazir-Regular.ttf'),
        bold : require('../../assets/fonts/Vazir-Bold.ttf'),
        black : require('../../assets/fonts/Vazir-Black.ttf'),
    });


    const styleDispatcher = useStyleDispatcher();
    const dataDispatcher = useDataDispatcher();


    useEffect(() => {
        if(err) setSomethingWentWrong(err)
    } , [err])
    
    const resetHandler = () => {
        setLoading(true)
        setSomethingWentWrong(false);
        setForceToReRender(prev => !prev)
    };
    const continueHandler = () => storeDispatcher(() => setSeeWelcomeScreen(true));

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
                        
                        if(data === client.static.ACCESS_DENIED) throw new Error("دسترسی بسته شده");
                        setSomethingWentWrong(null);
                        return appToken
                    })
                    .then(appToken => {
                        return persister.get('userPrivateKey')
                            .then(data => {
                                if(data) {
                                    storeDispatcher(() => setSeeWelcomeScreen(true));
                                    storeDispatcher(() => setAppKey(data));
                                }
                                return api.post("getMainData" , {} , { headers : { packageName : config.packageName , appToken } })
                                    .then(({ data: basePackageData }) => {
                                        const baseDatas = JSON.parse(basePackageData.data).pagesDetails[0];

                                        const [header , body , bottomNavigator] = baseDatas.Components;

                                        const headerExtractor = dataModelExtractor(header);
                                        const bodyExtractor = dataModelExtractor(body);
                                        const bottomNavigatorExtractor = dataModelExtractor(bottomNavigator);

                                        const headerStyle = {
                                            indexHeader : headerExtractor("type"),

                                            headerFontSize :  headerExtractor("titleFontSize") ,
                                            headerBgColor :  headerExtractor("bgColor") ,
                                            headerHeight : headerExtractor("height") ,
                                            headerTitleColor : headerExtractor("titleColor"),
                                            headerBrandIconSize : +headerExtractor("brandIconSize"),
                                        }


                                        const bodyStyle = {
                                            primary : bodyExtractor("primary"),
                                            ctaTextColor : bodyExtractor("ctaTextColor"),
                                            baseBorderRadius : +bodyExtractor("baseBorderRadius"),
                                        }

                                        const buttonNavigationStyle = {
                                            showTitle : bottomNavigatorExtractor("showTitle"),
                                            iconSize : +bottomNavigatorExtractor("iconSize"),
                                            titleTextColor : bottomNavigatorExtractor("titleTextColor"),
                                            titleFontSize : +bottomNavigatorExtractor("titleFontSize"),
                                            navigatorContainerHeight : +bottomNavigatorExtractor("containerHeight"),
                                        }
                                        
                                        const configStyle = {
                                            ...headerStyle,
                                            ...bodyStyle,
                                            ...buttonNavigationStyle,
                                        }

                                        return api.post("getInsuranceCategories" , {} , { headers : { packageName : config.packageName , appToken } })
                                            .then(({ data : categories }) => {
                                                dataDispatcher({ 
                                                    businessIcon : "" , 
                                                    termsAndConditions: body.ComponentDatas.find(el => el.Name === "termsAndConditions")?.Value, 
                                                    welcomePageContent : body.ComponentDatas.find(el => el.Name === "welcomePageContent")?.Value,
                                                    menu : basePackageData?.menu || [] , 
                                                    homeIcon : bottomNavigator.ComponentDatas.find(el => el.Name === "homeIcon")?.Value , 
                                                    brandIcon : header.ComponentDatas.find(el => el.Name === "brandIcon").Value });
                                                styleDispatcher(configStyle);
                                                storeDispatcher(() => setInsCat(categories));

                                                return api.post("getActivityData" , {
                                                    Guid : "صفحه_اصلی_(موبایل)"
                                                } , { headers : { packageName : config.packageName , appToken } })
                                                    .then(({ data : homePageDetails }) => {
                                                        storeDispatcher(() => setDynamicComponent(homePageDetails.pagesDetails[0].Components))
                                                        setLoading(false);
                                                    })
                                            })
                                    })
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
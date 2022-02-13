import { useNavigation } from '@react-navigation/native';
import React , { useState , useEffect } from 'react';
import useFetch from '../../Providers/useFetch';

const useScreenDynamic = (screen) => {
    const [loading, setLoading] = useState(true);
    const [screenDetails, setScreenDetails] = useState({
        screenStyle : {},
        screenData : {},
        components : [],
    });

    const fetcher = useFetch();
    const navigation = useNavigation();
    const goHomeHandler = () => navigation.navigate('home');


    useEffect(function getScreenInitialDetails() {
        fetcher("getActivityData" , { Guid : screen })
            .then(({ data }) => {
            const { Components , PageDatas , PageStyles } = data.pagesDetails[0];
            setScreenDetails({
                components : Components,
                screenData : PageDatas,
                screenStyle : PageStyles,
            });
            setLoading(false);
        }).catch(err => {
            goHomeHandler();
            // TODO 
            // show alert
        })
    } , []);

    function screenDetailsExtractor(type , targetProperty) {
        const { Value , SetByCustomer } = screenDetails[type === "data" ? "screenData" : "screenStyle"].find(el => el.Name === targetProperty)
        return {
            value : Value,
            setByCustomer : SetByCustomer
        }
    }

    return [loading , screenDetails , screenDetailsExtractor];
}


export default useScreenDynamic;
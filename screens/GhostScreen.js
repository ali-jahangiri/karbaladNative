import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Para from '../components/Para';
import useFetch from '../Providers/useFetch';

import LoadingScreen from "../HOC/InitialLoading/LoadingScreen";
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';

const GhostScreen = ({ guid , routeName }) => {
    
    const fetcher = useFetch();
    const [loading , setLoading] = useState(true);
    const [componentList , setComponentList] = useState([])

    useEffect(() => {
        fetcher("getActivityData" , { Guid : guid })
            .then(({ data }) => {
                const componentList = data.pagesDetails[0].Components;
                setComponentList(componentList);
                setLoading(false);
            })
    } , []);

    return loading ? <LoadingScreen /> :  (
        <View>
            <HeaderProvider title={routeName} />
            <ComponentGenerator itemListForRender={componentList} />
        </View>
    )
}


export default GhostScreen;
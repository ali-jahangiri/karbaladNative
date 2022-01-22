import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Para from '../components/Para';
import useFetch from '../Providers/useFetch';

import LoadingScreen from "../HOC/InitialLoading/LoadingScreen";
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';

const GhostScreen = ({ guid , routeName }) => {
    
    const fetcher = useFetch();
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        fetcher("getActivityData" , { Guid : guid })
            .then(({ data }) => {
                console.log(data);
                setLoading(false);
            })
    } , []);

    return loading ? <LoadingScreen /> :  (
        <View>
            <HeaderProvider title={routeName} />
            <Para>Rerum laboriosam dolores et. Sed sequi consequatur tenetur iure quia corporis fuga sed modi. Id aut minima voluptatem omnis dolorum a. Modi consequuntur nemo sint voluptatem inventore at rerum. Soluta voluptate ea quia repellendus.</Para>
        </View>
    )
}


export default GhostScreen;
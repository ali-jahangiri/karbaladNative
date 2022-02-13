import { useIsFocused } from '@react-navigation/native';
import React , { useState , useEffect } from 'react';
import Toast from 'react-native-toast-message';

import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';
import InsuranceHistoryDirectory from './InsuranceHistoryDirectory';
import Loading from './Loading';


const DefaultMyInsurance = ({ haveNestedComponents }) => {
    const [insItems, setInsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const navHash = useSelector(state => state.navigation.navigationHash)
    const fetcher = useFetch();
    const isFocused = useIsFocused();

    const dataFetcherInstance = () => {
        return fetcher("UserInsurance")
                .then(({ data }) => {
                    setInsItems(JSON.parse(JSON.stringify(data)));
                })
    }


    useEffect(() => {
        if(loading) {
            dataFetcherInstance()
                .then(() => setLoading(false));
        }else {
            dataFetcherInstance()
                .then(() => {
                    Toast.show({
                        type: 'refreshToast',
                        visibilityTime : 1000,
                    });
                })
        }
    } , [navHash , isFocused])

    if(loading) return <Loading />;
    return <InsuranceHistoryDirectory haveNestedChild={haveNestedComponents} items={insItems} />;
}


export default DefaultMyInsurance;
import React , { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import InsuranceHistoryItem from './InsuranceHistoryItem';


const InsuranceHistoryDirectory = ({item}) => {
    const container = useRef();
    useScrollToTop(container);

    return (
        <ScrollView ref={container}>
            {
                item.map((el,i) => <InsuranceHistoryItem key={i} {...el} />)
            }
        </ScrollView>
    )
}


export default InsuranceHistoryDirectory;
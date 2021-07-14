import React , { useRef } from 'react';
import { ScrollView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

import InsuranceHistoryItem from './InsuranceHistoryItem';

import EmptyScreen from "../screens/EmptyScreen";
import client from '../client';

const InsuranceHistoryDirectory = ({item}) => {
    const container = useRef();
    item.length && useScrollToTop(container);

    return item.length ? (<ScrollView ref={container}>
                            {
                                item.map((el,i) => <InsuranceHistoryItem key={i} {...el} />)
                            }
    </ScrollView> ) : <EmptyScreen desc={client.static.EMPTY_SCREEN_INSURANCE_HISTORY} />

}


export default InsuranceHistoryDirectory;
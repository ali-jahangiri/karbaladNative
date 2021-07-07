import React from 'react';
import { ScrollView } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

import TabScreenHeader from '../components/TabScreenHeader';
import InsHistoryImageItem from '../components/InsHistoryImageItem';

const InsuranceHistoryImages = ({ navigation , route : { params } }) => {
    console.log(params);
    return (
        <ScreenWrapper>
            <TabScreenHeader navigation={navigation} title="تصاویر بیمه نامه" />
            <ScrollView>
                <InsHistoryImageItem />
                <InsHistoryImageItem />
                <InsHistoryImageItem />
                <InsHistoryImageItem />
            </ScrollView>
        </ScreenWrapper>
    )
}




export default InsuranceHistoryImages;
import React from 'react';
import { ScrollView, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';

import TabScreenHeader from '../components/TabScreenHeader';
import InsHistoryImageItem from '../components/InsHistoryImageItem';
import EmptyScreen from './EmptyScreen';

const InsuranceHistoryImages = ({ navigation , route : { params } }) => {
    return (
        <ScreenWrapper >
            <TabScreenHeader navigation={navigation} title="تصاویر بیمه نامه" />
            <ScrollView contentContainerStyle={{ flex : params.insImages.length ? 0 : 1 }}>
                {
                    params.insImages.length ? params.insImages.map((el , i) => <InsHistoryImageItem index={i + 1} src={el} />) 
                    : <View style={{ height : "100%" , flex : 1 }}>
                        <EmptyScreen message="تصویری برای این بیمه وجود ندارد" />
                    </View>
                }
            </ScrollView>
        </ScreenWrapper>
    )
}

export default InsuranceHistoryImages;
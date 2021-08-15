import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from '../components/Para';
import ScreenWrapper from '../components/ScreenWrapper';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';

import InsDetailsPay from "../components/InsDetailsPay"


const MoreDetailsPay = ({ navigation , route : { params : { items , payResponse } } }) => {
    const appendStyle =  useStyle(style);

    return (
        <ScreenWrapper style={appendStyle.container}>
            <HeaderProvider isNested title="جزئیات بیمه نامه"  />
            <DirectionProvider>
            <InsDetailsPay {...payResponse} />
                <View style={appendStyle.itemContainer}>
                    <ScrollView>
                        {
                            items?.map((el , i) => (
                                <View style={appendStyle.item} key={i}>
                                    <View style={{ flexDirection : 'row' , alignItems : 'center' , justifyContent : 'flex-end'}}>
                                        <Para size={14} color="grey">{el.lable}</Para>
                                        <View style={appendStyle.bullet} />
                                    </View>
                                    <Para size={16} weight="bold">{toFarsiNumber(el.show_Value)}</Para>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </DirectionProvider>
        </ScreenWrapper>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    item : {
        marginBottom : 15
    },
    itemContainer : {
        width: "90%",
        marginHorizontal : "5%",
        flex : 1,
    },
    bullet : {
        width: 10,
        height: 10,
        backgroundColor : generateColor(primary , 8),
        borderRadius : baseBorderRadius,
        marginLeft : 10
    }
})

export default MoreDetailsPay;
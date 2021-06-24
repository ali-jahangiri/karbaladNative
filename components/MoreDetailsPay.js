import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from './Para';
import ScreenWrapper from './ScreenWrapper';
import TabScreenHeader from './TabScreenHeader';

const MoreDetailsPay = ({ navigation , route : { params : { items } } }) => {
    const appendStyle =  useStyle(style);
    const { primary } = useStyle()
    return (
        <ScreenWrapper style={appendStyle.container}>
            <TabScreenHeader extendStyle={{ backgroundColor : generateColor(primary , 5)}} navigation={navigation} title="جزئیات بیمه نامه"  />
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={appendStyle.comeBack}>
                    <Para style={appendStyle.comeBackText} weight="bold" align="center">بازگشت</Para>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {},
    item : {
        marginBottom : 15
    },
    itemContainer : {
        width: "90%",
        marginHorizontal : "5%",
        flex : 1,
    },
    comeBack : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding : 15
    },
    comeBackText : {
        color: primary
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
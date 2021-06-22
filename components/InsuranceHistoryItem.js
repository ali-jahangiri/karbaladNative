import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';


import { generateColor , statusChecker} from '../utils';

import Para from './Para';

import NextStepBtn from './NextStepBtn';
import { useNavigation } from '@react-navigation/core';


const InsuranceHistoryItem = props => {
    const { categorysFullName , createTime ,  insuranceCoName , factorModeId} = props;

    const appendStyle = useStyle(style);
    const { primary } = useStyle()
    
    const navigation = useNavigation()

    return (
        <View style={appendStyle.container}>
            <NextStepBtn containerBgColor={generateColor(primary , 5)} onPress={() => navigation.push('insuranceHistoryDetails' , props)} />
            <View style={{ flex: .8 }}>
                <Para size={14} weight="bold">{categorysFullName}</Para>
                <View style={appendStyle.detailContainer}>
                    <Para color="grey">{new Date(createTime).toLocaleDateString('fa-IR')}</Para>
                    <View style={appendStyle.divider} />
                    <Para>{insuranceCoName}</Para>
                </View>
            </View>
            
            <View style={appendStyle.icon}>
                <Image source={{
                    uri : "https://logosource.ir/wp-content/uploads/2019/09/bime-parsian.jpg" , 
                    width: "100%",
                    height: "100%"
                }} />
                <View style={[appendStyle.statusBadge , {backgroundColor : statusChecker(factorModeId).color}]} />
            </View>
        </View>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'space-between',
        marginVertical : 20,
        marginHorizontal : "5%",
        width: "90%",
        },
        icon : {
            width : 60,
            height: 60,
        },
        divider : {
            width: 10,
            backgroundColor : generateColor(primary , 5),
            height: 2,
        },  
        detailContainer : {
            flexDirection : 'row',
            alignItems : 'center',
            maxWidth: "90%",
            marginLeft : "10%",
            justifyContent : 'space-between',
            marginVertical : 5
        },
        statusBadge : {
            width : 10,
            height : 10,
            backgroundColor : 'red',
            position: 'absolute',
            borderRadius : 5,
            right : 0
        }
})


export default InsuranceHistoryItem;
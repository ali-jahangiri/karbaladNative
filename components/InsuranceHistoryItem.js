import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Persian from "persian-date";


import { generateColor , imageFinder, statusChecker} from '../utils';

import Para from './Para';

import DirectionCta from './DirectionCta';
import { useNavigation } from '@react-navigation/core';


const InsuranceHistoryItem = props => {
    const { categorysFullName , createTime ,  insuranceCoName , factorModeId , iconUrl} = props;
    
    const appendStyle = useStyle(style);
    const { primary } = useStyle();
    
    const navigation = useNavigation()
    
    const now = new Persian(createTime);
    
    console.log({...props} , "sgit");

    const pressHandler = () => {
        navigation.navigate('insuranceHistoryDetails' , { ...props })
    }

    return (
        <View style={appendStyle.container}>
            <DirectionCta containerBgColor={generateColor(primary , 5)} onPress={pressHandler} />
            <View style={{ flex: .8 }}>
                <Para size={14} weight="bold">{categorysFullName}</Para>
                <View style={appendStyle.detailContainer}>
                    <Para color="grey">{now.format("YYYY/MM/DD")}</Para>
                    <View style={appendStyle.divider} />
                    <Para>{insuranceCoName}</Para>
                </View>
            </View>
            
            <View style={appendStyle.icon}>
                <Image resizeMode="contain" source={{
                    uri : imageFinder(iconUrl) , 
                    width: "100%",
                    height: "100%"
                }} />
                <View style={[appendStyle.statusBadge , {backgroundColor : statusChecker(factorModeId).color}]} />
            </View>
        </View>
    )
}

const style = ({ primary }) => StyleSheet.create({
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
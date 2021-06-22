import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { imageFinder, toFarsiNumber } from '../utils';
import Para from './Para';



const InsDetailsPay = ({ iconUrl , id , createTime , categorysFullName , insuranceCoName }) => {
    const appendStyle = useStyle(style);

    return (
        <View style={appendStyle.container}>
            <View style={{ justifyContent : "center" , flexDirection : "row" }}>
                <Image resizeMode="center" source={{
                    uri : imageFinder(iconUrl),
                    width: 80,
                    height: 80
                }} />
            </View>
            <View style={{ flexDirection : "row" , justifyContent : 'space-between' }}>
                    <Para color="grey">{insuranceCoName}</Para>
                    <Para size={16}>{categorysFullName}</Para>
            </View>
            <View style={appendStyle.row}>
                <View>
                    <Para color="grey">شماره پیگیری</Para>
                    <Para size={16}>{toFarsiNumber(id)}</Para>
                </View>
                <View>
                    <Para color="grey">تاریخ ثبت </Para>
                    <Para size={16}>{new Date(createTime).toLocaleDateString('fa-IR')}</Para>
                </View>
            </View>
        </View>
    )
}

const style = () => StyleSheet.create({
    container : {
        marginVertical : 30
    },  
    row : {
        flexDirection : "row",
        justifyContent : 'space-between',
        // width: "90%",
        // marginHorizontal : "5%",
        marginTop : 10
    }
})

export default InsDetailsPay;
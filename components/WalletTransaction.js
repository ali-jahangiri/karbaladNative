import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { numberSeparator, toFarsiNumber } from '../utils';
import Para from './Para';


const WalletTransaction = ({ title , createTime , amount , lineResult , index }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle()

    const time = (() => {
        let ISOTime = new Date(createTime).toTimeString()
        return ISOTime.slice(0 , ISOTime.indexOf(" "))
    })()
    
    return (
        <View style={appendStyle.container}>
            <View style={{ flexDirection : "row" , justifyContent : 'flex-end' , alignItems : "center" }}>
                <Para weight="bold">{title}</Para>
                <View style={appendStyle.index}>
                    <Para color="grey">{toFarsiNumber(index)}</Para>
                </View>
            </View>
            <View style={{ flexDirection : "row" , justifyContent : 'space-between' , alignItems : "center" , width : "95%" , marginHorizontal :"2.5%" , marginTop : 10}}>
                <View style={appendStyle.amount}>
                    <Para color={amount < 0 ? "black" : primary}>تومان</Para>
                    <Para size={18} weight="bold" color={amount < 0 ? "black" : primary}>{numberSeparator(toFarsiNumber(amount))}</Para>
                </View>
                <View style={appendStyle.time}>
                    <Para>{`${toFarsiNumber(new Date(createTime).toLocaleDateString('fa-IR'))}`}</Para>
                    <Para> - </Para>
                    <Para color="grey">{toFarsiNumber(time)}</Para>
                </View>
            </View>
        </View>
    )
}   

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        marginVertical : 20,
        width: "90%",
        marginHorizontal : "5%"
    },
    time : {
        flexDirection : "row",
        alignItems : "center"
    },
    amount : {
        flexDirection : "row",
        alignItems : 'center'
    },
    index : {
        backgroundColor : "lightgrey",
        width: 40,
        height : 40,
        alignItems : "center",
        justifyContent : 'center',
        borderRadius : baseBorderRadius,
        marginLeft : 10
    }
})

export default WalletTransaction;
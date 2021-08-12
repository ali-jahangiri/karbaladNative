import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../../utils';
import Para from '../Para';


const VerifyTextHelper = ({ phone , backHandler }) => {
    const { primary } = useStyle();

    return (
        <View style={{ flexDirection : "row" , flexWrap : "wrap" ,  justifyContent : "flex-end"}}>
            <Para color="grey" weight="bold"> {toFarsiNumber(phone)} </Para>
            <Para color="grey">کد چهار رقمی ارسال شده به شماره </Para>
            <TouchableOpacity onPress={backHandler}>
                <Para color={generateColor(primary , 8)} style={{ marginHorizontal: 10 }}>شماره اشتباه است ؟ </Para>
            </TouchableOpacity>
            <Para color="grey">را وارد کنید</Para>
        </View>
    )
}


export default VerifyTextHelper;
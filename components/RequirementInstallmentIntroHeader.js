import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import DirectionCta from './DirectionCta';
import Para from './Para';



const RequirementInstallmentIntroHeader = () => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    const navigation = useNavigation();

    const goHomeHandler = () => navigation.navigate("home")

    return (
        <View style={appendStyle.container}>
            <DirectionCta containerBgColor={generateColor(primary , 4)} onPress={goHomeHandler} />
            <View style={appendStyle.titleContainer}>
                <Para size={20} weight="bold">تکمیل مشخصات</Para>
                <View style={{ width : 20 , height : 20 , borderRadius : 8 , marginLeft : 10 , backgroundColor : generateColor(primary , 5) }} />
            </View>
        </View>
    )
}


const style = () => StyleSheet.create({
    container : {
        flexDirection : "row" , 
        alignItems : 'center' , 
        width : "100%" , 
        justifyContent : 'space-between'
    },
    titleContainer : {
        flexDirection : "row" , 
        alignItems : 'center'
    }
})

export default RequirementInstallmentIntroHeader;
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';



const BadgeHeader = ({ title , isNested }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();
    const navigation = useNavigation();
    
    return (
        <View style={appendStyle.container}>
            {
                isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />
            }
            
            {
                typeof title === 'string' ? <View style={appendStyle.badge}>
                <Para color={primary} size={22} weight="bold">{title}</Para>
            </View> : title
            }
        </View>
    )
}



const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : "center",
        justifyContent : 'space-between',
        marginTop : StatusBar.currentHeight + 20,
        width : "90%",
        marginHorizontal : "5%",
        marginBottom : 10
    },
    badge : {
        padding : 10,
        paddingHorizontal : 30,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 1)
    }
})

export default BadgeHeader;
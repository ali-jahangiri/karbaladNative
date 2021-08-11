import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const BoxHeader = ({ title , isNested }) => {
    const appendStyle = useStyle(style);
    const { headerTitleColor , primary } = useStyle();
    const navigation = useNavigation();
    
    return (
        <View style={appendStyle.container}>
            {
                isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />
            }
            
            {
                typeof title === 'string' ? <Para color={headerTitleColor} size={22} weight="bold" >{title}</Para> : title
            }
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        backgroundColor : generateColor(primary , 9),
        marginBottom : 15,
        borderRadius : baseBorderRadius,
        marginTop : StatusBar.currentHeight + 10,
        width : "90%",
        marginHorizontal : "5%",
        padding : 20,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    }
})

export default BoxHeader;
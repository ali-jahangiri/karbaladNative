import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const NegativeHeader = ({ title , isNested }) => {
    const appendStyle = useStyle(style , isNested);
    const { headerTitleColor , primary , headerFontSize } = useStyle();

    const navigation = useNavigation();

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                    {isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />}
                    {typeof title === 'string' ? <Para color={headerTitleColor} size={+headerFontSize} weight="bold" >{title}</Para> : title} 
            </View>
        </View>
    )
}


const style = ({ headerHeight , headerBgColor , nestedHeaderHeight } , isNested) => StyleSheet.create({
    container : {
        height : isNested ? Number(nestedHeaderHeight) * 5 : Number(headerHeight) * 5,
        backgroundColor : headerBgColor,
        paddingBottom : 15,
        alignItems :'center',
        justifyContent : 'center',
        marginBottom : -50
    },
    innerContainer : {
        width : "90%",
        marginHorizontal : "5%",
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    }
})

export default NegativeHeader;
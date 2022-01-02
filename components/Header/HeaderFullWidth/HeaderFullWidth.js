import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const HeaderFullWidth = ({ title , isNested })  => {
    const appendStyle = useStyle(style , isNested);
    const { headerTitleColor , primary , headerFontSize } = useStyle();

    const navigation = useNavigation();

    

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                    {
                        isNested  ? isNested === true ? <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />
                    }
                    {typeof title === 'string' ? <Para color={headerTitleColor} size={+headerFontSize} weight="bold" >{title}</Para> : title}
            </View>
        </View>
    )
}


const style = ({ headerBgColor , headerHeight , nestedHeaderHeight } , isNested ) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : headerBgColor,
        paddingTop : StatusBar.currentHeight + ((isNested ? Number(nestedHeaderHeight) : Number(headerHeight)) / 2),
        paddingBottom : Number(headerHeight),
        marginBottom : 10,
        
    },
    innerContainer : {
        width : "90%",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginHorizontal : "5%"
    }
})

export default HeaderFullWidth;
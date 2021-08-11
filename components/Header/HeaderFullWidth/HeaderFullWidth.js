import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const HeaderFullWidth = ({ title , isNested })  => {
    const appendStyle = useStyle(style);
    const { headerTitleColor , primary } = useStyle();

    const navigation = useNavigation()

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                    {
                        isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />
                    }
                    
                    {typeof title === 'string' ? <Para color={headerTitleColor} size={26} weight="bold" >{title}</Para> : title}
            </View>
        </View>
    )
}


const style = ({ primary }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        backgroundColor : generateColor(primary , 9),
        paddingTop : StatusBar.currentHeight + 30,
        paddingBottom : StatusBar.currentHeight + 10,
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
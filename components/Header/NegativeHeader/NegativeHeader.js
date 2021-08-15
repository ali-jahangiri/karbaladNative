import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import DirectionCta from '../../DirectionCta';
import Para from '../../Para';


const NegativeHeader = ({ title , isNested }) => {
    const appendStyle = useStyle(style);
    const { headerTitleColor , primary } = useStyle();

    const navigation = useNavigation();

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                    {isNested ? isNested === true ?  <DirectionCta containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} /> : isNested : <View />}
                    {typeof title === 'string' ? <Para color={headerTitleColor} size={22} weight="bold" >{title}</Para> : title} 
            </View>
        </View>
    )
}


const style = ({ primary }) => StyleSheet.create({
    container : {
        height : 180,
        backgroundColor : generateColor(primary , 5),
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
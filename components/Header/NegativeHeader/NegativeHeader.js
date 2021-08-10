import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../../../Hooks/useStyle';
import { generateColor } from '../../../utils';
import Para from '../../Para';


const NegativeHeader = ({ title }) => {
    const appendStyle = useStyle(style);
    const { headerTitleColor } = useStyle()
    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <View></View>
                <Para color={headerTitleColor} size={22} weight="bold">{title}</Para>
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
        justifyContent : 'center'
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
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';

const ProfileRow = ({ icon , label , children }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    const [isCollapse, setIsCollapse] = useState(false);

    const childrenChecker = () => {
        if(typeof children === "function") return children(setIsCollapse);
        else return children
    }
    
    return (
        <View style={appendStyle.container}> 
            <View style={appendStyle.header}>
                <View style={appendStyle.introBox}>
                    <Para weight="bold" size={18}>{label}</Para>
                    <View style={appendStyle.icon}>
                        <Feather name={icon} size={24} color={primary} />
                    </View>
                </View>
                <TouchableOpacity onPress={() => setIsCollapse(prev => !prev)} style={appendStyle.openCtaContainer}>
                    <Feather name={`chevron-${isCollapse ? 'up' : "down"}`} size={24} color={isCollapse ? primary : "black"} />
                </TouchableOpacity>
            </View>
            {
                isCollapse ? <View style={appendStyle.contentContainer}>
                { childrenChecker() } 
            </View> : null
            }
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        marginVertical : 15,
    },
    header : {
        flexDirection : 'row-reverse',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    contentContainer : {
        marginTop : 10
    },
    introBox : {
        flexDirection : "row",
        alignItems : 'center',
    },
    openCtaContainer : {
        padding: 15,
    },
    icon : {
        backgroundColor : generateColor(primary , 3),
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 10,
        padding : 15,
        borderRadius : baseBorderRadius
    },

})

export default ProfileRow;
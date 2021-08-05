import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';



const Drawer = ({ children , extendStyle , onCancel , onDone , title , showController , onClose }) => {
    const appendStyle = useStyle(style , extendStyle , showController);
    return (
        <View style={appendStyle.container}>
            <TouchableOpacity activeOpacity={1} onPress={onClose} style={appendStyle.overlay} />
            <View style={appendStyle.content}>
            <Para style={{ marginTop : 20 }} align="center" weight="bold" size={18}>{title}</Para>
                <View style={{ flex : 1 }}>
                    {children}
                </View>
                {
                    showController ? <View style={appendStyle.ctaContainer}>
                    <TouchableOpacity onPress={onDone} style={appendStyle.doneCta}>
                        <Para weight="bold" align="center">اعمال تغییرات</Para>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onCancel} style={appendStyle.cancelChange}>
                        <Para weight="bold" align="center">انصراف</Para>
                    </TouchableOpacity>
                    </View> : null
                }
            </View>
        </View>
    )
}


const style = ({ baseBorderRadius , primary } , extendStyle , isControllerEnable) => StyleSheet.create({
    container : {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor : "#2e2e225e",
    },
    overlay : {
        backgroundColor : "transparent",
        flex: .8
    },  
    content : {
        width: "100%",
        flex: isControllerEnable ? 1.2 : .8,
        backgroundColor : "white",
        borderTopRightRadius : 20,
        borderTopLeftRadius : baseBorderRadius,
        ...extendStyle
    },
    doneCta : {
        flex: 1,
        padding: 15,
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,

    },
    ctaContainer : {
        flexDirection : 'row',
        width: "90%",
        marginHorizontal : "5%",

    },
    cancelChange : {
        flex: 1,
        padding: 15
    }
})

export default Drawer;
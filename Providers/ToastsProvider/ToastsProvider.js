import React from 'react';
import { View , StyleSheet } from "react-native";
import Toast from 'react-native-toast-message';
import Para from '../../components/Para';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const BaseToastContainer = ({ text , icon , toastPrimary , onFlyStyle }) => {
   const appendStyle = useStyle(baseToastContainerStyle , toastPrimary , onFlyStyle);

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.innerContainer}>
                <Para style={appendStyle.text}>{text}</Para>
                <View style={appendStyle.iconContainer}>
                    <View style={appendStyle.innerIconContainer}>
                        {icon}
                    </View>
                </View>
            </View>
        </View>
    )
}

const baseToastContainerStyle = ({ baseBorderRadius } , toastPrimary , onFlyStyle ) => StyleSheet.create({
    container : {
        borderRadius : baseBorderRadius,
        height: 60, 
        width: '90%',
        backgroundColor : "white",
        ...onFlyStyle,
    },
    text : {
        fontFamily : "bold",
        color : "#626262",
        padding : 20
    },
    innerIconContainer : {
        width : "70%",
        height : "70%",
        backgroundColor : "white",
        borderRadius : "50%",
        borderRadius : baseBorderRadius * 2,
        alignItems : 'center',
        justifyContent : "center",
    },
    innerContainer : {
        borderRadius : baseBorderRadius,
        width : "100%",
        height : "100%",
        justifyContent : "flex-end",
        alignItems : "center",
        flexDirection : "row",
        backgroundColor : generateColor(toastPrimary , 1),
        paddingHorizontal : 10,
    },
    iconContainer : {
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(toastPrimary , 7),
        width : 40,
        height : 40,
        alignItems : "center",
        justifyContent : 'center',
    }
})

const toastConfig = {
    success: (props) => (
        <BaseToastContainer onFlyStyle={props?.props?.onFlyStyle} toastPrimary={"#39b35a"} text={props.text1} icon={props?.props?.icon || <MaterialCommunityIcons name="star-four-points-outline" size={20} color="#39b35a" />} />
    ),
    info: (props) => (
        <BaseToastContainer onFlyStyle={props?.props?.onFlyStyle} toastPrimary={"#006ce0"} text={props.text1} icon={props?.props?.icon || <Ionicons name="information"  size={20} color="#006ce0" />} />
    ),
    error : props => (
        <BaseToastContainer text={props.text1} toastPrimary={'#ea4e2c'} icon={<Ionicons name="warning-outline" size={20} color="#ea4e2c" />} />
    ),
    refreshToast : ({ text1 , props }) => (
        <BaseToastContainer onFlyStyle={{ width : "50%" }} text={"بروزرسانی اطلاعات"} icon={<MaterialCommunityIcons name="star-four-points-outline" size={20} color="#006ce0" />} toastPrimary="#006ce0" />
    )
  };

const ToastsProvider = () => {
    // const { navigatorContainerHeight } = useStyle();

    return (
        <Toast
            position='bottom'
            config={toastConfig}
        />
    )
}


export default ToastsProvider;
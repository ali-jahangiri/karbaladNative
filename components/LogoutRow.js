import { SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useStyle } from "../Hooks/useStyle";
import { setAppKey } from "../Store/Slices/authSlice";
import { setTabBarState } from "../Store/Slices/uiSlice";
import { useDispatch } from "../Store/Y-state";
import { generateColor, persister } from "../utils";
import Para from './Para';

const LogoutRow = () => {
    const appendedStyle = useStyle(style);
    const storeDispatcher = useDispatch();
    
    const logoutHandler = () => {
        storeDispatcher(() => setTabBarState("transparent"));
        persister
            .remove('userPrivateKey')
                .then(_ => {
                    persister.remove("userName")
                        .then(response => {
                            storeDispatcher(() => setAppKey(''))
                        })
                });
    }
    return (
        <TouchableOpacity style={appendedStyle.container} onPress={logoutHandler}>
            <SimpleLineIcons style={{ marginRight : 17 }} name="logout" size={16} color="red" />
            <Para color="red" size={16}>خروج</Para>
        </TouchableOpacity>
    )
}


const style = () => StyleSheet.create({
    container : {
        width: "90%",
        padding: 15,
        marginTop : 10,
        marginHorizontal : "5%",
        backgroundColor : generateColor('#CF0000' , 1),
        borderRadius : 5,
        alignItems : "center",
        flexDirection : "row",
        justifyContent : 'center'
    },
})

export default LogoutRow;
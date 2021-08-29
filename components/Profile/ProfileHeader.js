import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { setAppKey } from '../../Store/Slices/authSlice';
import { setTabBarState } from '../../Store/Slices/uiSlice';
import { useDispatch } from '../../Store/Y-state';
import { generateColor, persister } from '../../utils';
import Para from '../Para';

const ProfileHeader = ({ userData }) => {
    const appendStyle = useStyle(style);
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
        <View style={appendStyle.container}>
                <View style={appendStyle.headerCtaContainer}>
                    <TouchableOpacity style={appendStyle.logout} onPress={logoutHandler}>
                            <Feather name="log-out" size={20} color="red" />
                    </TouchableOpacity>
                    </View>
                <View style={appendStyle.avatar}>
                    <View style={appendStyle.avatarImage} />
                    <Para weight="bold" color="#050513" size={22}>
                        {userData?.fullName || userData.mobile_UserName}
                    </Para>
                    {
                        userData?.fullName ? <Para color="#536162">{userData.mobile_UserName}</Para> :null
                    }
                </View>
        </View>
    )
}


const style = ({  baseBorderRadius }) => StyleSheet.create({
    avatarImage : {
        width : 100,
        height : 100,
        backgroundColor : "#2e2e2e2e",
        borderRadius : baseBorderRadius,
        marginBottom : 10,
    },  
    container : {
        marginTop : StatusBar.currentHeight + 5
    },
    headerCtaContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        width: "90%",
        marginHorizontal : "5%"
    },
    logout : {
        flexDirection : 'row',
        justifyContent : 'center',
        backgroundColor : generateColor('#CF0000' , 1),
        borderRadius : baseBorderRadius,
        padding: 15
    },
    avatar : {
        width: "80%",
        justifyContent : 'center',
        alignItems : 'center',        
        marginHorizontal : '10%',
        marginBottom : 15
    },
})

export default ProfileHeader;
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor, persister } from '../../utils';
import Para from '../Para';

const ProfileHeader = ({ userData }) => {
    const appendStyle = useStyle(style);
    
    const logoutHandler = () => {
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
                            {/* <Para weight="bold" color="red" size={14}>خروج</Para> */}
                    </TouchableOpacity>
                    </View>
                <View style={appendStyle.avatar}>
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


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        backgroundColor : generateColor(primary , 5), 
        paddingTop : 50,
        paddingBottom : 30
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
        marginTop : 30,
    },
})

export default ProfileHeader;
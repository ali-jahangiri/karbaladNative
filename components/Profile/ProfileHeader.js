import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';

const ProfileHeader = ({ userData }) => {
    const appendStyle = useStyle(style);
    
    return (
        <View style={appendStyle.container}>
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
    avatar : {
        width: "80%",
        justifyContent : 'center',
        alignItems : 'center',        
        marginHorizontal : '10%',
        marginBottom : 15
    },
})

export default ProfileHeader;
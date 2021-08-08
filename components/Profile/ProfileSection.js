import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import Para from '../Para';


const ProfileSection = ({ icon , title , path , params }) => {
    const appendStyle = useStyle(style);
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(path , { ...params })} style={appendStyle.container}>
            <View style={appendStyle.goToRouteTrigger}>
                <Feather name="chevron-left" size={24} color="black" />
                </View>
            <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                <Para size={18} weight="bold">{title}</Para>   
                <View style={appendStyle.rowIconContainer}>
                    {icon}
                </View>
            </View>
        </TouchableOpacity>
    )
}


const style = ({ primary, baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        width: "90%",
        marginHorizontal : "5%",
        marginVertical : 15
    },
    goToRouteTrigger : {
        padding: 15
    },
    rowIconContainer : {
        borderRadius : baseBorderRadius,
        padding: 15,
        marginLeft  : 10,
        backgroundColor : generateColor(primary , 3),
    },
    rowIcon : {
        color: primary
    },
})

export default ProfileSection;
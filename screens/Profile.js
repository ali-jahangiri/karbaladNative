import { useScrollToTop } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { Image, ScrollView, StyleSheet, View , Button } from 'react-native';
import Para from '../components/Para';
import ScreenHeader from '../components/ScreenHeader';

import { useStyle } from '../Hooks/useStyle';
import { useSelector } from '../Store/Y-state';
import { persister } from '../utils';

const Profile = () => {
    const appendStyle = useStyle(style)
    const container = useRef()
    useScrollToTop(container);


    const state = useSelector(state => state)
        
    useEffect(() => {
        console.log(state , 's');
    } , )


    const logoutHandler = () => {
        persister.remove('userPrivateKey')
            .then(data => {
                // TODO redirect to login screen
            })
    }

    return (
        <ScrollView ref={container}>
            <ScreenHeader extendStyle={{}} title="پروفایل" />
            <View style={appendStyle.avatar}>
                <Image style={appendStyle.avatarImg} 
                    source={{ uri : 'data:image/jpeg;base64,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' , width : 200 , height : 200 }} />
                <View style={appendStyle.imageDivider} />
                <Para weight="bold" color="#050513" size={22}>علی جهانگیری</Para>
                <Para color="#536162">jahangiri.dev@gmail.com</Para>
            </View>
            <Button onPress={logoutHandler} title="logout" />
            </ScrollView>
    )
}



const style = ({ primary , secondary , baseBorderRadius }) => StyleSheet.create({
    avatar : {
        width: "80%",
        justifyContent : 'center',
        alignItems : 'center',        
        marginHorizontal : '10%',
        marginTop : 30
    },
    avatarImg : {
        borderRadius : baseBorderRadius,
        marginBottom : 10
    },
    imageDivider : {
        width: "30%",
        marginVertical : 10,
        height: 3,
        backgroundColor : primary,
        borderRadius : baseBorderRadius
    }
})

export default Profile;
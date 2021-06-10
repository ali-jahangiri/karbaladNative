import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { useRef } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import Para from '../components/Para';
import ScreenHeader from '../components/ScreenHeader';

import { useStyle } from '../Hooks/useStyle';

const Profile = () => {
    const appendStyle = useStyle(style)
    const container = useRef()
    useScrollToTop(container)
    return (
        <ScrollView ref={container}>
            <ScreenHeader title="پروفایل" />
            <View style={appendStyle.avatar}>
                <Image style={appendStyle.avatarImg} 
                    source={{ uri : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRor2EwZqzZTRD_wlDDI3g4BP5kauTFaKbrjQ&usqp=CAU' , width : 200 , height : 200 }} />
                <Para weight="bold" color="#050513" size={22}>علی جهانگیری</Para>
                <Para color="#536162">jahangiri.dev@gmail.com</Para>
            </View>
            <View style={appendStyle.contentContainer}>
                <Para>Voluptas est molestias qui cupiditate iure. Quos ducimus eos adipisci voluptatem qui. Nesciunt numquam modi. Exercitationem a architecto laborum et voluptatum alias. Quia quo similique et optio. Deserunt minus omnis animi non voluptatum praesentium numquam ad ut.
 
Aut modi cumque itaque dolorum aspernatur dolores dolore laboriosam. Sapiente ipsum amet vero. Quibusdam quasi voluptate nobis voluptatem illo possimus qui nihil officia. Molestiae non dolore voluptatem dolorum reprehenderit. Vero nesciunt voluptas autem accusantium sed repellendus qui. Sequi ut debitis sed.
 
Laudantium ducimus ut maxime tenetur veritatis suscipit at. Voluptatem magnam placeat explicabo consectetur aut. Tempora molestiae ut sint. Voluptatem quod rerum blanditiis est ratione sequi ipsum.</Para>
            </View>
        </ScrollView>
    )
}



const style = ({ primary , secondary , baseBorderRadius }) => StyleSheet.create({
    avatar : {
        width: "80%",
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : 30,
        backgroundColor : secondary,
        marginHorizontal : '10%',
        borderRadius : baseBorderRadius,
        padding: 20,
        paddingTop : 30,
        position: 'relative',
        zIndex : 500
    },
    avatarImg : {
        borderRadius : baseBorderRadius,
        marginBottom : 10
    },
    contentContainer : {
        width: "95%",
        backgroundColor : primary,
        marginHorizontal : "2.5%",
        borderRadius : baseBorderRadius,
        padding:  25,
        paddingTop : 70,
        marginTop : -50
    }
})

export default Profile;
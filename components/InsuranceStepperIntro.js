import React from 'react';
import { StyleSheet, View , TouchableOpacity, StatusBar } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';
import NextStepBtn from './NextStepBtn';
import { useNavigation } from '@react-navigation/native';

const InsuranceStepperIntro = ({  title , desc , nextStepHandler }) => {
    const appendStyle = useStyle(style)
    const { primary , secondary} = useStyle();
    
    const navigation = useNavigation()

    return (
        <View style={{ flex : 1 , justifyContent : 'center' }}>
            <View style={appendStyle.container}>
                <NextStepBtn extendStyle={appendStyle.backCta} containerBgColor={generateColor(secondary , 8)} onPress={navigation.goBack} />
                <View style={{ flex: 1 , justifyContent : "center" }}>
                    <View style={appendStyle.icon}>
                        <Feather name="file-text" size={55} color={generateColor(primary , 9)} />
                    </View>
                    <Para weight="bold" size={20} align="center" style={appendStyle.title}>{title}</Para>
                    {
                        desc && <Para style={appendStyle.desc}>{desc}</Para>
                    }
                    <TouchableOpacity onPress={nextStepHandler} style={appendStyle.nextStep}>
                        <Feather name="chevron-left" size={30} color="black" />
                        <Para size={20} style={appendStyle.nextStepText} weight="bold">شروع</Para>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const style = ({ primary ,  baseBorderRadius}) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        justifyContent : 'center',
        flex: 1,
        marginTop : StatusBar.currentHeight + 10
    },
    icon : {
        width : 100,
        height: 100,
        backgroundColor : generateColor(primary , 3),
        borderRadius : baseBorderRadius,
        padding: 10,
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        marginBottom : 20
    },  
    title : {
        marginBottom : 5
    },
    desc : {
        marginBottom : 20,
        color: 'grey'
    },
    nextStep : {
        backgroundColor : primary,
        width: "100%",
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'center',
        padding: 10,
        borderRadius : baseBorderRadius
    },
    nextStepText : {
        marginLeft : 5,
    },
    backCta : {
        alignSelf : "flex-start",
    }
})

export default InsuranceStepperIntro;
import React from 'react';
import { StyleSheet, View , TouchableOpacity, StatusBar } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';
import DirectionCta from './DirectionCta';
import { useNavigation } from '@react-navigation/native';

const InsuranceStepperIntro = ({  title , desc , nextStepHandler }) => {
    const appendStyle = useStyle(style)
    const { primary , ctaTextColor } = useStyle();
    
    const navigation = useNavigation()

    return (
        <View style={{ flex : 1 , justifyContent : 'center' }}>
            <View style={appendStyle.container}>
                <DirectionCta direction="right" extendStyle={appendStyle.backCta} containerBgColor={generateColor(primary , 3)} onPress={navigation.goBack} />
                <View style={{ flex: 1 , justifyContent : "center" }}>
                    <View style={appendStyle.icon}>
                        <Feather name="file-text" size={40} color={generateColor(primary , 6)} />
                    </View>
                    <Para weight="bold" size={20} align="center" style={appendStyle.title}>{title}</Para>
                    {
                        desc && <Para style={appendStyle.desc}>{desc}</Para>
                    }
                    <TouchableOpacity onPress={nextStepHandler} style={[appendStyle.nextStep , !desc ? { marginTop : 10 } : {}]}>
                        <View style={appendStyle.nextIconContainer}>
                            <Feather name="chevron-left" size={30} color={ctaTextColor} />
                        </View>
                        <Para size={20} color={ctaTextColor} style={appendStyle.nextStepText} weight="bold">شروع</Para>
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
        marginTop : StatusBar.currentHeight + 10,
    },
    nextIconContainer : {
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 5),
        borderRadius: baseBorderRadius,
        padding : 5
    },
    icon : {
        width : 75,
        height: 75,
        backgroundColor : generateColor(primary , 2),
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
        backgroundColor : generateColor(primary , 8),
        width: "100%",
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
        padding: 10,
        paddingHorizontal : 15,
        borderRadius : baseBorderRadius
    },
    nextStepText : {
        marginLeft : 5,
    },
    backCta : {
        alignSelf : "flex-end",
    }
})

export default InsuranceStepperIntro;
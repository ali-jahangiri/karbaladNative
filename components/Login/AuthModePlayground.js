import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../../Hooks/useStyle';
import { generateColor } from '../../utils';
import DirectionCta from '../DirectionCta';
import Para from '../Para';



const AuthModePlayground = ({ currentStage , error , loadingCta , currentStageTitle}) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    return (
        <View style={appendStyle.authModeContainer}>
            <DirectionCta onPress={() => currentStage?.backHandler()} extendStyle={{ alignSelf : "flex-end" }} direction="right" iconColor={generateColor(primary , 9)} containerBgColor={generateColor(primary , 5)} />
            <View>
                <View style={appendStyle.modeHeader}>
                    <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                        <Para style={appendStyle.modeTitle}>{currentStageTitle}</Para>
                        <View style={appendStyle.bullet} />
                    </View>
                </View>
                <View>
                    {currentStage?.body()}
                </View>
                {
                    error &&
                    <View style={appendStyle.error}>
                        <Para style={{ flex : 1 }} color='red'>{error}</Para>
                        <View style={appendStyle.errorIconContainer}>
                            <Feather name="alert-circle" size={24} color='red' />
                        </View>
                    </View> 
                }
                <TouchableOpacity disabled={error || loadingCta} onPress={currentStage.ctaHandler} style={[appendStyle.endCta , error || loadingCta ? appendStyle.disabledCta : {}]}>
                            <Feather style={{ marginRight : 10 }} name={`${loadingCta ? "loader" : "arrow-left"}`} size={24} color="black" />
                            <Para weight="bold" size={18}>
                                {loadingCta || currentStage?.ctaText}
                            </Para>
                </TouchableOpacity>
            </View>
            <View />
        </View>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    authModeContainer : {
        flex: 1,
        width: "90%",
        marginHorizontal : "5%",
        justifyContent : 'space-between',
        marginTop : StatusBar.currentHeight ,
    },
    modeHeader : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'flex-end',
        width : "100%",
    },
    modeTitle : {
        fontSize : 26,
        fontFamily : "bold",
        color: "grey",
    },
    bullet : {
        width : 30,
        height : 30,
        backgroundColor : generateColor(primary , 6),
        borderRadius : baseBorderRadius,
        marginLeft : 10
    },
    error : { 
        marginBottom : 10 ,
        flexDirection : "row", 
        justifyContent : 'flex-end',
        alignItems : 'center',
        marginVertical : 10 ,
        backgroundColor :"#E9858058",
        borderRadius : baseBorderRadius,
        padding : 10
    },
    errorIconContainer : {
        borderRadius : baseBorderRadius,
        marginLeft : 10,
        padding : 10,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : "#E9858055",
    },
    disabledCta : { opacity: .3 },
    endCta : {
        flexDirection : "row",
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 8),
        padding: 15,
        borderRadius : baseBorderRadius
    },
})


export default AuthModePlayground;
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import useStyle from '../../Hooks/useStyle/useStyle';
import Para from '../Para';
import FAQItem from './FAQItem';
import { Feather } from '@expo/vector-icons';
import useRedirection from '../../Hooks/useRedirection/useRedirection';


const FAQ = ({ componentStyles , componentDatas }) => {
    const appendStyle = useStyle(style , componentStyles);
    const redirectHandler = useRedirection({ webLink : componentDatas.webLinkMoreOptionPath , selectedInternalPath : componentStyles.internalMoreOptionPath })


    const questionList = Object.entries(componentDatas).filter(([key]) => key.includes("question")).map(el => el[1])
    const answererList = Object.entries(componentDatas).filter(([key]) => key.includes("answear")).map(el => el[1])

    
    const moreItemRedirectHandler = () => redirectHandler();

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.headerPanel}>
                <Para weight='bold' style={appendStyle.titleText}>سوالات متدول</Para>
                <View style={appendStyle.titleDivider} />
            </View>
            <ScrollView>
                {
                    questionList.map((qus , i) => (
                        <FAQItem 
                            key={i}
                            passedStyle={componentStyles} 
                            question={qus} 
                            answerer={answererList[i]} 
                        />
                    ))
                }
            </ScrollView>
            <TouchableOpacity onPress={moreItemRedirectHandler} style={appendStyle.triggerContainer}>
                <Feather name="chevron-left" size={24} style={appendStyle.moreItemsIcon} />
                <Para style={appendStyle.moreItemsText}>{componentDatas.moreItemsText}</Para>
            </TouchableOpacity>
        </View>
    )
}

const style = (_ , { moreCtaTextColor }) => StyleSheet.create({
    container : {

    },
    headerPanel : {
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center",
        paddingHorizontal : 10, 
        marginBottom : 10
    },
    triggerContainer : {
        textAlign : "center",
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
        padding : 20
    },
    moreItemsText : {
        marginLeft : 5,
        color : moreCtaTextColor
    },
    moreItemsIcon : {
        color : moreCtaTextColor
    },
    titleDivider : {
        height : 20,
        width : 3,
        backgroundColor : "blue",
        marginLeft : 10
    },
    titleText : {
        fontSize: 17
    }
})

export default FAQ;
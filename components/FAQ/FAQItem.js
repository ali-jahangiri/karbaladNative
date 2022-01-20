import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import useStyle from '../../Hooks/useStyle/useStyle';
import Para from '../Para';
import { AntDesign } from '@expo/vector-icons';
import { borderConstructor } from "../../utils"

const FAQItem = ({ question , answerer , passedStyle }) => {
    const appendStyle = useStyle(style , passedStyle);
    const [isCollapseOpen, setIsCollapseOpen] = useState(false);

    return (
        <TouchableOpacity onPress={() => setIsCollapseOpen(prev => !prev)} style={appendStyle.container}>
            <View style={appendStyle.questionContainer}>
                <Para style={appendStyle.questionText}>{question}</Para>
                <View style={appendStyle.iconContainer}>
                    <AntDesign style={appendStyle} name={isCollapseOpen ? "minus" : "plus"} size={20} color="black" />
                </View>
            </View>
            {
                isCollapseOpen && <View>
                    <View style={appendStyle.divider} />
                    <View style={appendStyle.answererContainer}>
                        <Para style={appendStyle.answererText}>{answerer}</Para>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}

// #00B5FF

const style = (_ , { containerBorder , questionTextColor , questionTextFontSize , answererTextColor , answererTextFontSize }) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        marginVertical : 10,
        padding: 20,
        ...borderConstructor(containerBorder),
    },
    questionContainer : {
        flexDirection : "row",
        justifyContent : 'flex-end',
        alignItems : 'center',

    },
    iconContainer : {
        marginLeft : 10
    },
    questionText : {
        color : questionTextColor,
        fontSize : Number(questionTextFontSize)
    },
    divider : {
        width : "100%",
        height : 1,
        backgroundColor : "lightgrey",
        marginVertical : 15,
    },
    answererText : {
        color : answererTextColor,
        fontSize : Number(answererTextFontSize),
    }
})

export default FAQItem;
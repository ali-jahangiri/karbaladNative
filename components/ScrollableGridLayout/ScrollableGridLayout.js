import React, { useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Linking } from "react-native";

import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';
import Item from './Item';

const MOCK = [
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
    {
        name : "بیمه دانا"  ,
        icon : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
        link : "https://logosource.ir/wp-content/uploads/2016/02/Dana.jpg",
    },
]

const MOCK_ROW_NUMBER = 2;
const MOCK_COLUMN_NUMBER = 4;

const ScrollableGridLayout = ({ componentStyles , componentDatas }) => {
    const appendedStyle = useStyle(style);
    const itemScrollViewContainer = useRef();

    const itemRedirectHandler = webLink => {
        Linking.openURL(webLink);
    }

    return (
        <View style={appendedStyle.container}>
            <View style={appendedStyle.headerPanel}>
                <Para weight='bold' style={appendedStyle.titleText}>شرکت های بیمه</Para>
                <View style={appendedStyle.headerPanelDivider} />
            </View>
            <ScrollView
                horizontal 
                contentContainerStyle={appendedStyle.scrollViewContainer}
                ref={itemScrollViewContainer}
                onContentSizeChange={() => itemScrollViewContainer.current.scrollToEnd({animated: true})}
            >
                {
                    MOCK.map((item , index) => (
                        <Item availableCountOfItem={MOCK_COLUMN_NUMBER} redirectHandler={itemRedirectHandler} key={index} {...item} /> 
                    ))
                }
            </ScrollView>
        </View>
    )
}

const screenWidth =  Dimensions.get("screen").width;

const style = ({ primary }) => StyleSheet.create({
    container : {
        marginTop : 0,
        marginBottom : 0,
    },
    titleText : {
        fontSize: 17
    },
    headerPanel : {
        flexDirection : "row",
        justifyContent : "flex-end",
        alignItems : "center",
        paddingHorizontal : 10,
        marginBottom : 10
    },
    headerPanelDivider : {
        height : 20,
        width : 3,
        backgroundColor : primary,
        marginLeft : 10
    },
    scrollViewContainer : {
        width : (MOCK.length * (screenWidth / MOCK_COLUMN_NUMBER)) / MOCK_ROW_NUMBER,
        height : MOCK_ROW_NUMBER * 100,
        flexDirection : "row-reverse",
        flexWrap : "wrap",
        alignItems : "flex-start",
    }
})


export default ScrollableGridLayout;
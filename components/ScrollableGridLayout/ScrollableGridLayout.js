import React, { useRef } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Linking } from "react-native";

import { useStyle } from '../../Hooks/useStyle';
import Para from '../Para';
import Item from './Item';


const ScrollableGridLayout = ({ componentStyles , componentDatas }) => {
    const itemsFormMapping = JSON.parse(componentDatas.items);

    const appendedStyle = useStyle(style , { ...componentStyles , itemsFormMapping});
    const itemScrollViewContainer = useRef();

    
    const itemRedirectHandler = webLink => {
        Linking.openURL(webLink);
    }


    console.log(itemsFormMapping , 'loren');


    return (
        <View style={appendedStyle.container}>
            <View style={appendedStyle.headerPanel}>
                <Para weight='bold' style={appendedStyle.titleText}>{componentDatas.headerText}</Para>
                <View style={appendedStyle.headerPanelDivider} />
            </View>
            <ScrollView
                horizontal 
                contentContainerStyle={appendedStyle.scrollViewContainer}
                ref={itemScrollViewContainer}
                onContentSizeChange={() => itemScrollViewContainer.current.scrollToEnd({animated: true})}
            >
                {
                    itemsFormMapping.map((item , index) => (
                        <Item 
                            passedStyle={componentStyles}
                            availableCountOfItem={Number(componentStyles.itemCountInScreen)} 
                            redirectHandler={itemRedirectHandler} 
                            key={index} 
                            {...item} 
                        /> 
                    ))
                }
            </ScrollView>
        </View>
    )
}

const screenWidth =  Dimensions.get("screen").width;

const style = ({ primary } , { containerMarginBottom , containerMarginTop , headerFontSize , itemRowCount , itemCountInScreen , itemImageContainerSize , itemsFormMapping }) => StyleSheet.create({
    container : {
        marginTop : Number(containerMarginTop),
        marginBottom : Number(containerMarginBottom),
    },
    titleText : {
        fontSize: Number(headerFontSize)
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
        width : (itemsFormMapping.length * (screenWidth / itemCountInScreen)) / itemRowCount,
        height : (Number(itemRowCount) * 100) + (Number(itemRowCount) * Number(itemImageContainerSize)) ,
        flexDirection : "row-reverse",
        flexWrap : "wrap",
        alignItems : "flex-start",
    }
})


export default ScrollableGridLayout;
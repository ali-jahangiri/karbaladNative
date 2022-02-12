import React, { useRef } from "react";
import { ScrollView, StyleSheet , TouchableOpacity, View } from "react-native"
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import useStyle from "../../Hooks/useStyle/useStyle"
import useSelector from "../../Store/Y-state/useSelector";
import Para from "../Para";
import GridItem from "./GridItem";

const CategoryGrid = ({ componentDatas , componentStyles }) => {
    const appendStyle = useStyle(style , componentStyles);
    const items = useSelector(state => state.initial);
    const scrollViewContainerRef = useRef();


    const navigation = useNavigation();

    const redirectHandler = routeParameters => {
        if(!routeParameters.cat.length) {
            navigation.push('stepScreen' , routeParameters);
        }else redirectToAllListHandler();
    }


    const redirectToAllListHandler = () => {
        navigation.push("allFlattedCategory"  , { passedStyle : componentStyles })
    }

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.headerPanel}>
                <TouchableOpacity onPress={redirectToAllListHandler} style={appendStyle.moreItemTriggerContainer}>
                    <Feather style={{ marginRight : 5 }} name="arrow-left" size={20} color="grey" />
                    <Para color="grey" size={14}>مشاهده همه</Para>
                </TouchableOpacity>
                <View style={appendStyle.titleContainer}>
                    <Para weight="bold" style={appendStyle.titleText}>{componentDatas.headerMainText}</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </View>
            <ScrollView 
                horizontal 
                contentContainerStyle={appendStyle.scrollViewContainer}
                ref={scrollViewContainerRef}
                onContentSizeChange={() => scrollViewContainerRef.current.scrollToEnd({animated: true})}
            >
                {
                    items.filter(el => el.thisFavorit).map((item , i) => (
                        <GridItem passedStyle={componentStyles} redirectHandler={redirectHandler} {...item} key={i} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const style = (_ , { mainContainerMarginTop , mainContainerMarginBottom }) => StyleSheet.create({
    container : {
        width : "100%",
        marginTop : Number(mainContainerMarginTop),
        marginBottom : Number(mainContainerMarginBottom),
    },
    headerPanel : {
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingHorizontal : 10,
        marginBottom : 10
    },
    moreItemTriggerContainer : {
        flexDirection : "row",
        alignItems : "center",   
    },
    titleContainer : {
        flexDirection : "row",
        alignItems : "center",
    },
    titleDivider : {
        height : 20,
        width : 3,
        backgroundColor : "blue",
        marginLeft : 10
    },
    titleText : {
        fontSize : 17,
    },
    scrollViewContainer : {
        width : "130%",
        flexDirection : "row-reverse",
        flexWrap : "wrap",
        alignItems : "flex-start",
    }
}) 

export default CategoryGrid;
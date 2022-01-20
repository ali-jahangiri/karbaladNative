import React from "react";
import { ScrollView, StyleSheet , TouchableOpacity, View } from "react-native"
import useStyle from "../../Hooks/useStyle/useStyle"
import useSelector from "../../Store/Y-state/useSelector";
import Para from "../Para";
import GridItem from "./GridItem";
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const CategoryGrid = ({ componentDatas , componentStyles }) => {
    const appendStyle = useStyle(style , componentStyles);
    const items = useSelector(state => state.initial)

    const navigation = useNavigation();


    const redirectHandler = routeParameters => {
        navigation.push('stepScreen' , routeParameters);
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
            <ScrollView horizontal={true} contentContainerStyle={{ width : "130%" , flexDirection : "row" , flexWrap : "wrap" , alignItems : "flex-start"}}>
                {
                    items.map((item , i) => (
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
    }
}) 

export default CategoryGrid;
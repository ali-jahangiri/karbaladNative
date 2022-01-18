import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import GridItem from './CategoryGrid/GridItem';
import Para from './Para';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const AllCatFlattedItem = ({ cat = [] , name , id , webIcon , passedStyle , setNestedStage }) => {
    const appendStyle = useStyle(style , { haveNestedItem : cat.length });
    const navigation = useNavigation();



    const redirectHandler = routeParameters => {
        if(routeParameters.cat.length) {
            // third nested stage
            setNestedStage(routeParameters)
        }else navigation.push('stepScreen' , routeParameters);
    }

    return (
        <View style={{ ...appendStyle.container , ...(!cat.length ? appendStyle.flatContainer: {}) }}>
            <View style={appendStyle.headerPanel}>
                <Para size={16}>{name}</Para>
                <View style={appendStyle.divider} /> 
            </View>
            {
                cat.length ? <View style={appendStyle.nestedItemContainer}>
                    {
                        cat.map((singleItem , i) => (
                            <GridItem redirectHandler={redirectHandler} passedStyle={passedStyle} key={i} {...singleItem} />
                        ))
                    }
                </View> : <TouchableOpacity onPress={() => redirectHandler({cat , name , id})} style={appendStyle.flatItemDirectContainer}>
                    <Feather style={appendStyle.goToDetailsTriggerIcon} name="arrow-left" size={20} />
                    <Para style={appendStyle.goToDetailsTriggerText}>مشاهده</Para>
                </TouchableOpacity>
            }
        </View>
    )
}


const style = ({ primary } , { haveNestedItem }) => StyleSheet.create({
    container : {
        marginVertical : 10,
    },
    flatContainer : {
        flexDirection : "row-reverse",
        alignItems : 'center',
        justifyContent : "space-between",
        width : "100%",
        paddingRight : 10
    },
    headerPanel : {
        flexDirection : "row",
        width : haveNestedItem ? "100%" : "auto",
        justifyContent : "flex-end",
        alignItems : 'center',
        marginBottom : 10,
        paddingHorizontal : 20,
    },
    divider: {
        height : 20,
        width : 3,
        backgroundColor : "blue",
        marginLeft : 10
    },
    nestedItemContainer : {
        flexDirection : "row-reverse",
        alignItems : "flex-start",
        flexWrap : "wrap",
    },
    flatItemDirectContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    goToDetailsTriggerText : {
        color : primary
    },
    goToDetailsTriggerIcon : {
        color : primary,
        marginRight : 5
    }
})


export default AllCatFlattedItem;
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import GridItem from './CategoryGrid/GridItem';
import Para from './Para';
import { useNavigation } from '@react-navigation/native';


const AllCatFlattedItem = ({ cat = [] , name , id , webIcon , passedStyle , setNestedStage }) => {
    const appendStyle = useStyle(style);
    const navigation = useNavigation();



    const redirectHandler = routeParameters => {
        if(routeParameters.cat.length) {
            // third nested stage
            setNestedStage(routeParameters)
        }else navigation.push('stepScreen' , routeParameters);
    }


    const nestedCategoryForMapping = (() => {
        if(cat.length) return cat;
        else return [{ webIcon , id , name , cat}]
    })();

    return (
        <View style={{ ...appendStyle.container }}>
            <View style={appendStyle.headerPanel}>
                <Para size={16}>{name}</Para>
                <View style={appendStyle.divider} /> 
            </View>
            <View style={appendStyle.nestedItemContainer}>
                {
                    nestedCategoryForMapping.map((singleItem , i) => (
                        <GridItem redirectHandler={redirectHandler} passedStyle={passedStyle} key={i} {...singleItem} />
                    ))
                }
            </View>
        </View>
    )
}


const style = ({ primary }) => StyleSheet.create({
    container : {
        marginVertical : 10,
    },
    headerPanel : {
        flexDirection : "row",
        width : "100%",
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
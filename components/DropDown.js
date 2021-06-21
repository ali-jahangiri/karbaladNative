import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';

const DropDown = ({ items , labelKey , onSelect , placeholder}) => {
    const appendStyle = useStyle(style);
    const [searchFilterBase, setSearchFilterBase] = useState("");
    const [canSeeItem, setCanSeeItem] = useState(false);

    const selectHandler = (id , label) => {
        onSelect(id)
        setSearchFilterBase(label);
        setCanSeeItem(false);
    }


    return (
        <>
            <TouchableOpacity style={appendStyle.searchBox}>
                <View style={appendStyle.searchIcon}>
                    <Feather style={appendStyle.icon} name="search" size={24}  />
                </View>
                <TextInput
                            style={appendStyle.input}
                            placeholder={placeholder} 
                            value={searchFilterBase} 
                            onChangeText={value => {
                                setSearchFilterBase(value)
                                setCanSeeItem(true)
                            }} />
            </TouchableOpacity>
            {
                canSeeItem ? <View style={appendStyle.itemContainer}>
                <ScrollView nestedScrollEnabled>
                    {
                        items
                            .filter(el => el?.[labelKey].includes(searchFilterBase))
                            .map((el , i) => (
                            <TouchableOpacity style={appendStyle.item} key={i} onPress={() => selectHandler(el.id , el?.[labelKey])}>
                                <Para>{el?.[labelKey]}</Para>
                                <View style={appendStyle.bullet} />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View> : null
            }
        </>
    )
}

const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
    },
    searchBox : {
        borderWidth : 2,
        height: 50,
        borderColor : generateColor(primary , 3),
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        justifyContent : 'space-between',
        paddingHorizontal : 10,
    },
    input : {
        height: "100%",
        fontFamily : "bold",
        flex: .9,
        textAlign : "right"
    },
    itemContainer : {
        maxHeight: 150,
        width: "95%",
        marginHorizontal : "2.5%"
    },
    searchIcon : {
        alignItems : "center",
        justifyContent : "center",
        flex : .1,
        color: primary
    },
    icon : {
        color: primary
    },
    item : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'flex-end',
        marginVertical : 10
    },  
    bullet : {
        width : 10,
        height : 10,
        backgroundColor : primary,
        marginLeft : 10
    }
})

export default DropDown;
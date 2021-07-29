import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';

const DropDown = ({ items , labelKey , onSelect , placeholder , runOnInitial}) => {
    const appendStyle = useStyle(style);
    const [searchFilterBase, setSearchFilterBase] = useState("");
    const [canSeeItem, setCanSeeItem] = useState(false);
    const [inProgress, setInProgress] = useState(false);

    const selectHandler = (id , label) => {
        onSelect(id)
        setSearchFilterBase(label);
        setCanSeeItem(false);
    }


    const availableItems = canSeeItem && items.filter(el => el?.[labelKey].includes(searchFilterBase))


    useEffect(() => {
        if(runOnInitial) onSelect("")
    } , [])


    const changeHandler = value => {
        // setInProgress(true)
        setSearchFilterBase(value)
        setCanSeeItem(true)
    }
    const ref = useRef();

    useEffect(() => {
        // setInProgress(false);
        ref.current?.scrollToEnd({animated: true})
    } , [availableItems]);




    return (
        <>
            <TouchableOpacity style={appendStyle.searchBox}>
                <View style={appendStyle.searchIcon}>
                    <Feather style={appendStyle.icon} name={inProgress ? "loader" : "search"} size={24}  />
                </View>
                <TextInput
                            style={appendStyle.input}
                            placeholder={placeholder} 
                            value={searchFilterBase} 
                            onChangeText={changeHandler} />
            </TouchableOpacity>
            {
                canSeeItem ? <View style={appendStyle.itemContainer}>
                <ScrollView ref={ref} onContentSizeChange={() => ref.current.scrollToEnd({animated: true})} horizontal nestedScrollEnabled>
                    {
                        availableItems
                            .map((el , i) => (
                            <TouchableOpacity style={[appendStyle.item , i + 1 === availableItems.length ? { marginRight : 0 } : null , !i ? { marginLeft : 0 } : null]} key={i} onPress={() => selectHandler(el.id , el?.[labelKey])}>
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
        height: 60
    },
    searchBox : {
        borderWidth : 2,
        height: 65,
        borderColor : generateColor(primary , 3),
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        justifyContent : 'space-between',
        paddingHorizontal : 10,
    },
    input : {
        height: "100%",
        flex: .9,
        textAlign : "right",
        fontFamily : "regular",
        color: "black"
    },
    itemContainer : { marginTop : 10 },
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
        backgroundColor : generateColor(primary , 5),
        padding: 15,
        height: 75,
        borderRadius : baseBorderRadius,
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'flex-end',
        marginVertical : 10,
        marginHorizontal : 10
    },  
    bullet : {
        width : 10,
        height : 10,
        backgroundColor : primary,
        borderRadius : baseBorderRadius - 5,
        marginLeft : 10
    }
})

export default DropDown;
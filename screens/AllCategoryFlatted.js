import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import AllCatFlattedItem from '../components/AllCatFlattedItem';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import useSelector from '../Store/Y-state/useSelector';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AllCategoryFlatted = ({ route : { params } }) => {
    const appendStyle = useStyle(style);
    const items = useSelector(state => state.initial);
    const [nestedStage, setNestedStage] = useState(null);
    const navigation = useNavigation();

    const nestedReplaceHandler = nestedDetails => setNestedStage(nestedDetails);

    const backHandler = () => {
        if(!nestedStage) navigation.goBack();
        else setNestedStage(null);
    }

    const itemForMapping = nestedStage ? nestedStage.cat : items;

    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <TouchableOpacity onPress={backHandler} style={appendStyle.headerBackTriggerContainer}>
                    <Feather style={{ marginRight : 5 }} name="arrow-left" size={20} color="black" />
                    <Para>بازگشت</Para>
                </TouchableOpacity>
                <View>
                    <Para size={20}>همه بیمه ها</Para>
                    {
                        nestedStage ? <View style={appendStyle.nestedHeaderContainer}>
                            <Para weight='bold' style={appendStyle.nestedTitle}>{nestedStage.name}</Para>    
                            <View style={appendStyle.nestedDivider}>
                                <View style={appendStyle.nestedDividerBullet} />
                                <View style={appendStyle.nestedDividerBullet} />
                            </View>
                        </View> : null
                    }
                </View>
            </View>
            <View style={{ flex : 1 }}>
                <ScrollView >
                    {
                        itemForMapping.filter(el => !el?.thisFavorit && itemForMapping.every(item => item.id !== el.parentId)).map((item , index) => (
                            <AllCatFlattedItem setNestedStage={nestedReplaceHandler} passedStyle={params?.passedStyle} key={index} {...item} />
                        ))
                    }
                </ScrollView>
            </View>
        </View>
    )
}


const style = ({ primary }) => StyleSheet.create({
    container : {
        height : "100%"
    },
    header : {
        flexDirection : "row",
        alignItems : 'center',
        paddingTop : StatusBar.currentHeight + 10,
        padding : 20,
        width : "100%",
        justifyContent : 'space-between',
    },
    headerBackTriggerContainer : {
        flexDirection : "row",
        alignItems : 'center',
    },
    nestedDivider: {
        height : 30,
        width : 3,
        backgroundColor : primary,
        marginLeft : 5,
        marginTop : -5,
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    nestedHeaderContainer : {
        flexDirection : "row",
        paddingRight : 10
    },
    nestedDividerBullet : {
        width : 6,
        height : 6,
        borderRadius : 50,
        backgroundColor : 'blue'
    },
    nestedTitle : {
        marginRight : 5,
        marginTop : 5,
    }
})

export default AllCategoryFlatted;
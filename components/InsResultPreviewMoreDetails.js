import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from './Para';


const isDescCase = string => {
    if(string[0] === "&") return true
    return false
}

const InsResultMoreDetails = ({ visible , setVisibility, data }) => {
    const appendStyle =  useStyle(style)
    return (
        <React.Fragment>
            <TouchableOpacity onPress={() => setVisibility(prev => !prev)} style={appendStyle.moreDetailsCta}>
                <Feather name="chevron-down" size={20} color="black" />
                <Para style={{ marginLeft : 5 }}>{visible ? "جزئیات کمتر" : "جزئیات بیشتر"}</Para>
            </TouchableOpacity>
            {
                visible && <View>
                {
                    data?.map((el , i) => {
                        if(isDescCase(el.name)) {
                            return (
                                <View key={i}>
                                    <Para color={"grey"}>{`توضیح ${i + 1}`}</Para>
                                    <Para>{el.name.slice(1)}</Para>
                                </View>
                            )
                        } else return (
                            <View style={appendStyle.moreDetailsItem} key={i}>
                            <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                                <Para color="grey" size={10} style={{ marginRight : 5 }}>تومان</Para>
                                <Para>{el.showValue}</Para>
                            </View>
                            <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                                <Para>{el.name}</Para>
                                <View style={appendStyle.moreDetailsBulletItem} />
                            </View>
                        </View>
                        )
                        
                    })
                }
            </View>
            }
        </React.Fragment>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    moreDetailsItem : {
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 10
    },
    moreDetailsCta : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginVertical : 10,
    },
    moreDetailsBulletItem : {
        backgroundColor : generateColor(primary ,5),
        borderRadius : baseBorderRadius,
        width: 20,
        height: 10,
        marginLeft : 10
    }
})

export default InsResultMoreDetails;
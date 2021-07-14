import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import InsPreviewItemMoreDetailsRow from './InsPreviewItemMoreDetailsRow';
import Para from './Para';


const isDescCase = string => {
    if(string[0] === "&") return true
    return false
}

const InsResultMoreDetails = ({ visible , setVisibility, data , mainMoreDerails }) => {
    const appendStyle =  useStyle(style)
    return (
        <React.Fragment>
            <TouchableOpacity onPress={() => setVisibility(prev => !prev)} style={appendStyle.moreDetailsCta}>
                <Feather name={visible ? "chevron-up" : "chevron-down"} size={20} color="grey" />
                <Para color="grey" style={{ marginLeft : 5 }}>{visible ? "جزئیات کمتر" : "جزئیات بیشتر"}</Para>
            </TouchableOpacity>
            {
                visible && <View>
                    {   
                        mainMoreDerails.map((el , i) => (
                                <InsPreviewItemMoreDetailsRow {...el} key={i} />
                            ))
                        
                    }
                {
                    data?.map((el , i) => {
                        if(isDescCase(el.name)) {
                            return (
                                <View style={{ flexDirection : 'row' , alignItems : "center" , justifyContent : 'flex-end' , marginVertical : 10  , flexShrink : 1 , }} key={i}>
                                    <View style={{ flex : 1 }}>
                                        <Para >{el.name.slice(1)}</Para>
                                    </View>
                                    <View style={appendStyle.moreDetailsBulletItem} />
                                </View>
                            )
                        } else return (
                            <View style={appendStyle.moreDetailsItem} key={i}>
                            <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                                <Para color="grey" size={10} style={{ marginRight : 5 }}>تومان</Para>
                                <Para>{toFarsiNumber(el.showValue)}</Para>
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
        marginVertical : 25,
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
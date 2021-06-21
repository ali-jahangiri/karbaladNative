import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import * as ImagePicker from  "expo-image-picker";

import { Feather } from '@expo/vector-icons';
import { generateColor } from '../utils';

const RequirementDocument = ({ onChange , items }) => {
    const appendStyle = useStyle(style);
    const [internalImageSource, setInternalImageSource] = useState({});
    const [showMore, setShowMore] = useState(true);

    
    const getLibraryPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== "granted") {
            Alert.alert("اجازه دسترسی داده نشد" , "برای وارد کردن تصاویر ، دسترسی را به برنامه بدهید" , [{
                onPress : () => getLibraryPermission(),
                text : "درخواست مجدد"
            },
            {
                text : "بستن",
                onPress : () => {}
            }
            ]);
            return false
        }else return true
    }


    const pickingHandler = async key => {
        if(await getLibraryPermission()) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes : ImagePicker.MediaTypeOptions.Images,
                allowsEditing : false,
                quality : .8,
                base64 : true
            })
            if(!result.cancelled) {
                onChange(prev => ({
                    ...prev ,
                    [key] : result.base64
                }));

                setInternalImageSource(prev => ({
                    ...prev,
                    [key] : result.uri
                }))
            } 
        }
        
    }
    
    return (
        <View style={appendStyle.container}>
            <TouchableOpacity onPress={() => setShowMore(!showMore)} style={appendStyle.header}>
                <View style={{ padding : 10 }} >
                    <Feather name={`chevron-${showMore ? "up" : "down"}`} size={24} color="black" />
                </View>
                <View style={{ flexDirection : "row" , alignItems : "center" }} >
                    <Para weight="bold" size={18}>مدارک مورد نیاز</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </TouchableOpacity>
            <View style={{ display : showMore ? "flex" : "none" }}>
            {
                items.map((el , i) => (
                    <View style={appendStyle.item} key={i}>
                        {
                            internalImageSource[el.formName] ? <TouchableOpacity onPress={() => pickingHandler(el.formName)} style={appendStyle.selectedImage}>
                                <Image resizeMode="stretch" source={{ uri : internalImageSource[el.formName] , width : 100 , height : 100 }} />
                                <View style={appendStyle.editImage}>
                                    <Feather name="edit-2" size={24} color="black" />
                                </View>
                            </TouchableOpacity> : <TouchableOpacity style={appendStyle.ctaContainer} onPress={() => pickingHandler(el.formName)}>
                                <Feather style={appendStyle.imageIcon} name="image" size={24}  />
                                <Para>انتخاب تصویر</Para>
                            </TouchableOpacity>
                        }
                        <View style={{ flexDirection : "row" , alignItems : "center" }}>
                            <Para>{el.name}</Para>
                            <View style={appendStyle.index}>
                                <Para color="grey">{i + 1}</Para>
                            </View>
                        </View>
                    </View>
                ))
            }
            </View>
        </View>
    )

}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width: "90%",
        marginHorizontal : "5%",

    },
    imageIcon : {
        color: generateColor(primary , 8),
        marginRight : 10
    },  
    header : {
        flexDirection : 'row',
        justifyContent : "space-between",
        alignItems : "center",
        marginTop : 20,
        marginBottom : 15
    },
    titleDivider : {
        width: 15,
        height: 15,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 10
    },
    item : {
        marginVertical : 30,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center',
    },
    ctaContainer : {
        flexDirection : "row",
        backgroundColor : generateColor(primary , 5),
        padding : 10,
        borderRadius : baseBorderRadius
    },
    index : {
        marginLeft : 5,
        backgroundColor : "#f2f2f2",
        width : 30,
        height: 30,
        alignItems : 'center',
        justifyContent : "center",
        borderRadius : baseBorderRadius - 5,
        position: "absolute",
        right: 0,
        top: -30
    },
    editImage : {
        position: "absolute",
        bottom: 0,
        backgroundColor : "#36363990",
        width: "100%",
        alignItems : "center",
        padding: 5
    },
    selectedImage : {
        borderRadius : baseBorderRadius,
        overflow: "hidden",
    }
})

export default RequirementDocument;
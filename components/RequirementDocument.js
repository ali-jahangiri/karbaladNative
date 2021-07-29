import React, { useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import Para from './Para';

import * as ImagePicker from  "expo-image-picker";

import { Feather } from '@expo/vector-icons';
import { generateColor, toFarsiNumber } from '../utils';

const RequirementDocument = ({ setValue , items , setIsValid , value }) => {
    const appendStyle = useStyle(style);
    const [internalImageUrls, setInternalImageUrls] = useState({});

    const validateGetComplete = (newObject) => {
        const reqListForPassing = items.map(el => el.formName);
        reqListForPassing.forEach(el => {
            if(!newObject?.[el]) setIsValid(false);
            else setIsValid(true)
        })
    }
    
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
                setInternalImageUrls(prev => ({
                    ...prev,
                    [key] : result.uri
                }));

                setValue(prev => ({
                    ...prev ,
                    [key] : result.base64
                }));

                validateGetComplete({...value , [key] : result.uri})
            } 
        }
        
    }


    return (
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <View style={{ flexDirection : "row" , alignItems : "center" }} >
                    <Para weight="bold" size={18}>مدارک مورد نیاز</Para>
                    <View style={appendStyle.titleDivider} />
                </View>
            </View>
            <View>
            {
                items.map((el , i) => (
                    <View style={appendStyle.item} key={i}>
                        {
                            value[el.formName] ? <TouchableOpacity onPress={() => pickingHandler(el.formName)} style={appendStyle.selectedImage}>
                                <Image resizeMode="cover" source={{ uri : internalImageUrls[el.formName] , width : 100 , height : 100 , }} />
                                <View style={appendStyle.editImage}>
                                    <Feather name="edit-2" size={24} style={appendStyle.penIcon} />
                                </View>
                            </TouchableOpacity> : <TouchableOpacity style={appendStyle.ctaContainer} onPress={() => pickingHandler(el.formName)}>
                                <Feather style={appendStyle.imageIcon} name="image" size={24}  />
                            </TouchableOpacity>
                        }
                        <View style={{ alignItems : "flex-end" , justifyContent : "space-between" }}>
                            <View style={appendStyle.index}>
                                <Para color="grey">{toFarsiNumber(i + 1)}</Para>
                            </View>
                            <Para>{el.name}</Para>
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
        color: generateColor(primary , 5),
    },  
    header : {
        flexDirection : 'row',
        justifyContent : "flex-end",
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
    penIcon : {
        color: primary
    },
    item : {
        marginVertical : 30,
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : 'center',
    },
    ctaContainer : {
        alignItems : 'center',
        backgroundColor : generateColor(primary , 1),
        padding : 20,
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
    },
    editImage : {
        position: "absolute",
        bottom: 0,
        justifyContent : 'center',
        alignItems : "center",
        backgroundColor : generateColor(primary , 8),
        width: "100%",
        height : "100%",
        padding: 5
    },
    selectedImage : {
        borderRadius : baseBorderRadius,
        overflow: "hidden",
    }
})

export default RequirementDocument;
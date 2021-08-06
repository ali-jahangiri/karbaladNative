import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import client from '../client';
import DirectionCta from '../components/DirectionCta';
import Para from '../components/Para';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, persister } from '../utils';

import Input from "../components/Input";
import useFetch from '../Providers/useFetch';
import { useDispatch } from '../Store/Y-state';
import { PasswordInput } from '../components/Login';
import { setAppKey } from '../Store/Slices/authSlice';
import Drawer from '../components/Drawer';

const { CHANGE_PASSWORD , CHANGE_USERNAME , PROFILE_EDIT } = client.static

const ProfileEdit = ({ navigation }) => {
    const appendStyle = useStyle(style);
    const { primary } = useStyle();

    const fetcher = useFetch();

    const [inputValue, setInputValue] = useState({});
    const [currentUserEditMode, setCurrentUserEditMode] = useState(CHANGE_USERNAME);
    const [respondErr, setRespondErr] = useState(null);
    const [phoneAsUserName, setPhoneAsUserName] = useState(null)
    const [profileEditWasSuccessfully, setProfileEditWasSuccessfully] = useState(false);

    const [insideSomeAsyncProcess, setInsideSomeAsyncProcess] = useState(false);



    const storeDispatcher = useDispatch();



    useEffect(() => {
        persister.get("userName")
            .then(userName => {
                setPhoneAsUserName(userName);
            })
    } , []);



    const changeHandler = (key , value , formMode) => {    
        setRespondErr(null);
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }));
    }


    const drawerCloseHandler = () => {
        doneWithProfileEditHandler()
    }


    const doneWithProfileEditHandler = () => {
        setProfileEditWasSuccessfully(false);
        setInputValue({});
        setRespondErr(null);
    }


    const requestAction = body => {
        return fetcher("GetUserData" , body)
                .then(({ data }) => {
                    Keyboard.dismiss();
                    if(data.id < 0) {
                        throw new Error(data.fullName);
                    }else {
                        return data
                    }
                    }).catch(err => {
                        setRespondErr(err.message);
                        setInsideSomeAsyncProcess(false)
                    })
    }


    const changeUserDetailsHandler = () => {
        const { userName = "" , password = "" , newPassword = "" , newPasswordConfirm = "" , currentPassword = "" } = inputValue;

        if(currentUserEditMode === CHANGE_PASSWORD) {
            if([newPassword , newPasswordConfirm, currentUserEditMode].includes("")) {
                setRespondErr(PROFILE_EDIT.TRUTHY_ERROR_MESSAGE);
            }
            else if(newPassword !== newPasswordConfirm) {
                setRespondErr(PROFILE_EDIT.PASSWORD_CHANGE.CHAR_CONFLICT_MESSAGE);
            }
            else if(newPassword.length < 4) {
                setRespondErr(toFarsiNumber(PROFILE_EDIT.PASSWORD_CHANGE.LENGTH_ERROR_MESSAGE))
            }
            else {
                setInsideSomeAsyncProcess(true)
                requestAction({
                    mobile : phoneAsUserName,
                    pass : currentPassword,
                    newPass : newPassword,
                    name : ""
                }).then(returnedValue => {
                    const key = returnedValue.privatekey;
                    persister.set("userPrivateKey" , key)
                        .then(_ => {
                            storeDispatcher(() => setAppKey(key))
                            setProfileEditWasSuccessfully(PROFILE_EDIT.PASSWORD_CHANGE.SUCCESS_PASSWORD_CHANGE);
                            setInsideSomeAsyncProcess(false)
                        })
                }).catch(err => {})
            }
        }else {
            if([userName , password].includes("")) setRespondErr(PROFILE_EDIT.TRUTHY_ERROR_MESSAGE);
            else {
                setInsideSomeAsyncProcess(true);
                requestAction({
                    mobile : phoneAsUserName,
                    pass : password,
                    newPass : "",
                    name : userName
                }).then(data => {
                    const key = data.privatekey;
                    persister.set("userPrivateKey" , key)
                        .then(_ => {
                            storeDispatcher(() => setAppKey(key))
                            setProfileEditWasSuccessfully(PROFILE_EDIT.USERNAME_CHANGE.SUCCESS_USERNAME_CHANGE)
                            setInsideSomeAsyncProcess(false) 
                        })
                }).catch(err => {})
            }
        }

    }


    useEffect(() => {
        setInputValue({});
        setRespondErr(null);
    } , [currentUserEditMode])

   
    
    return (
        <>
        <View style={appendStyle.container}>
            <View style={appendStyle.header}>
                <DirectionCta direction="left" onPress={navigation.goBack} containerBgColor={generateColor(primary , 5)} />
                <Para size={18} weight="bold">ویرایش حساب</Para>
            </View>
            <View style={appendStyle.contentContainer}>
                <ScrollView>
                    <View style={appendStyle.editProfile}>
                                    <TouchableOpacity onPress={() => setCurrentUserEditMode(CHANGE_USERNAME)} style={appendStyle.sectionLabel}>
                                            <Feather name={currentUserEditMode === CHANGE_USERNAME ?  "minus" : "plus"} size={24} color="black" /> 
                                            <View style={{ flexDirection : "row" , alignItems : 'center' }}>
                                                <Para weight="bold" size={15}>ویرایش نام کاربری</Para>
                                                <View style={appendStyle.iconContainer}>
                                                    <Feather name="user" size={24} color="black" />
                                                </View>
                                            </View>
                                    </TouchableOpacity>
                                {
                                    currentUserEditMode === CHANGE_USERNAME ? (
                                        <View style={appendStyle.changeableContainer}>
                                            <Input placeholder="نام کاربری جدید" changeHandler={value => changeHandler("userName" , value)} value={inputValue?.userName} />
                                            <PasswordInput fontSize={15} eyeEnable placeholder="رمز عبور" changeHandler={value => changeHandler("password" , value, CHANGE_USERNAME )} value={inputValue?.password} />
                                            { 
                                                respondErr ? <View style={appendStyle.errorContainer}>
                                                    <Para color='red' >{respondErr}</Para>
                                                </View> : null
                                            }
                                            <TouchableOpacity 
                                                disabled={respondErr || insideSomeAsyncProcess} 
                                                style={[appendStyle.userDetailsChangeCta , respondErr || insideSomeAsyncProcess ? appendStyle.disabledCta : {}]} 
                                                onPress={changeUserDetailsHandler}>
                                                <Para weight="bold">{insideSomeAsyncProcess ? "درحال ویرایش نام کاربری..." : "ویرایش نام کاربری"}</Para>
                                            </TouchableOpacity>
                                        </View>
                                    ) : null
                                }
                                
                            </View>
                    <View style={appendStyle.editProfile}>
                                    <TouchableOpacity style={appendStyle.sectionLabel}  onPress={() => setCurrentUserEditMode(CHANGE_PASSWORD)}>
                                            <View style={{ padding : 10 , justifyContent : 'center' , alignItems : 'center'  }}>
                                                <Feather name={currentUserEditMode === CHANGE_PASSWORD ?  "minus" : "plus"} size={24} color="black" /> 
                                            </View>
                                            <View style={{ flexDirection : "row" , alignItems: 'center' , }}>
                                                <Para weight="bold" size={15}>تغییر رمز عبور</Para>
                                                <View style={appendStyle.iconContainer}>
                                                    <Para style={{ marginTop : 10 }} size={23} weight="bold">*</Para>
                                                </View>
                                            </View>
                                    </TouchableOpacity>
                                {
                                    currentUserEditMode === CHANGE_PASSWORD ? (
                                        <View style={appendStyle.changeableContainer}>
                                            <Input isPassword placeholder="رمز عبور فعلی" changeHandler={value => changeHandler("currentPassword" , value)} value={inputValue?.currentPassword} />
                                            <Input isPassword placeholder="رمز عبور جدید" changeHandler={value => changeHandler("newPassword" , value)} value={inputValue?.newPassword} />
                                            <Input isPassword placeholder="تکرار رمز عبور جدید" changeHandler={value => changeHandler("newPasswordConfirm" , value)} value={inputValue?.newPasswordConfirm} />
                                            {
                                                respondErr && currentUserEditMode === CHANGE_PASSWORD ? <View style={appendStyle.errorContainer}>
                                                    <Para color='red' >{respondErr}</Para>
                                                </View> : null
                                            }
                                            <TouchableOpacity disabled={respondErr || insideSomeAsyncProcess} style={[appendStyle.userDetailsChangeCta , respondErr || insideSomeAsyncProcess ? appendStyle.disabledCta : {}]} onPress={changeUserDetailsHandler}>
                                                <Para weight="bold">
                                                    {
                                                        insideSomeAsyncProcess ? "در حال تغییر رمز عبور...." : "تغییر رمز عبور"
                                                    }
                                                </Para>
                                            </TouchableOpacity>
                                        </View> 
                                    ): null
                                }
                                
                            </View>
                </ScrollView>
            </View>
        </View>
        {
            profileEditWasSuccessfully ?
             <Drawer
                onClose={drawerCloseHandler} >
                    <View style={appendStyle.drawerContentContainer}> 
                        <Para size={20} >{profileEditWasSuccessfully}</Para>
                        <TouchableOpacity style={appendStyle.drawerCloseTrigger} onPress={drawerCloseHandler}>
                            <Para weight="bold" align="center">تایید</Para>
                        </TouchableOpacity>
                    </View>
            </Drawer> : null
        }
        </>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width : "90%",
        flex : 1,
        marginHorizontal : "5%"
    },
    ctaContainer : {
        
    },
    drawerCloseTrigger : {
        marginTop : 10,
        backgroundColor : generateColor(primary , 5),
        width : "90%",
        padding: 15,
        borderRadius : baseBorderRadius
    },
    drawerContentContainer : {
        justifyContent : 'center',
        alignItems : "center", 
        height : "100%",
    },  
    errorContainer : {
        marginBottom : 15
    },
    modeItem : {
        borderColor : generateColor(primary , 5),
        borderBottomWidth : 2,
        width: "45%",
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'flex-end',
    },
    disabledCta : {
        opacity:  .5
    },
    modeContainer : {
        flexDirection : "row",
        justifyContent : 'space-between',
        marginTop : 25
    },
    contentContainer : {
        flex : 1,
    },
    header : {
        marginTop : StatusBar.currentHeight + 10,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    userDetailsChangeCta : {
        backgroundColor : generateColor(primary , 8),
        borderRadius : baseBorderRadius,
        padding: 15,
        alignItems : 'center',
        
    },
    iconContainer : {
        backgroundColor : generateColor(primary , 5),
        padding : 15,
        borderRadius : baseBorderRadius,
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 10,
        width : 55,
        height : 55
    },
    sectionLabel :{ 
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    editProfile :{
        marginTop : 15
    }
})

export default ProfileEdit;
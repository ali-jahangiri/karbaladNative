import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {StyleSheet, View , TouchableOpacity, ScrollView } from 'react-native';

import client from '../client';
import { useStyle } from '../Hooks/useStyle';
import { setAppKey } from '../Store/Slices/authSlice';
import { useDispatch, useSelector } from '../Store/Y-state';
import { generateColor, persister, toFarsiNumber } from '../utils';
import useFetch from '../Providers/useFetch';


import Loading from "../components/Loading";
import UserIconBox from "../components/UserIconBox";
import Input from '../components/Input';
import Para from '../components/Para';
import ProfileRow from '../components/ProfileRow';
import ScreenHeader from '../components/ScreenHeader';
import Drawer from '../components/Drawer';


const { CHANGE_PASSWORD , CHANGE_USERNAME , PROFILE_EDIT } = client.static

const Profile = () => {
    const appendStyle = useStyle(style);
    
    const [inputValue, setInputValue] = useState({});
    const [currentUserEditMode, setCurrentUserEditMode] = useState(null);
    const [profileEditWasSuccessfully, setProfileEditWasSuccessfully] = useState(false);
    const [phoneAsUserName, setPhoneAsUserName] = useState(null)
    const [respondErr, setRespondErr] = useState(null);
    
    const fetcher = useFetch();

    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [insideSomeAsyncProcess, setInsideSomeAsyncProcess] = useState(false);

    const [tempUserName, setTempUserName] = useState('');

    const navHash = useSelector(state => state.navigation.navigationHash);

    const storeDispatcher =  useDispatch();

    useEffect(() => {
        setLoading(true);
        fetcher("UserProfile")
            .then(({ data }) => {
                setUserData(data);
                persister.get("userName")
                .then(userName => {
                        setPhoneAsUserName(userName);
                        setLoading(false);
                    })
            })
    } , [navHash]);

    const changeHandler = (key , value) => {
        setRespondErr(null);
        setInputValue(prev => ({
            ...prev,
            [key] : value
        }));
    }


    // TODO for avatar image , if user set a new image we send it to server , but for know use internal base 64 path and use internal resource => internalAvatar || receivedAvatar
    

    // const getLibraryPermission = async () => {
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if(status !== "granted") {
    //         Alert.alert("اجازه دسترسی داده نشد" , "برای وارد کردن تصاویر ، دسترسی را به برنامه بدهید" , [{
    //             onPress : () => getLibraryPermission(),
    //             text : "درخواست مجدد"
    //         },
    //         {
    //             text : "بستن",
    //             onPress : () => {}
    //         }
    //         ]);
    //         return false
    //     }else return true
    // }


    // const pickingHandler = async () => {
    //     if(await getLibraryPermission()) {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes : ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing : true,
    //             quality : .8,
    //             base64 : true
    //         })
    //         if(!result.cancelled) changeHandler('avatar' , result.uri) 
    //     }
        
    // }


    const feedBackHandler = () => {}


    const logoutHandler = () => {
        persister
            .remove('userPrivateKey')
                .then(_ => {
                    persister.remove("userName")
                        .then(response => {
                            storeDispatcher(() => setAppKey(''))
                        })
                });
    }



    const doneWithProfileEditHandler = () => {
        setProfileEditWasSuccessfully(false);
        setInputValue({});
        setCurrentUserEditMode(null);
        setRespondErr(null);
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
                            setTempUserName(userName)
                            setProfileEditWasSuccessfully(PROFILE_EDIT.USERNAME_CHANGE.SUCCESS_USERNAME_CHANGE)
                            setInsideSomeAsyncProcess(false) 
                        })
                }).catch(err => {})
            }
        }

    }

    const requestAction = body => {
        return fetcher("GetUserData" , body)
                .then(({ data }) => {
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


    const switchCurrentUserDetailsChange = (newMode , clearInputStore = true) => {
        clearInputStore && currentUserEditMode !== newMode &&  setInputValue({});
        setCurrentUserEditMode(newMode);
        setRespondErr(null);
    }



    const drawerCloseHandler = () => {
        doneWithProfileEditHandler()
    }


    if(loading) return <Loading />
    else return (
        <>
                <ScreenHeader title="پروفایل" />
                <ScrollView>
            <View>
                <View style={appendStyle.avatar}>
                    <UserIconBox bgAlpha={2} />
                    {/* <View> */}
                    {/* <Image style={appendStyle.avatarImg} 
                        source={{ uri : 'data:image/jpeg;base64,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' , width : 120 , height : 120 }} /> */}
                        {/* <TouchableOpacity onPress={pickingHandler} style={appendStyle.editImageContainer}>
                            <View style={appendStyle.editImageIcon} >
                                <Feather name="image" size={25} color={generateColor(primary , 9)} />
                            </View>
                        </TouchableOpacity> */}
                    {/* </View> */}
                    {/* <View style={appendStyle.imageDivider} /> */}
                    <Para weight="bold" color="#050513" size={22}>
                        {tempUserName || userData?.fullName || userData.mobile_UserName}
                    </Para>
                    {
                        userData?.fullName ? <Para color="#536162">{userData.mobile_UserName}</Para> :null
                    }
                </View>
            </View>
            {/* <ProfileRow label="جزئیات کاربری" icon="user">
                <ProfileEditableInput label="نام و نام خانوادگی" value={inputValue?.fullName} onChange={value => changeHandler("fullName" , value)} />
                <ProfileEditableInput label="تلفن همراه" value={inputValue?.phone} onChange={value => changeHandler("phone" , value)} />
                <ProfileEditableInput label="تلفن ثابت" value={inputValue?.telephone} onChange={value => changeHandler("telephone" , value)} />
                <ProfileEditableInput label="کد ملی" value={inputValue?.nCode} onChange={value => changeHandler('nCode' , value)} />
                <ProfileEditableInput label="تاریخ تولد" value={inputValue?.birthDay} onChange={value => changeHandler("birthDay" , value)} />
                <ProfileEditableInput label="ایمیل" value={inputValue?.email} onChange={value => changeHandler("email" , value)} />
                <ProfileEditableInput label="جنسیت" value={inputValue?.genders} onChange={value => changeHandler("genders" , value)} />
            </ProfileRow> */}
            
            {/* <ProfileRow label="جزئیات حساب" icon="credit-card">
            {setIsCollapse => (
                <>
                    <ProfileEditableInput label="نام بانک" value={inputValue?.bankName} onChange={value => changeHandler("bankName" ,value)} />
                    <ProfileEditableInput label="شماره حساب" value={inputValue?.accountNumber} onChange={value => changeHandler("accountNumber" ,value)} />
                    <ProfileEditableInput label="شماره شبا" value={inputValue?.shabaNumber} onChange={value => changeHandler("shabaNumber" ,value)} />
                </>
            )}
            </ProfileRow> */}
            <View style={appendStyle.contentContainer}>
                <View>
                    <ProfileRow icon="edit-2" label="ویرایش حساب">
                        <View style={appendStyle.editProfile}>
                            <View style={{ flexDirection :"row" , justifyContent : 'space-between' , alignItems : 'center' }}>
                                <TouchableOpacity onPress={() => switchCurrentUserDetailsChange(CHANGE_USERNAME)}>
                                    <View style={appendStyle.activeBullet} >{currentUserEditMode === CHANGE_USERNAME ? <View style={appendStyle.activeBulletInnerBox} /> : null}</View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => switchCurrentUserDetailsChange(CHANGE_USERNAME)}>
                                        <Para size={15}>ویرایش نام کاربری</Para>
                                </TouchableOpacity>
                            </View>
                            {
                                currentUserEditMode === CHANGE_USERNAME ? <View style={appendStyle.changeableContainer}>
                                <Input placeholder="نام کاربری جدید" changeHandler={value => changeHandler("userName" , value)} value={inputValue?.userName} />
                                <Input isPassword placeholder="رمز عبور" changeHandler={value => changeHandler("password" , value)} value={inputValue?.password} />
                                {
                                    respondErr && currentUserEditMode === CHANGE_USERNAME ? <View style={appendStyle.errorContainer}>
                                        <Para color='red' >{respondErr}</Para>
                                    </View> : null
                                }
                                <TouchableOpacity disabled={respondErr || insideSomeAsyncProcess} style={[appendStyle.userDetailsChangeCta , respondErr || insideSomeAsyncProcess ? appendStyle.disabledCta : {}]} onPress={changeUserDetailsHandler}>
                                    <Para weight="bold">{
                                        insideSomeAsyncProcess ? "درحال ویرایش نام کاربری..." : "ویرایش نام کاربری"
                                    }</Para>
                                </TouchableOpacity>
                            </View> : null
                            }
                        </View>
                        <View style={appendStyle.editProfile}>
                            <View style={{ flexDirection :"row" , justifyContent : 'space-between' , alignItems : 'center' }}>
                                <TouchableOpacity onPress={() => switchCurrentUserDetailsChange(CHANGE_PASSWORD)}>
                                    <View style={appendStyle.activeBullet} >{currentUserEditMode === CHANGE_PASSWORD ? <View style={appendStyle.activeBulletInnerBox} /> : null}</View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => switchCurrentUserDetailsChange(CHANGE_PASSWORD)}>
                                        <Para size={15}>تغییر رمز عبور</Para>
                                </TouchableOpacity>
                            </View>
                            
                            {
                                currentUserEditMode === CHANGE_PASSWORD ? <View style={appendStyle.changeableContainer}>
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
                            </View> : null
                            }
                        </View>
                    </ProfileRow>
                    {/* TODO code instead of flag */}
                    {/* <ProfileRow label="بازخورد"icon="flag" >
                        {setIsCollapse => (
                                <>
                                    <Input isMultiLine placeholder="نظر و بازخورد خود را وارد نمایید" />
                                    <TouchableOpacity style={appendStyle.feedbackCta} onPress={() => {
                                        feedBackHandler();
                                        setIsCollapse(false)
                                    }}>
                                        <Feather name="arrow-up-left" size={24} style={{ marginRight : 10 }} color="black" />
                                        <Para weight="bold" size={16}>ارسال</Para>
                                    </TouchableOpacity>
                                </>
                        )}
                    </ProfileRow> */}
                </View>
                <View>
                    <TouchableOpacity style={appendStyle.logout} onPress={logoutHandler}>
                            <Feather style={{ marginRight : 10 }} name="log-out" size={24} color="red" />
                            <Para weight="bold" color="red" size={16}>خروج</Para>
                    </TouchableOpacity>
                    <View style={appendStyle.version}>
                        <Para color="lightgrey">{client.version}</Para>
                        <Para color="lightgrey"> نسخه </Para>
                    </View>
                </View>
            </View>
            </ScrollView>
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



const style = ({ primary , secondary , baseBorderRadius }) => StyleSheet.create({
    avatar : {
        width: "80%",
        justifyContent : 'center',
        alignItems : 'center',        
        marginHorizontal : '10%',
        marginTop : 30
    },
    // avatarImg : {
    //     borderRadius : baseBorderRadius,
    //     marginBottom : 10
    // },
    // imageDivider : {
    //     width: "30%",
    //     marginVertical : 10,
    //     height: 3,
    //     backgroundColor : primary,
    //     borderRadius : baseBorderRadius
    // },
    respondErr : {
        marginBottom : 10,
    },  
    activeBulletInnerBox : {
        width : '50%',
        height: '50%',
        borderRadius : baseBorderRadius - 10,
        backgroundColor : generateColor(primary , 1)
    },  
    editProfile : {
        marginVertical : 10
    },  
    activeBullet : {
        width : 40,
        height : 40,
        borderRadius : baseBorderRadius,
        backgroundColor : generateColor(primary , 2),
        alignItems : 'center',
        justifyContent : 'center'
    },  
    logout : {
        flexDirection : 'row',
        justifyContent : 'center',
        marginVertical : 20,
    },
    version : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center'
    },
    feedbackCta : {
        backgroundColor : generateColor(primary , 5),
        padding: 15,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    userDetailsChangeCta : {
        backgroundColor : generateColor(primary , 8),
        borderRadius : baseBorderRadius,
        padding: 15,
        alignItems : 'center',
        
    },
    drawerContentContainer : {
        justifyContent : 'center',
        alignItems : "center", 
        height : "100%"
    },  
    errorContainer : {
        marginBottom : 10
    },
    drawerCloseTrigger : {
        marginTop : 10,
        backgroundColor : generateColor(primary , 5),
        width : "90%",
        padding: 15,
        borderRadius : baseBorderRadius
    },
    // editImageContainer : {
    //     position: 'absolute',
    //     backgroundColor : "white",
    //     left: -10,
    //     top: -10,
    //     borderWidth : 5,
    //     borderRadius : baseBorderRadius,
    //     borderColor : 'white',
    //     width: 50,
    //     height : 50,
    // },
    // editImageIcon : {
    //     backgroundColor : generateColor(primary , 5),
    //     width : "100%",
    //     height : "100%",
    //     borderRadius : baseBorderRadius - 5,
    //     alignItems : 'center',
    //     justifyContent : 'center',
    //     alignSelf : 'center'

    // },
    disabledCta : {
        opacity:  .5
    },
    contentContainer :  { 
        justifyContent : 'space-between',
        flex: 1,
    }
})

export default Profile;
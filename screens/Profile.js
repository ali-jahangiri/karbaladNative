import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View  } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useStyle } from '../Hooks/useStyle';

import { generateColor} from '../utils';
import useFetch from '../Providers/useFetch';


import Reminder from './Reminder';
import Support from './Support';
import ProfileEdit from './ProfileEdit';

import Loading from "../components/Loading";
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileSection from '../components/Profile/ProfileSection';
import ProfileClineVersion from '../components/Profile/ProfileClientVersion';
import RefreshAlert from '../components/RefreshAlert';
import { useDispatch } from '../Store/Y-state';
import { setTabBarState } from '../Store/Slices/uiSlice';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const appendStyle = useStyle(style);

    const { primary } = useStyle();

    const fetcher = useFetch();
    const isFocused = useIsFocused();
    const storeDispatcher = useDispatch();

    useEffect(() => {
        if(!isFocused) storeDispatcher(() => setTabBarState("transparent"))
        else storeDispatcher(() => setTabBarState(generateColor(primary , 5)));
    } , [isFocused])
    
    useEffect(() => {
        if(loading) {
            setLoading(true);
            fetcher("UserProfile")
                .then(({ data }) => {
                    setUserData(data);
                    setLoading(false);
                })
        }else {
            fetcher("UserProfile")
                .then(({ data }) => {
                    setUserData(data)
                    setRefresh(true);
                    let timer = setTimeout(() => {
                        setRefresh(false)
                        clearTimeout(timer);
                    } , 1500)
                }) 
        }
    } , [isFocused]);




    if(loading) return <Loading />
    else return (
            <View style={{ backgroundColor : generateColor(primary , 5) , flex : 1 }}>
                <ScrollView contentContainerStyle={{ flex : 1 }}>
                <ProfileHeader userData={userData} />
                <View style={appendStyle.contentContainer}>
                    <View>
                        <ProfileSection
                            path="profileEdit"
                            title="ویرایش حساب"
                            icon={<Feather name="edit-2" size={24} color={primary}/>}  />

                        <ProfileSection
                            path="support"
                            title="پشتیبانی" 
                            icon={<Ionicons name="help-buoy-outline" size={24} color={primary} />} />

                        <ProfileSection 
                            icon={<Feather name="calendar" size={24} color={primary}/>} 
                            path="reminder" 
                            title="یادآور" />

                        <ProfileSection 
                            icon={<Ionicons name="bug-outline" size={24} color={primary} />}
                            path="support"
                            title="بازخورد"
                            params={{ isFeedback : true }}
                        />
                    </View>
                    <ProfileClineVersion />
                </View>
                </ScrollView> 
                {
                    refresh ? <RefreshAlert /> : null
                }
            </View>
    )
}



const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
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
    
    feedbackCta : {
        backgroundColor : generateColor(primary , 5),
        padding: 15,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row'
    },
    contentContainer :  { 
        justifyContent : 'space-between',
        flex: 1,
        backgroundColor : "white",
        width : "90%",
        marginHorizontal : "5%",
        borderRadius : baseBorderRadius
    }
})



const Stack = createStackNavigator();


const ProfileRouter = () => (
    <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name="profileIndex" component={Profile} />
        <Stack.Screen name="profileEdit" component={ProfileEdit} />
        <Stack.Screen name="reminder" component={Reminder} />
        <Stack.Screen name="support" component={Support} />
    </Stack.Navigator>
)

export default ProfileRouter;
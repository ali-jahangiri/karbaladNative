import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Image, ScrollView, StyleSheet, View , TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, statusChecker, toFarsiNumber } from '../utils';
import Para from '../components/Para';
import TabScreenHeader from '../components/TabScreenHeader';
import { useSelector } from '../Store/Y-state';

import dayjs from 'dayjs';

import Loading from "../components/Loading"
import useFetch from '../Providers/useFetch';
import Btn from '../components/Btn';
import client from '../client';

const { ORDER_TEXT , WATCH_IMAGE_TEXT } = client.static.INS_DETAILS;

const ListViewRow = ({ title , value }) => {
    const style = useStyle(listViewStyle)
    return (
        <View style={style.container}>
            <Para style={style.value}>{value}</Para>
            <View style={style.titleContainer}>
                <Para style={style.title}>{title}</Para>
                <View style={style.bullet}></View>
            </View>
        </View>
    )
}

const listViewStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 10
    },  
    title : {color: "grey",},  
    bullet : {
        width: 10,
        height: 10,
        borderRadius: baseBorderRadius,
        backgroundColor : generateColor(primary , 5),
        marginLeft : 10
    },
    titleContainer : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    value : {
        flex: 1,
        textAlign : 'left',
        
    }
})



const InsDetailsView = ({ details }) => {
    const navigation = useNavigation();
    
    const { iconUrl  = "", createTime  = "", factorModeId  = "", categorysFullName = "" , insImages  = "", nCode = "" , reciverName  = "", reciverFamily = "" , mobile = "" ,areasFullName = "" , reciverPhone  = "", reciverMobile = "" ,factorItems = "", exactAddress = "" , genders = "" , id  = "", birthDay = "", showCta = true , name = "" , stringAmunt } = details;
    const { color : statusColor , title : statusTitle , icon : statusIcon } = statusChecker(factorModeId);

    const appendStyle = useStyle(style , statusColor);

    const currentCreateTime = dayjs(createTime).calendar("jalali").locale('fa').format("YYYY/MM/DD");

    const pressHandler = () => {
        if(factorModeId >= 3) navigation.navigate("insuranceHistoryImages" , { insImages , id , insuranceCoName , categorysFullName })
        else navigation.navigate('insurancePayment' , { id })
    }

    return (
        <>
            <TabScreenHeader title="جزئیات بیمه نامه" navigation={navigation} />
            <ScrollView>
                <View>
                    <View style={appendStyle.imageContainer}>
                        <View style={{ alignItems : 'flex-end' , flex: 1 }}>
                            <View style={{ borderColor : statusColor , borderWidth : 2 , borderRadius : 45 , alignItems : 'center' , justifyContent : 'center' }}>
                                <Image style={{ borderRadius : 45 , overflow : "hidden" }} resizeMode="contain" source={{
                                    uri : imageFinder(iconUrl),
                                    height: 90,
                                    width: 90
                                    }} />
                                </View>
                        </View>
                        <View style={appendStyle.mainDetail}>
                            <Para align="center" style={{ marginTop : 20 , marginBottom : 10 }} weight="bold" size={18}>{categorysFullName}</Para>
                            <View style={appendStyle.column}>
                                <Para color="grey">تاریخ</Para>
                                <Para size={16}>{toFarsiNumber(currentCreateTime)}</Para>
                            </View>
                            <View style={appendStyle.column}>
                                <Para color="grey">شماره پیگیری</Para>
                                <Para size={16}>{id}</Para>
                            </View>
                            <View style={appendStyle.column}>
                                <Para color="grey">وضعیت</Para>
                                <View style={appendStyle.statusContainer}>
                                    <Para weight="bold" color={statusColor} size={14}>{statusTitle}</Para>
                                    <View style={{ marginLeft : 5 }}>{statusIcon}</View>
                                </View>
                            </View>
                        </View>
                    </View>
                        <View style={appendStyle.detailsContainer}>
                            <Para style={appendStyle.label}>مشخصات تحویل گیرنده</Para>
                            <ListViewRow title="نام و نام خانوادگی" value={`${reciverName} ${reciverFamily}`} />
                            <ListViewRow title="منطقه" value={areasFullName} />
                            <ListViewRow title="شماره تلفن" value={toFarsiNumber(reciverPhone)} />
                            <ListViewRow title="شماره همراه" value={toFarsiNumber(reciverMobile)} />
                            <ListViewRow title="آدرس" value={exactAddress} />
                            
                            <Para style={appendStyle.label}>مشخصات بیمه گذار</Para>
                            <ListViewRow title="نام و نام خانوادگی" value={`${name} ${reciverFamily}`} />
                            <ListViewRow title="شماره همراه" value={toFarsiNumber(mobile)} />
                            <ListViewRow title="کد ملی" value={toFarsiNumber(nCode)} />
                            <ListViewRow title="تاریخ تولد" value={toFarsiNumber(birthDay.split('T')[0].replace(/-/g, '/'))} />
                            <ListViewRow title="جنسیت" value={genders == 1 ? ' مرد ' : ' زن' } />
                            
                            <Para style={appendStyle.label}>مشخصات بیمه نامه</Para>
                            {
                                factorItems?.map((el , i) => (
                                    <ListViewRow key={i} title={el.lable} value={toFarsiNumber(el.show_Value)} />
                                ))
                            }
                    </View>
                </View>
            </ScrollView>
            {
                showCta ?
                <Btn 
                    title={factorModeId >= 3 ? WATCH_IMAGE_TEXT :  ORDER_TEXT  + ` - ${toFarsiNumber(stringAmunt)}`+' تومان '} 
                    onPress={pressHandler}
                    extendStyle={{ width : "90%" , marginHorizontal : "5%" }} />
                 : null
            }
            </>
    )
}

const InsuranceHistoryDetails = () => {
    const { params } = useRoute();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const navHash = useSelector(state => state.navigation.navigationHash);

    const fetcher = useFetch();

    useEffect(() => {
        setLoading(true)
        fetcher('UserInsuranceDetail' , { Id : params.id })
            .then(({ data }) => {
                setDetails(data[0])
                setLoading(false);
            })
    } , [navHash])

    return loading ? <Loading /> : <InsDetailsView details={details} />
}

const style = ({ primary , secondary , baseBorderRadius } , statusColor) => StyleSheet.create({
    statusContainer : {
        flexDirection : "row",
        alignItems : 'center',
        justifyContent : 'center',
        padding : 10,
        borderRadius : baseBorderRadius,
        backgroundColor : statusColor
    },
    statusIconContainer : {
        backgroundColor : '#00000010',
        height: "100%",
        alignItems : 'center',
        flexDirection : 'row',
        padding: 10,
    },
    statusText : {
        marginHorizontal : 10,
        marginLeft : 20
    },
    imageContainer : {
        // flexDirection : "row",
        alignItems : 'center',
        marginVertical : 20,
        width: "90%",
        marginHorizontal : "5%"
    },
    label : {
        color: 'grey',
        fontSize : 15,
        marginVertical : 10,
        backgroundColor : generateColor(secondary , 4),
        borderRadius: baseBorderRadius,
        paddingVertical : 10,
        paddingHorizontal : 20,
        alignSelf : 'flex-end',

    },
    detailsContainer : {
        width: "90%",
        marginHorizontal : "5%",
        flexDirection : 'column',

    },
    column : {
        flexDirection : 'row-reverse',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginVertical : 5,
        
    },
    mainDetail : {
        width : "100%",
    },
    row : {
        width: "48%"
    },
})

export default InsuranceHistoryDetails;





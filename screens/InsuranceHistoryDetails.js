import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/core';
import { Image, ScrollView, StyleSheet, View , TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, statusChecker, toFarsiNumber } from '../utils';
import Para from '../components/Para';
import TabScreenHeader from '../components/TabScreenHeader';
import PersianDate from "persian-date";
import { useSelector } from '../Store/Y-state';

import Loading from "../components/Loading"
import useFetch from '../Providers/useFetch';

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

    const currentCreateTime = new PersianDate(createTime).format("YYYY/MM/DD");

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
                        <View style={{ maxWidth : "75%" , minWidth : "50%" }}>
                            <View style={appendStyle.statusContainer}>
                            <Para style={appendStyle.statusText}>{statusTitle}</Para>
                                <View style={appendStyle.statusIconContainer}>
                                    {
                                        statusIcon
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems : 'flex-end' , flex: 1 }}>
                            <View >
                                <Image resizeMode="contain" source={{
                                    uri : imageFinder(iconUrl),
                                    height: 90,
                                    width: 90
                                    }} />
                                </View>
                        </View>
                    </View>
                        <View style={appendStyle.detailsContainer}>
                            
                                    <View style={appendStyle.column}>
                                                <Para style={appendStyle.label}>رشته بیمه</Para>
                                                <Para style={{ flex : .9}} size={16}>{categorysFullName}</Para>
                                    </View>
                                    <View style={appendStyle.column}>
                                        <Para style={appendStyle.label}>تاریخ ثبت</Para>
                                        <Para size={16}>{currentCreateTime}</Para>
                                    </View>
                                    <View style={appendStyle.column}>
                                        <Para style={appendStyle.label}>شماره پیگیری</Para>
                                        <Para size={16}>{id}</Para>
                                    </View>
                                    
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
                showCta ? <TouchableOpacity onPress={pressHandler} style={appendStyle.cta}>
                    <Para align="center" size={16} style={appendStyle.ctaText} weight="bold">{factorModeId >= 3 ? "مشاهده تصاویر بیمه نامه" : 'پرداخت'}{` - ${toFarsiNumber(stringAmunt)}`+' تومان '}</Para>
                </TouchableOpacity> : null
            }
            </>
    )
}

const InsuranceHistoryDetails = () => {
    const { params } = useRoute();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    
    
    const navHash = useSelector(state => state.navigation.navigationHash);

    const fetcher = useFetch(false);

    useEffect(() => {
        setLoading(true)
        fetcher('UserInsuranceDetail' , { Id : params.id })
            .then(({ data }) => {
                // !Important TODO => returned data is an array , that need to be a simple object
                setDetails(data[0])
                setLoading(false);
            })
    } , [navHash])

    return loading ? <Loading /> : <InsDetailsView details={details} />
}

const style = ({ primary , secondary , baseBorderRadius } , statusColor) => StyleSheet.create({
    statusContainer : {
        flexDirection : 'row',
        overflow: "hidden",
        justifyContent : 'space-between',
        alignItems : 'center',
        borderRadius: baseBorderRadius,
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
        flexDirection : "row",
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

    },
    row : {
        width: "48%"
    },
    cta : {
        width : "90%",
        backgroundColor : generateColor(primary , 3),
        paddingVertical : 15,
        marginHorizontal : "5%",
        borderRadius : baseBorderRadius
    },
    ctaText : {
        color:  generateColor(primary , 9)
    }
})

export default InsuranceHistoryDetails;





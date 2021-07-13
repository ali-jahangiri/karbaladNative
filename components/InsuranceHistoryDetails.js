import { useNavigation, useRoute } from '@react-navigation/core';
import React from 'react';
import { Image, ScrollView, StyleSheet, View , TouchableOpacity } from 'react-native';
import { useStyle } from '../Hooks/useStyle';
import { generateColor, imageFinder, statusChecker } from '../utils';
import Para from './Para';
import TabScreenHeader from './TabScreenHeader';

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

const InsuranceHistoryDetails = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { iconUrl , createTime , insuranceCoName , factorModeId , categorysFullName , insImages , nCode , reciverName , reciverFamily , mobile ,areasFullName , reciverPhone , reciverMobile ,factorItems, exactAddress , genders , id , birthDay, showCta = true , ...rest} = params
    
    const { color : statusColor , title : statusTitle , icon : statusIcon } = statusChecker(factorModeId);
    const appendStyle = useStyle(style , statusColor);
    
    const pressHandler = () => {
        // user pay the cost
        if(factorModeId >= 3) navigation.navigate("insuranceHistoryImages" , {insImages , id , insuranceCoName , categorysFullName })
        else navigation.navigate('insurancePayment' , { id })
    }
    return (
    <>
    <ScrollView>
        <View>
            <TabScreenHeader title="جزئیات بیمه نامه" navigation={navigation} />
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
                                        <Para size={16}>{categorysFullName}</Para>
                            </View>
                            <View style={appendStyle.column}>
                                <Para style={appendStyle.label}>تاریخ ثبت</Para>
                                <Para size={16}>{new Date(createTime).toLocaleDateString('fa-IR')}</Para>
                            </View>
                            <View style={appendStyle.column}>
                                <Para style={appendStyle.label}>شماره پیگیری</Para>
                                <Para size={16}>{id}</Para>
                            </View>
                            
                    <Para style={appendStyle.label}>مشخصات تحویل گیرنده</Para>
                    <ListViewRow title="نام و نام خانوادگی" value={`${reciverName} ${reciverFamily}`} />
                    <ListViewRow title="منطقه" value={areasFullName} />
                    <ListViewRow title="شماره تلفن" value={reciverPhone} />
                    <ListViewRow title="شماره همراه" value={reciverMobile} />
                    <ListViewRow title="آدرس" value={exactAddress} />
                    
                    <Para style={appendStyle.label}>مشخصات بیمه گذار</Para>
                    <ListViewRow title="نام و نام خانوادگی" value={`${name} ${reciverFamily}`} />
                    <ListViewRow title="شماره همراه" value={mobile} />
                    <ListViewRow title="کد ملی" value={nCode} />
                    <ListViewRow title="تاریخ تولد" value={birthDay.split('T')[0].replace(/-/g, '/')} />
                    <ListViewRow title="جنسیت" value={genders == 1 ? ' مرد ' : ' زن' } />
                    
                    <Para style={appendStyle.label}>مشخصات بیمه نامه</Para>
                    {
                        factorItems?.map((el , i) => (
                            <ListViewRow key={i} title={el.lable} value={el.show_Value} />
                        ))
                    }
            </View>
        </View>
    </ScrollView>
    {
        showCta ? <TouchableOpacity onPress={pressHandler} style={appendStyle.cta}>
            <Para align="center" style={appendStyle.ctaText} weight="bold">{factorModeId >= 3 ? "مشاهده تصاویر بیمه نامه" : 'پرداخت'}</Para>
        </TouchableOpacity> : null
    }
    </>
    )
}

const style = ({ primary , secondary , baseBorderRadius } , statusColor) => StyleSheet.create({
    // firstDetails : {
    //     width: "100%",
    // },
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
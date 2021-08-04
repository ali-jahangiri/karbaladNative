import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import useFetch from "../Providers/useFetch"

import Loading from "../components/Loading";
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import Para from '../components/Para';
import EmptyState from "../components/EmptyState";
import EmptyScreen from './EmptyScreen';
import { Feather } from '@expo/vector-icons';
import DirectionCta from '../components/DirectionCta';
import { createAnimatedPropAdapter, onChange } from 'react-native-reanimated';


import RefreshAlert from "../components/RefreshAlert";

import DatePicker from "../components/DatePicker";

import { persianDate } from '../utils';

import Persian from "persian-date";


import Drawer from "../components/Drawer";
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';

const categoryList = [
    "بیمه ثالث",
    "بیمه بدنه",
    "بیمه مسئولیت",
    "بیمه آتش سوزی",
    "بیمه حوادث",
    "بیمه درمان",
    "بیمه سازمانها",
    "بیمه مهندسی",
    "اقساط بیمه"
]






const CategoryPicker = ({ selectedItem , selectHandler }) => {
    const appendedStyle = useStyle(categoryStyle);
    const scrollRef = useRef();

    const onSelect = value => {
        const itemIndex = categoryList.findIndex(el => el === value);
        scrollRef.current.scrollTo({x: itemIndex * 200});
        selectHandler(value)
    }

    return (
        <>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' }}>
                <Para size={17} weight="bold">موضوع دسته بندی</Para>
                <View style={appendedStyle.bullet} />
            </View>
            <ScrollView ref={scrollRef} horizontal style={appendedStyle.scrollContainer}>
                {
                    categoryList.map((el , i ) => (
                        <TouchableOpacity onPress={() => onSelect(el)} style={[appendedStyle.itemContainer ,  selectedItem === el ? appendedStyle.selectedItem : null]} key={i}>
                            <View style={{ alignItems : 'center' , justifyContent : 'center' , flexDirection : "row"}}>
                                {
                                    selectedItem === el && <Feather style={{ marginRight : 10 }} name="check" size={24} color="black" />
                                }
                            <Para>{el}</Para>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </>
    )
}


const categoryStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    selectedItem : {
        backgroundColor : generateColor(primary, 5),
    },
    bullet : {
        width : 25,
        height:  25,
        borderRadius : baseBorderRadius - 5,
        backgroundColor : primary,
        marginLeft : 15
    },
    itemContainer : {
        borderRadius : baseBorderRadius,
        marginBottom : 10,
        padding: 25,
        width : 200,
        justifyContent : 'center',
        alignItems : 'center'
    },
    scrollContainer : {
        borderRadius : baseBorderRadius,
        marginTop : 25,
    }
})


const DatePickerEnhancedWithTitle = ({ value , setValue }) => {
    const appendedStyle = useStyle(datePickerStyle);

    return (
        <View style={appendedStyle.container}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' }}>
                <Para size={17} weight="bold">تاریخ یادآوری</Para>
                <View style={appendedStyle.bullet} />
            </View>
            <DatePicker date={value} onChange={({ value }) => setValue(value)} />
        </View>
    )
}

const DescriptionInput = ({ value , setValue }) => {
    const appendedStyle = useStyle(datePickerStyle);

    return (
        <>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' }}>
                    <Para size={17} weight="bold">شرح مختصر</Para>
                    <View style={appendedStyle.bullet} />
            </View>
            <View style={{ width : "100%" }}>
                <TextInput multiline style={appendedStyle.input} placeholder="شرح مختصری از مطلبی که می خواهید به شما یادآوری شود..." value={value} onChangeText={setValue} />
            </View>
        </>   
    )
}

const datePickerStyle = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        marginTop : 25
    },
    input : {
        fontFamily : "bold",
        color: 'grey',
        minHeight : 70,
    },
    bullet : {
        width : 25,
        height:  25,
        borderRadius : baseBorderRadius - 5,
        backgroundColor : primary,
        marginLeft : 15
    },
})




const ReminderPlayground = ({ valueStore , changeHandler , ctaHandler , ctaText , playgroundTitle }) => {
    const appendStyle = useStyle(reminderPlaygroundStyle);
    const { primary } = useStyle();
    

    return (
        <View style={appendStyle.createContainer}>
                    <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , marginTop : 20 }}>
                        <DirectionCta onPress={() => setIsInCreateMode(false)} containerBgColor={generateColor(primary , 5)} direction="left" />
                        <Para size={20} weight="bold">{playgroundTitle}</Para>
                    </View>
                    <View style={{ flex : 1 }}>
                        <ScrollView>
                            <CategoryPicker selectedItem={valueStore?.category} selectHandler={selectedItem => changeHandler('category' , selectedItem)} />
                            <DatePickerEnhancedWithTitle value={valueStore?.date} setValue={date => changeHandler("date" , date)} />
                            <DescriptionInput setValue={value => changeHandler("des" , value)} />
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={appendStyle.createCta} onPress={ctaHandler}>
                        <Feather style={{ marginRight : 5 }} name="chevron-left" size={24} color="black" />
                        <Para weight="bold" size={18}>{ctaText}</Para>
                    </TouchableOpacity>
        </View>
    )
}


const reminderPlaygroundStyle = () => StyleSheet.create({
    createContainer : {
        width : "90%",
        marginHorizontal : "5%",
        flex: 1,
    },
})

const Calender = ({ haveItem , isInCreateMode , setIsInCreateMode }) => {
    const appendStyle = useStyle(calenderStyle);
    const { primary } = useStyle()
    const [valueStore, setValueStore] = useState({});
    const [wasSuccessfully, setWasSuccessfully] = useState(false);

    const fetcher = useFetch();

    const changeHandler = (key , value) => {
        setValueStore(prev => ({
            ...prev,
            [key] : value
        }));
    }
    
    
    const createHandler = () => {
        const filled = Object.keys(valueStore);
        if(filled.length > 2) {
            fetcher("ReminderAdd" , { ...valueStore })
            .then(({ data }) => {
                    if(data) {
                        setWasSuccessfully(true)
                    }
                }) 
        }else {
            Alert.alert("ورودی ها را به درستی وارد کنید")
        }
    }
    
    const navigation = useNavigation();

    {/* <View style={appendStyle.createContainer}>
                        <View style={{ flexDirection : 'row' , justifyContent : 'space-between' , alignItems : 'center' , marginTop : 20 }}>
                            <DirectionCta onPress={() => setIsInCreateMode(false)} containerBgColor={generateColor(primary , 5)} direction="left" />
                            <Para size={20} weight="bold">ایجاد یادآور</Para>
                        </View>
                        <View style={{ flex : 1 }}>
                            <ScrollView>
                                <CategoryPicker selectedItem={valueStore?.category} selectHandler={selectedItem => changeHandler('category' , selectedItem)} />
                                <DatePickerEnhancedWithTitle value={valueStore?.date} setValue={date => changeHandler("date" , date)} />
                                <DescriptionInput setValue={value => changeHandler("des" , value)} />
                            </ScrollView>
                        </View>
                        <TouchableOpacity style={appendStyle.createCta} onPress={createHandler}>
                            <Feather style={{ marginRight : 5 }} name="chevron-left" size={24} color="black" />
                            <Para weight="bold" size={18}>ثبت یادآور</Para>
                        </TouchableOpacity>
                    </View>  */}




    return (

        <View style={[appendStyle.container, isInCreateMode ? { flex : 1 , marginTop : StatusBar.currentHeight , backgroundColor : generateColor(primary , 2) } : {}]}>
                <View style={[appendStyle.holder , { left : "10%" }]} />
                    <View style={[appendStyle.holder , { left : "85%" }]} />
                <View style={appendStyle.topHeader}></View>
                {
                    !haveItem ? <View style={appendStyle.createTrigger}>
                        <TouchableOpacity onPress={() => navigation.navigate("reminderPlayground")} style={{ flexDirection : 'row' , alignItems : 'center'}}>
                            <Feather style={{ marginRight : 5 }} name="plus" size={24} color="black" />
                            <Para weight="bold" size={16} >ایجاد یادآور</Para>
                        </TouchableOpacity>
                    </View> : null
                }
                {/* <View style={appendStyle.contentContainer}>
                    <Para size={18} weight="bold">تعداد کل : </Para>
                </View> */}
        </View>
    )
}


const calenderStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        height: 250,
        marginTop : StatusBar.currentHeight + 30 ,
        backgroundColor : generateColor(primary , 6),
        borderRadius : baseBorderRadius,
    },
    createCta : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 8),
        padding : 15,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        marginBottom : 20
    },
   
    contentContainer: {
        padding : 15
    },
    createTrigger : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        height: 185,
    },
    holder : {
        width : 10,
        height: 45,
        backgroundColor : primary,
        borderRadius : baseBorderRadius,
        position: 'absolute',
        top: -15,
    },
    topHeader : {
        borderTopLeftRadius : baseBorderRadius,
        borderTopRightRadius : baseBorderRadius,
        width : "100%",
        height : 65,
        backgroundColor : generateColor(primary , 8)
    }
})


const ReminderItem = ({ remindTime , description, catName , deleteHandler , editHandler , id }) => {
    const appendedStyle = useStyle(itemStyle);
    const [controllerActive, setControllerActive] = useState(false);


    const date = new Persian(remindTime);
    return (
        <View style={appendedStyle.container}>
            <View style={appendedStyle.dateContainer}>
                <Para>{new Persian(remindTime).format('YYYY/MM/DD')}</Para> 
                <View style={appendedStyle.timeline} /> 
            </View>
            <View style={appendedStyle.contentContainer}>
                <Para size={18} weight="bold">{catName}</Para>
                <Para>{description}</Para>
            </View>
            <TouchableOpacity onPress={() => setControllerActive(prev => !prev)} style={appendedStyle.controllerTrigger}>
                <Feather name="more-vertical" size={24} color="#9e9e9e" />
            </TouchableOpacity>
            {
                controllerActive ? <View style={appendedStyle.controller}>
                <TouchableOpacity style={[appendedStyle.cta ,{ backgroundColor : generateColor("#CE1212" , 5) }]} onPress={() => deleteHandler(id)}>
                    <Feather name="x" size={24} color="#8C0000" />
                </TouchableOpacity>
                <TouchableOpacity style={[appendedStyle.cta ,{ backgroundColor : generateColor("#8E9775" , 5) }]} onPress={() => editHandler(id)}> 
                    <Feather name="edit-2" size={24} color="#4A503D" />
                </TouchableOpacity>
                </View> : null
            }
            
        </View>
    )
}


const itemStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flexDirection : 'row-reverse',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginVertical : 15,
        marginTop : 25,
        marginBottom : 15
    },
    controller : {
        flexDirection : "row",

    },
    dateContainer : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding : 15,
        flexDirection : "row"
    },
    controllerTrigger : {
        backgroundColor :"#eeeceb",
        padding:  15,
        borderRadius : baseBorderRadius
    },
    contentContainer : {
        flex: 1,
        marginRight : 10
    },
    cta : {
        padding: 15,
        borderRadius : baseBorderRadius,
        marginHorizontal : 5
    },
    timeline : {
        width : 5,
        height :40,
        backgroundColor : generateColor(primary , 5),
        position: 'absolute',
        left: "60%",
        top: "-140%"
    }
})

const Reminder = () => {
    const [reminderData, setReminderData] = useState([])
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [isInCreateMode, setIsInCreateMode] = useState(false);

    const [tempEditReminder, setTempEditReminder] = useState({});

    const fetcher = useFetch()

    const appendStyle = useStyle(style);

    useEffect(() => {
        fetcher("ReminderGet")
        .then(({ data }) => {
            setReminderData(data)
            setLoading(false);
            })
    } , [])



    const editHandler = id => {
        setTempEditReminder(prev => ({
            ...prev,
            id
        }))
        setDrawerOpen(true);
    }

    const deleteHandler = id => {
        fetcher('DeleteReminder' , { id })
            .then(({ data }) => {
                if(data) {
                    fetcher("ReminderGet")
                        .then(({ data }) => {
                            setReminderData(data)
                            setRefresh(true);
                            let timer = setTimeout(() => {
                                setRefresh(false)
                                clearTimeout(timer);
                            } , 1500);
                        })
                }
            })
    }

    return loading ? <Loading /> : (
        <View style={appendStyle.container}>
            <Calender setIsInCreateMode={setIsInCreateMode} isInCreateMode={isInCreateMode} haveItem={reminderData.length} />
            {
                !isInCreateMode ? <ScrollView contentContainerStyle={{flex : 1 }}>
                {
                    reminderData.length ? reminderData.map((el , i) => <ReminderItem deleteHandler={deleteHandler} editHandler={editHandler} key={i} {...el}  />) : <View style={{ flex : 1}}><EmptyScreen extendStyle={{ with : "100%" }} message="یادآوری وجود ندارد" desc={<TouchableOpacity onPress={setIsInCreateMode}><Para color='grey'>شما هیچ یادآوری تنطیم نکرده اید . یادآوری ایجاد کنید</Para></TouchableOpacity>} /></View>
                }
            </ScrollView> : null
            }
            {
                refresh ? <RefreshAlert /> : null
            }
            {
                drawerOpen ? <Drawer onCancel={() => setDrawerOpen(false)} title="ویرایش یادآور">

                </Drawer> : null
            }
        </View>
    )
}


const style = () => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        flex: 1
    }
})



const Stack = createStackNavigator();

const ReminderNavigation = () => (
    <Stack.Navigator screenOptions={{ headerShown : false }}>
        <Stack.Screen name="reminderIndex" component={Reminder} />
        <Stack.Screen name="reminderPlayground" component={ReminderPlayground} />
    </Stack.Navigator>
)

export default ReminderNavigation;
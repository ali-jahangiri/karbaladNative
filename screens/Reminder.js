import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import useFetch from "../Providers/useFetch"

import Loading from "../components/Loading";
import { useStyle } from '../Hooks/useStyle';
import { generateColor, toFarsiNumber } from '../utils';
import Para from '../components/Para';
import EmptyScreen from './EmptyScreen';
import { Feather } from '@expo/vector-icons';

import dayjs from 'dayjs';

import RefreshAlert from "../components/RefreshAlert";

import DatePicker from "../components/DatePicker";

import Drawer from "../components/Drawer";
import DirectionCta from "../components/DirectionCta";

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
        scrollRef.current.scrollTo({x: (itemIndex * 200 )+ 5});
        selectHandler(value)
    }

    return (
        <View style={{ padding : 20 }}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' , marginTop : 10 }}>
                <Para color="grey" size={17} weight="bold">موضوع دسته بندی</Para>
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
        </View>
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
        backgroundColor : generateColor(primary , 5),
        marginLeft : 15
    },
    itemContainer : {
        borderRadius : baseBorderRadius,
        marginBottom : 10,
        padding: 25,
        width : 200,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 1),
        marginRight : 5
    },
    scrollContainer : {
        borderRadius : baseBorderRadius,
        marginTop : 25,
    }
})


const DatePickerEnhancedWithTitle = ({ value , setValue }) => {
    const appendedStyle = useStyle(datePickerStyle);


    const targetYear = dayjs().calendar("jalali").locale("fa").year();
    
    console.log(value , "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

    return (
        <View style={[appendedStyle.container , { marginHorizontal : 20 }]}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' , marginVertical : 15 }}>
                <Para color="grey" size={17} weight="bold">تاریخ یادآوری</Para>
                <View style={appendedStyle.bullet} />
            </View>
            <DatePicker
                    absoluteValue
                    yearList={[...Array(50).keys()].map((_ , i) => targetYear + i)} 
                    date={value} 
                    onChange={({ value }) => setValue(value)} />
        </View>
    )
}

const DescriptionInput = ({ value , setValue }) => {
    const appendedStyle = useStyle(datePickerStyle);
    
    return (
        <View style={{ margin : 15 }}>
            <View style={{ flexDirection : "row" , alignItems : 'center' , justifyContent : 'flex-end' }}>
                    <Para color="grey" size={17} weight="bold">شرح مختصر</Para>
                    <View style={appendedStyle.bullet} />
            </View>
            <View style={{ width : "100%" }}>
                <TextInput multiline style={appendedStyle.input} placeholder="شرح مختصری از مطلبی که می خواهید به شما یادآوری شود..." value={value} onChangeText={setValue} />
            </View>
        </View>   
    )
}

const datePickerStyle = ({ baseBorderRadius , primary }) => StyleSheet.create({
    container : {
        marginVertical : 15,
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
        backgroundColor : generateColor(primary , 5),
        marginLeft : 15
    },
})




const ReminderPlayground = ({ valueStore , changeHandler , ctaHandler , ctaText , isInSendProcess }) => {
    const appendStyle = useStyle(reminderPlaygroundStyle);
    

    const [isValid, setIsValid] = useState(false);


    console.log(valueStore, 'ValueStore m!!!!!!!');

    useEffect(() => {
        const filled = Object.keys(valueStore);
        if(filled.length > 2) setIsValid(true);
        else setIsValid(false)
    } , [valueStore])  


    return (
        <View style={appendStyle.container}>
                   <View style={{ flex : 1  }}>
                        <ScrollView>
                            <CategoryPicker selectedItem={valueStore?.category} selectHandler={selectedItem => changeHandler('category' , selectedItem)} />
                            <DatePickerEnhancedWithTitle value={valueStore?.date} setValue={date => changeHandler("date" , date)} />
                            <DescriptionInput value={valueStore?.des} setValue={value => changeHandler("des" , value)} />
                        </ScrollView>
                    </View>
                    <TouchableOpacity disabled={isInSendProcess || !isValid} style={[appendStyle.createCta , isInSendProcess || !isValid ? appendStyle.disabledCta : {}]} onPress={ctaHandler}>
                        <Feather style={{ marginRight : 5 }} name={isInSendProcess ? "loader" : "chevron-left"} size={24} color="black" />
                        <Para weight="bold" size={18}>{ctaText}</Para>
                    </TouchableOpacity>
        </View>
    )
}


const reminderPlaygroundStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        flex: 1,
    },
    disabledCta :{ 
        opacity: .5
    },
    createCta : {
        flexDirection : 'row',
        alignItems : 'center',
        backgroundColor : generateColor(primary , 5),
        padding : 15,
        marginHorizontal : 15,
        borderRadius : baseBorderRadius,
        justifyContent : 'center',
        marginBottom : 20
    }
})

const Calender = ({ haveItem , isInCreateMode , setIsInCreateMode , items , valueStore , isInSendingProcess , changeHandler , createHandler}) => {
    const appendStyle = useStyle(calenderStyle , !!haveItem);
    const { primary , baseBorderRadius } = useStyle()
        
    
    const makeNumber = date => Number(dayjs(date).calendar("jalali").locale("fa").format('YYYYMMDD'))

    const nearItem = (() => {
        if(items.length) {
            const today = Number(dayjs().calendar("jalali").calendar('jalali').locale('fa').format('YYYYMMDD'))
            return items.filter(el => makeNumber(el.remindTime) > today).sort((a , b) => makeNumber(a.remindTime) - makeNumber(b.remindTime)).sort((_ , b) => makeNumber(b.remindTime) - today).map(el => ({ ...el , remindTime : dayjs(el.remindTime).calendar("jalali").locale("fa").format("YYYY/MM/DD")}))[0]
            
        }else return null
    })()

    return (

        <View style={[appendStyle.container, isInCreateMode ? { flex : 1 , marginTop : StatusBar.currentHeight , backgroundColor : generateColor(primary , 2) } : {}]}>
                <View style={[appendStyle.holder , { left : "10%" }]} />
                    <View style={[appendStyle.holder , { left : "85%" }]} />
                <View style={appendStyle.topHeader}>
                    {
                        isInCreateMode ? <View style={appendStyle.createHeader}>
                            <DirectionCta onPress={() => setIsInCreateMode(false)} direction="left" containerBgColor={generateColor(primary , 5)} />
                            <Para weight="bold" size={18}>ایجاد یادآور</Para>
                        </View> : null
                    }
                </View>
                {
                    isInCreateMode ? <ReminderPlayground
                                        isInSendProcess={isInSendingProcess}
                                        valueStore={valueStore}
                                        changeHandler={changeHandler} 
                                        ctaHandler={createHandler}
                                        ctaText="ثبت یادآور"
                                    /> : null
                }

                {
                    !haveItem && !isInCreateMode?  
                                <View style={{ flex : 1 }}>
                                        <EmptyScreen extendStyle={{ with : "100%" }} 
                                        message="یادآوری وجود ندارد" 
                                        desc={<View>
                                                <Para color='grey'>شما هیچ یادآوری تنطیم نکرده اید . </Para>
                                                <TouchableOpacity onPress={setIsInCreateMode} style={{ flexDirection : "row-reverse" , alignItems : 'center' , justifyContent : 'center' , marginTop : 10 , backgroundColor : generateColor(primary , 2) , borderRadius : baseBorderRadius , padding : 15 }}>
                                                <Para color={primary}>یادآوری ایجاد کنید</Para>
                                                <Feather name="plus" size={24} color={primary} />
                                                </TouchableOpacity>
                                            </View>} />
                                </View>
                             : null
                }
                {
                    haveItem && !isInCreateMode ? (
                        <>
                            <View style={[appendStyle.calenderRow , { flexDirection : "column-reverse" , alignItems : 'flex-end' , justifyContent : 'center' }]}>
                                <View style={{ marginTop : 10}}>
                                    <View style={{ flexDirection : "row" }}>
                                        <Para style={{ marginRight : 10 }}>{toFarsiNumber(nearItem.remindTime)}</Para>
                                        <Para size={16} weight="bold">{nearItem.catName}</Para>
                                        <View style={appendStyle.divider} />
                                    </View>
                                    <Para>{nearItem.description}</Para>
                                    </View>
                                <View style={{ flexDirection : 'row' , alignItems : 'center' }}>
                                    <Para size={18} weight="bold">نزدیک ترین یادآور : </Para>
                                    <View style={appendStyle.calenderRowIconContainer}>
                                        <Feather name="chevrons-down" size={20} color="black" />
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => setIsInCreateMode(true)} style={appendStyle.createNewReminder}>
                                <Feather name="plus" size={24} color={generateColor(primary , 8)} />
                                <Para color={generateColor(primary , 8)} weight="bold">ثبت یادآور جدید</Para>
                            </TouchableOpacity>
                        </>
                    ): null
                }
        </View>
    )
}


const calenderStyle = ({ primary , baseBorderRadius } , haveItem) => StyleSheet.create({
    container : {
        flex: haveItem ? 0 : 1,
        marginTop : StatusBar.currentHeight + 30 ,
        backgroundColor : generateColor(primary , haveItem ? 6 : 2),
        borderRadius : baseBorderRadius,
    },
    createNewReminder : {
        flexDirection : 'row' , 
        alignItems : 'center', 
        justifyContent : 'center' , 
        paddingVertical : 20 , 
        borderBottomLeftRadius : baseBorderRadius ,
        borderBottomRightRadius : baseBorderRadius
    },
    calenderRowIconContainer : {
        backgroundColor : generateColor(primary , 2) , 
        padding : 10 ,
        borderRadius : baseBorderRadius,
        marginLeft : 10,
        alignItems : 'center',
        justifyContent : 'center'
    },
    divider: {
        width : 25, 
        height : 2,
        backgroundColor : primary,
        alignSelf : 'center',
        marginHorizontal : 10
        
    },
    calenderRow : {
        width : "90%",
        marginHorizontal : "5%",
        backgroundColor : "white",
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 15,
        borderRadius : baseBorderRadius,
        marginTop : 15
    },
    createHeader : {
        marginTop : 25,
        paddingHorizontal : 15,
        flexDirection : "row",
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingVertical : 10,
        height: 105
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
        minHeight : 65,
        backgroundColor : generateColor(primary , haveItem ? 8 : 6)
    }
})


const ReminderItem = ({ remindTime , description, catName , deleteHandler , editHandler , id }) => {
    const appendedStyle = useStyle(itemStyle);
    const [controllerActive, setControllerActive] = useState(false);
    const { primary } = useStyle();

    return (
        <View style={appendedStyle.container}>
            <View style={{ flexDirection: 'row-reverse' }}>
                <View style={appendedStyle.dateContainer}>
                    <Para color={primary}>{toFarsiNumber(dayjs(remindTime).calendar("jalali").locale("fa").format('YYYY/MM/DD'))}</Para> 
                </View>
                <View style={appendedStyle.contentContainer}>
                    <Para size={18} weight="bold">{catName}</Para>
                    <Para>{description}</Para>
                </View>
                <TouchableOpacity onPress={() => setControllerActive(prev => !prev)} style={appendedStyle.controllerTrigger}>
                    <Feather name={controllerActive ? "x" : 'more-vertical'} size={24} color="#9e9e9e" />
                </TouchableOpacity>
            </View>
            {
                controllerActive ? <View style={appendedStyle.controller}>
                <TouchableOpacity style={[appendedStyle.cta ,{ backgroundColor : generateColor("#CE1212" , 5) }]} onPress={() => {
                    setControllerActive(false)
                    deleteHandler(id)
                }}>
                    <Feather name="x" size={24} color="#8C0000" />
                </TouchableOpacity>
                <TouchableOpacity style={[appendedStyle.cta ,{ backgroundColor : generateColor("#8E9775" , 5) }]} onPress={() => {
                    setControllerActive(false)
                    editHandler(id)
                }}> 
                    <Feather name="edit-2" size={24} color="#4A503D" />
                </TouchableOpacity>
                </View> : null
            }
        </View>
    )
}


const itemStyle = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        // flexDirection : 'row-reverse',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingVertical : 15,
    },
    controller : {
        flexDirection : "row",
        justifyContent : 'space-between',
        marginTop : 10,
        width : '100%'
    },
    dateContainer : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding : 15,
        alignItems :'center',
        justifyContent : 'center',
        flexDirection : "row",
        height: '100%'
    },
    controllerTrigger : {
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor :"#eeeceb",
        padding:  15,
        borderRadius : baseBorderRadius
    },
    contentContainer : {
        flex: 1,
        marginRight : 10
    },
    cta : {
        width : "49%",
        alignItems : 'center',
        padding: 15,
        borderRadius : baseBorderRadius,
        // marginHorizontal : 5
    },
})

const Reminder = () => {
    const [reminderData, setReminderData] = useState([])
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const [isInSendingProcess, setIsInSendingProcess] = useState(false);

    const [wasSuccessfully, setWasSuccessfully] = useState(false);

    const [isInCreateMode, setIsInCreateMode] = useState(false);

    const [valueStore, setValueStore] = useState({});

    const fetcher = useFetch()

    const appendStyle = useStyle(style);

    useEffect(() => {
        fetcher("ReminderGet")
        .then(({ data }) => {
            setReminderData(data)
            setLoading(false);
            })
    } , [])


    const changeHandler = (key , value) => {
        setValueStore(prev => ({
            ...prev,
            [key] : value
        }));
    }

    const editHandler = id => {
        const { catName : category , description : des , remindTime : date } = reminderData.find(el => el.id === id);
        const persianDate = dayjs(date).calendar("jalali").locale("fa").format("YYYY/MM/DD")
        setValueStore({ id , category , des , date : persianDate })

        setDrawerOpen(true);
    }

    const resetHandler = () => {
        setValueStore({});
        setIsInCreateMode(false)
        setIsInSendingProcess(false);
    }

    const createHandler = () => {
        const filled = Object.keys(valueStore);

        if(filled.length > 2) {
            const selectedDate = Number(valueStore.date.split("/").join(""));
            const now = Number(dayjs().calendar("jalali").locale("fa").format("YYYYMMDD"));
            if(selectedDate <= now) {
                Alert.alert("تاریخ یادآور انتخاب شده صحیح نیست" , " تاریخی جلوتر از تاریخ امروز انتخاب کنید" , [
                    {
                        text : "تایید",
                        onPress : () => {}
                    }
                ])
            }else {
                setIsInSendingProcess(true);
                fetcher("ReminderAdd" , { ...valueStore })
                .then(({ data }) => {
                        if(data) {
                            fetcher("ReminderGet")
                                .then(({ data }) => {
                                    setReminderData(data)
                                    setWasSuccessfully(true);
                                    resetHandler()
                                })
                        }
                    }) 
            }
        }else {
            Alert.alert("ورودی ها را به درستی وارد کنید")
        }
    }



    const editReqHandler = () => {
        fetcher("EditReminder" , valueStore)  
            .then(() => {
                fetcher("ReminderGet")
                    .then(({ data }) => {
                            setDrawerOpen(false)
                            setValueStore({})
                            setReminderData(data)
                            setRefresh(true);
                            let timer = setTimeout(() => {
                                setRefresh(false)
                                clearTimeout(timer);
                            } , 1500);
                    })
            })
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
        <>
        <View style={appendStyle.container}>
            <Calender
                createHandler={createHandler}
                changeHandler={changeHandler}
                isInSendProcess={isInSendingProcess}
                setIsInSendingProcess={setIsInSendingProcess}
                valueStore={valueStore} 
                setValueStore={setValueStore} 
                setItems={setReminderData} 
                items={reminderData} 
                setWasSuccessfully={setWasSuccessfully} 
                setIsInCreateMode={setIsInCreateMode} 
                isInCreateMode={isInCreateMode} 
                haveItem={reminderData.length} />
            {
                !isInCreateMode ? <ScrollView contentContainerStyle={{flex : 0 }}>
                {
                    reminderData.length ? reminderData.map((el , i) => <ReminderItem deleteHandler={deleteHandler} editHandler={editHandler} key={i} {...el}  />) : null
                }
            </ScrollView> : null
            }
           
        </View>
            {
                wasSuccessfully ? <Drawer onDone={() => setWasSuccessfully(false)} onClose={() => setWasSuccessfully(false)}>
                    <View style={{ height : "100%" , alignItems : 'center' , justifyContent : 'space-between'}}>
                        <View style={appendStyle.successBadge}>
                            <Feather name="check" size={24} color="#4A503D" />
                        </View>
                        <Para size={18} align="center" weight="bold">یادآور با موفقیت ثبت شد</Para>
                        <TouchableOpacity onPress={() => setWasSuccessfully(false)} style={appendStyle.drawerCta}>
                            <Para align="center" size={17} weight="bold">تایید</Para>
                        </TouchableOpacity>
                    </View>
                </Drawer> : null
            }
            {
                refresh ? <RefreshAlert /> : null
            }
            {
                drawerOpen ? <Drawer extendStyle={{ flex : 2.5 }} onClose={() => {
                    setDrawerOpen(false)
                    resetHandler()
                }} onCancel={() => {
                    setDrawerOpen(false)
                    resetHandler()
                }} title="ویرایش یادآور">
                    <ReminderPlayground valueStore={valueStore} changeHandler={changeHandler} ctaText="ویرایش یادآور" ctaHandler={editReqHandler} isInSendProcess={isInSendingProcess}  />
                </Drawer> : null
            } 
        </>
    )
}


const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
    container : {
        width : "90%",
        marginHorizontal : "5%",
        flex: 1,
    },
    drawerCta : {
        width : "90%",
        marginHorizontal : "5%",
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding : 15
    },
    successBadge : {
        width : 65 , height : 65 , backgroundColor : '#B5CDA3' , alignItems : 'center' , justifyContent : 'center',
        borderRadius : baseBorderRadius,
        marginTop : -60
    }
})




export default Reminder;
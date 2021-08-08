import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';


import useFetch from "../Providers/useFetch"
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';


import Loading from "../components/Loading";
import Para from '../components/Para';
import RefreshAlert from "../components/RefreshAlert";
import Drawer from "../components/Drawer";


import { ReminderItem , Calendar, ReminderPlayground } from '../components/Reminder';



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
        setDrawerOpen(false)
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
            <Calendar
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
                { reminderData.length ? 
                    reminderData.map((el , i) => <ReminderItem  
                                                    deleteHandler={deleteHandler}    
                                                    editHandler={editHandler}  
                                                    key={i}  
                                                    {...el}  />) : null }
                
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
                drawerOpen ? <Drawer 
                                extendStyle={{ flex : 2.5 }} 
                                onClose={resetHandler} 
                                onCancel={resetHandler} 
                                title="ویرایش یادآور" >
                                    <ReminderPlayground 
                                        valueStore={valueStore} 
                                        changeHandler={changeHandler} 
                                        ctaText="ویرایش یادآور" 
                                        ctaHandler={editReqHandler}             
                                        isInSendProcess={isInSendingProcess}  
                                    />
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
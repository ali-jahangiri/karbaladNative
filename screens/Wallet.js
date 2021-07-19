import { useNavigationState } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import client from '../client';
import Loading from '../components/Loading';
import ScreenHeader from '../components/ScreenHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import WalletCart from '../components/WalletCard';
import WalletTransaction from '../components/WalletTransaction';
import useFetch from '../Providers/useFetch';
import { useDispatch, useSelector } from '../Store/Y-state';
import EmptyScreen from './EmptyScreen';

import Drawer from "../components/Drawer";

const { DONE , FAIL , CLEAN , FA_DONE , FA_FAIL } = client.static.TRANSACTION;

import { setUserData } from "../Store/Slices/initialSlice"
import Para from '../components/Para';
import { generateColor } from '../utils';
import { useStyle } from '../Hooks/useStyle';

const Wallet = () => {
    const completelyLoaded = useSelector(state => state.initial.completelyLoaded);
    const walletData = useSelector(state => state.initial.userData?.walletData);
    
    const [isInPaymentProcess, setIsInPaymentProcess] = useState(false);
    const [afterPaymentLoading, setAfterPaymentLoading] = useState(false);

    const [transactionStatus, setTransactionStatus] = useState(false);



    const storeDispatcher = useDispatch();
    const fetcher = useFetch(true);
    const ticket = useSelector(state => state.auth.appKey);
    const ref = useRef();



    const appendStyle = useStyle(style);
    

    const routeState = useNavigationState(state => state)


    const getUserProfile = () => {
        setAfterPaymentLoading(true);
        
        fetcher
            .then(({ api , appToken }) => {
                api.post("userProfile" , {} , {
                    headers : {
                        ticket,
                        appToken
                    }
                }).then(({data}) => {
                    const { checkTransactionToWallet: currentStatus } = data;
                    if([DONE , FAIL].includes(currentStatus)) {
                        setTransactionStatus(currentStatus)
                    }
                    storeDispatcher(() => setUserData(data));
                    setAfterPaymentLoading(false);
                    setIsInPaymentProcess(false);
                })
            })  
    }

    const currentRouteName = routeState.routeNames[routeState.index];
    ref.current = currentRouteName;
    
    useEffect(() => {
        AppState.addEventListener("change" , event => {
            (() => {
                if(event === "active") {
                    if(ref.current === client.static.SYSTEM_KEY.SPECIFIC_KEY_FOR_OBSERVER_CONDITION ) {
                        getUserProfile()
                    }
                }
            })()
        });
    } , []);



    const drawerCloseHandler = () => {
        setTransactionStatus(null)
    }


    if(afterPaymentLoading) return <Loading />
    else if(!completelyLoaded) return <Loading />
    else return (
        <>
        <ScreenWrapper>
            <ScreenHeader title="کیف پول" />
            <WalletCart
                paymentProcessHandler={setIsInPaymentProcess}
                isInPaymentProcess={isInPaymentProcess}
                finalResult={walletData.finalResult} />
            {
                walletData.finalResult.length ? <>
                    <ScrollView>
                        {
                            walletData.walletItems.map((el , i) => (
                                <WalletTransaction index={i + 1} key={i} {...el} />
                            ))
                        }
                    </ScrollView>
                </> : <EmptyScreen desc={client.static.EMPTY_SCREEN_WALLET} />
            }
             
        </ScreenWrapper>
        {
            transactionStatus ? <Drawer onClose={drawerCloseHandler}>
                <View style={appendStyle.drawerContentContainer}>
                    <Para align="center" weight="bold" size={18}>
                        {
                            (() => {
                                if(transactionStatus === DONE) return FA_DONE
                                else return FA_FAIL
                            })()
                        }
                    </Para>
                    <TouchableOpacity style={appendStyle.doneCta} onPress={drawerCloseHandler}>
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

    },
    doneCta : {
        backgroundColor : generateColor(primary , 5),
        borderRadius : baseBorderRadius,
        padding : 15,
        width : "90%",
        marginTop : 10
    },
    drawerContentContainer : {
        justifyContent : "center",
        alignItems : 'center',
        height : "100%"
    }
})

export default Wallet;
import React, { useEffect , useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import client from '../client';
import Loading from '../components/Loading';
import ScreenHeader from '../components/ScreenHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import WalletCart from '../components/WalletCard';
import WalletTransaction from '../components/WalletTransaction';

import { useSelector } from '../Store/Y-state';
import EmptyScreen from './EmptyScreen';

import Drawer from "../components/Drawer";

const { DONE , FAIL , FA_DONE , FA_FAIL } = client.static.TRANSACTION;

import Para from '../components/Para';
import { generateColor } from '../utils';
import { useStyle } from '../Hooks/useStyle';
import useFetch from '../Providers/useFetch';
import { useIsFocused, useScrollToTop } from '@react-navigation/native';
import RefreshAlert from '../components/RefreshAlert';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';

const Wallet = () => {
    const [walletData, setWalletData] = useState(null)
    const [isInPaymentProcess, setIsInPaymentProcess] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [loading, setLoading] = useState(true);


    const [refresh, setRefresh] = useState(false);

    const fetcher = useFetch();

    const transactionContainerRef = useRef();
    
    useScrollToTop(transactionContainerRef);

    const navHash = useSelector(state => state.navigation.navigationHash);
    
    const appendStyle = useStyle(style);
    

    const isFocused = useIsFocused();


    const fetchDataHandler = () => {
        return fetcher("UserWallet")
                .then(({ data }) => {
                    console.log(data , 'lorem');
                    setWalletData(data);
                    const currentStatus = data?.checkTransactionToWallet
                    if([DONE , FAIL].includes(currentStatus)) 
                        setTransactionStatus(currentStatus)
                })
    }


    useEffect(() => {
        if(!loading) {
            fetchDataHandler()
                .then(_ => {
                    setRefresh(true)
                    let timer = setTimeout(() => {
                        setRefresh(false);
                        clearTimeout(timer);
                    } , 2500)
                })
        }else {
            fetchDataHandler()
                .then(_ => setLoading(false))
        }
    } , [isFocused , navHash])


    const drawerCloseHandler = () => {
        setTransactionStatus(null)
        setIsInPaymentProcess(false);
    };


    if(!walletData) return <Loading />
    if(loading) return <Loading />
    else return (
        <>
        <ScreenWrapper>
            <HeaderProvider title="کیف پول" />
            <DirectionProvider>
                <WalletCart
                    setTransactionStatus={setTransactionStatus}
                    paymentProcessHandler={setIsInPaymentProcess}
                    isInPaymentProcess={isInPaymentProcess}
                    finalResult={walletData.walletData.finalResult} />
                {
                    walletData.walletData.walletItems.length ? <>
                        <ScrollView ref={transactionContainerRef}>
                            {
                                walletData.walletData.walletItems.map((el , i) => (
                                    <WalletTransaction index={i + 1} key={i} {...el} />
                                ))
                            }
                        </ScrollView>
                    </> : <EmptyScreen desc={client.static.EMPTY_SCREEN_WALLET} />
                }
            </DirectionProvider>
             {
                 refresh ? <RefreshAlert /> : null
             }
        </ScreenWrapper>
        {
            transactionStatus ? <Drawer onClose={drawerCloseHandler}>
                <View style={appendStyle.drawerContentContainer}>
                    <Para align="center" weight="bold" size={18}>
                        {typeof transactionStatus === "string" ?  transactionStatus === DONE ? FA_DONE : FA_FAIL : transactionStatus.message}
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
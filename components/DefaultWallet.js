import { useIsFocused, useScrollToTop } from '@react-navigation/native';
import { StyleSheet } from "react-native";
import React , { useState , useEffect , useRef } from 'react';
import client from '../client';
import { useStyle } from '../Hooks/useStyle';
import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';
import Loading from './Loading';
import WalletCart from './WalletCard';
import { generateColor } from '../utils';
import EmptyScreen from '../screens/EmptyScreen';

const { DONE , FAIL , FA_DONE , FA_FAIL } = client.static.TRANSACTION;


const DefaultWallet = ({ ownerProps }) => {
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

    if(!walletData) return <Loading />
    if(loading) return <Loading />
    return (
        <React.Fragment>
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
        </React.Fragment>
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


export default DefaultWallet;
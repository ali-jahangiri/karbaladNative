import React , { useState , useEffect , useRef } from 'react';
import { useIsFocused, useScrollToTop } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import client from '../client';
import useFetch from '../Providers/useFetch';
import Loading from './Loading';
import WalletCart from './WalletCard';
import EmptyScreen from '../screens/EmptyScreen';


const { DONE , FAIL , FA_DONE , FA_FAIL } = client.static.TRANSACTION;


const DefaultWallet = ({ haveSibling }) => {
    const [walletData, setWalletData] = useState(null)
    const [isInPaymentProcess, setIsInPaymentProcess] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const fetcher = useFetch();
    const isFocused = useIsFocused();
    const transactionContainerRef = useRef();
    useScrollToTop(transactionContainerRef);



    const fetchDataHandler = () => {
        return fetcher("UserWallet")
                .then(({ data }) => {
                    setWalletData(data);
                    const currentStatus = data?.checkTransactionToWallet;
                    if([DONE , FAIL].includes(currentStatus)) 
                        setTransactionStatus(currentStatus)
                })
    }

    useEffect(() => {
        if(isFocused && !loading) {
            fetchDataHandler()
                .then(_ => {
                    Toast.show({
                        type: 'refreshToast',
                        visibilityTime : 1000,
                    });
                })
        }else Toast.hide();
    } , [isFocused , loading])

    useEffect(() => {
        fetchDataHandler()
            .then(_ => setLoading(false));
    } , [])

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
                </> : <EmptyScreen shouldFillFullScreen={!haveSibling} desc={client.static.EMPTY_SCREEN_WALLET} />
            }
        </React.Fragment>
    )
}

// const style = ({ primary , baseBorderRadius }) => StyleSheet.create({
//     doneCta : {
//         backgroundColor : generateColor(primary , 5),
//         borderRadius : baseBorderRadius,
//         padding : 15,
//         width : "90%",
//         marginTop : 10
//     },
//     drawerContentContainer : {
//         justifyContent : "center",
//         alignItems : 'center',
//         height : "100%"
//     }
// })


export default DefaultWallet;
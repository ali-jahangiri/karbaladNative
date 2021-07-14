import React from 'react';
import { ScrollView } from 'react-native';
import client from '../client';
import Loading from '../components/Loading';
import ScreenHeader from '../components/ScreenHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import WalletCart from '../components/WalletCard';
import WalletTransaction from '../components/WalletTransaction';
import { useSelector } from '../Store/Y-state';
import EmptyScreen from './EmptyScreen';

const Wallet = () => {
    const completelyLoaded = useSelector(state => state.initial.completelyLoaded);
    const walletData = useSelector(state => state.initial.userData?.walletData);

    
    if(!completelyLoaded) return <Loading />
    else return (
        <ScreenWrapper>
            <ScreenHeader title="کیف پول" />
            <WalletCart 
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
    )
}


export default Wallet;
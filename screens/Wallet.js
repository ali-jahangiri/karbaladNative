import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import ScreenWrapper from '../components/ScreenWrapper';
import WalletCart from '../components/WalletCard';
import WalletTransaction from '../components/WalletTransaction';
import useUserDetails from '../HOC/UserDetailsProvider';

const Wallet = () => {
    const { data : { walletData } } = useUserDetails()
    
    return (
        <ScreenWrapper>
            <ScreenHeader title="کیف پول" />
            <WalletCart 
                finalResult={walletData.finalResult} />
            
                <ScrollView>
                    {
                        walletData.walletItems.map((el , i) => (
                            <WalletTransaction index={i + 1} key={i} {...el} />
                        ))
                    }
                </ScrollView>
        </ScreenWrapper>
    )
}


export default Wallet;
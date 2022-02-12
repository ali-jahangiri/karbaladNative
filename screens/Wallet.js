import React from 'react';
import { TouchableOpacity , View , ScrollView } from 'react-native';

import ScreenWrapper from '../components/ScreenWrapper';

import Drawer from "../components/Drawer";


import Para from '../components/Para';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import DirectionProvider from '../Providers/DirectoryProvider/DirectionProvider';

import ComponentGenerator from "../HOC/ComponentGenerator/ComponentGenerator";
import useScreenDynamic from '../Hooks/useScreenDynamic/useScreenDynamic';
import client from '../client';

const Wallet = () => {

    const [screenDetailsLoading , screenDetails , screenDetailsExtractor] = useScreenDynamic(client.static.ROUTES_GUID.wallet);

    console.log(screenDetails);

    // const drawerCloseHandler = () => {
    //     setTransactionStatus(null)
    //     setIsInPaymentProcess(false);
    // };
    
     return (
        <>
        <ScreenWrapper>
            <HeaderProvider title={!screenDetailsLoading ? screenDetailsExtractor("data" , "pageTitle").value : ""} />
            <DirectionProvider>
                <ScrollView>
                    <ComponentGenerator itemListForRender={screenDetails.components} />
                </ScrollView>
            </DirectionProvider>
        </ScreenWrapper>
        {/* {
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
        } */}
        </>
    )
}

export default Wallet;
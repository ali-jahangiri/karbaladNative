import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ScrollView , TouchableOpacity , StyleSheet } from "react-native"
import { useStyle } from '../Hooks/useStyle';
import EmptyState from './EmptyState';
import InsuranceResultPreviewItem from './InsuranceResultPreviewItem';
import Para from './Para';


const DefaultResult = ({ responseValues , navigation  , haveSibling , reqId }) => {
    const appendStyle = useStyle(style);
    const goHomeHandler = () => navigation.navigate('home');

    return (
        responseValues?.insuranceQuotes?.addInsCoAmountV2?.length ? (<ScrollView>
        {
            responseValues?.insuranceQuotes?.addInsCoAmountV2?.map((el , i) => (
                <InsuranceResultPreviewItem
                        haveInstallment={responseValues?.installmetFormouls?.includes(el.formulId)}
                        visualAlert={el.visualAlert}
                        reqId={reqId}
                        installmentList={responseValues.installmetFormouls}
                        factorItems={responseValues.insuranceQuotes.factorItems} 
                        {...el}
                        key={i} />
            ))
        }
        <TouchableOpacity style={appendStyle.goHome} onPress={goHomeHandler}>
            <Para color="lightgrey" align="center">بازگشت به خانه</Para>
            <Feather style={{ marginLeft : 10 }} name="arrow-right" size={24} color="lightgrey" />
        </TouchableOpacity>
        </ScrollView> ) : <EmptyState
                                shouldFillFullScreen={!haveSibling}
                                actionHandler={goHomeHandler}
                                title="نتیجه ای یافت نشد:(" 
                                desc="نتیجه ای برای این استعلام حاصل نشد . مجددا تلاش نمایید." 
                                ctaText="بازگشت"/>
    )
}



const style = () => StyleSheet.create({
    goHome : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        padding: 15,
        marginTop : 10
    }
})


export default DefaultResult;
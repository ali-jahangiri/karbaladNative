import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View , TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {useStyle} from "../Hooks/useStyle"
import useFetch from '../Providers/useFetch';
import { useSelector } from '../Store/Y-state';

import Para from "../components/Para";
import Loading from '../components/Loading';
import ScreenWrapper from '../components/ScreenWrapper';
import HeaderProvider from '../Providers/HeaderProvider/HeaderProvider';
import ComponentGenerator from '../HOC/ComponentGenerator/ComponentGenerator';

import DirectoryProvider from '../Providers/DirectoryProvider/DirectionProvider';
import { generateColor } from '../utils';
import useScreenDynamic from '../Hooks/useScreenDynamic/useScreenDynamic';
import client from '../client';

const InsuranceResultPreview = ({ route : { params : { id , valueStore , flattedStage : selectedInsData , carCategory } } , navigation }) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [responseValues, setResponseValues] = useState({});
    const appendStyle = useStyle(style);
    const [reqId, setReqId] = useState('');
    const { headerTitleColor , primary , nestedHeader , baseBorderRadius } = useStyle()

    const [screenDetailsLoading , screenDetails] = useScreenDynamic(client.static.ROUTES_GUID.insuranceResult);

    const navHash = useSelector(state => state.navigation.navigationHash);
    const fetcher = useFetch();

    useEffect(() => {
        setInitialLoading(true);
        fetcher('GetInsuranceQuoteId' , { formData : JSON.stringify({ ...valueStore , Id : String(id) }) })
            .then(({ data }) => data)
            .then(receivedId => {
                fetcher("GetInsuranceQuotes" ,  { formulaId : receivedId})
                    .then(({ data }) => {
                        setResponseValues(data);
                        setReqId(receivedId);
                        setInitialLoading(false);
                    }).catch(err => {
                        throw new Error(err.message)
                    })
            })

        return () => {
            // with this state change , we force entire component get re render and all new params and send new request
            setInitialLoading(true);
        }
    } , [navHash , valueStore]);
    

    const quickEditHandler = () => {
        if(responseValues?.insuranceQuotes?.factorItems) {
            const params = {
                server :  responseValues.insuranceQuotes.factorItems , 
                valueStore , 
                selectedInsData , 
                id , 
                carCategory
            }
            navigation.push('insuranceQuickEdit' , params);
        }
    }


    // badge header style for ui fallback
    const headerTextColor = nestedHeader === 'badge' ? primary : headerTitleColor
    const headerLabelStyleBaseOnHeaderType = nestedHeader === 'badge' && { backgroundColor : generateColor(primary, 1) , padding : 15 , borderRadius : baseBorderRadius , alignSelf : "flex-end"} 
    const headerSmallLabelStyleBaseOnHeaderType = nestedHeader === 'badge' && { marginRight : 10 , marginBottom : 5  }

    if(initialLoading) return <Loading />
    else {
        const catFullName = responseValues?.insuranceQuotes?.addInsCoAmountV2[0]?.catFullName;
        
        return (
            <ScreenWrapper>
              <HeaderProvider
                isNested={<TouchableOpacity onPress={quickEditHandler} style={[appendStyle.editContainer , { backgroundColor : nestedHeader === 'badge' ? generateColor(primary, 2) : '#fff2' , alignSelf : nestedHeader === 'badge' ? "flex-end" : "center"}]} >
                            <Feather name="edit-2" size={30} color={headerTextColor} />   
                        </TouchableOpacity>} 
                title={<View style={{ flex : 1 }}>
                    {
                        catFullName ? <>
                            <Para style={{ ...headerSmallLabelStyleBaseOnHeaderType }}color={headerTextColor}>نتایج جستجو در : </Para>
                            <Para style={{  ...headerLabelStyleBaseOnHeaderType }} color={headerTextColor} weight="bold" size={20}>{catFullName}</Para>
                        </>
                        : <Para color={headerTextColor} size={20} weight="bold">نتایج جستجو : </Para>
                    }
                </View>} />
                <DirectoryProvider isNested >
                    <ScrollView>
                        <ComponentGenerator ownerProps={{ responseValues : responseValues , navigation , haveSibling : screenDetails.components.length , reqId }} itemListForRender={screenDetails.components} />
                    </ScrollView>
                </DirectoryProvider>
        </ScreenWrapper>
        )
    }
}

const style = ({ baseBorderRadius }) => StyleSheet.create({
    editContainer : {
        borderRadius : baseBorderRadius,
        alignItems : "center",
        alignSelf : "center",
        padding: 12,
        marginRight : 5
    },
})

export default InsuranceResultPreview;
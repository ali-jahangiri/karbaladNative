import React, { useEffect, useState } from 'react';
import { ScrollView, } from 'react-native';

import InstallmentItem from '../components/InstallmentItem';

import TabScreenHeader from '../components/TabScreenHeader';

import ScreenWrapper from "../components/ScreenWrapper";
import { useStyle } from '../Hooks/useStyle';
import { generateColor } from '../utils';
import useFetch from '../Providers/useFetch';
import Loading from '../components/Loading';
import { useSelector } from '../Store/Y-state';

const Installment = ({ route : { params : { factorId , reqId , installment_Value} } , navigation }) => {
    const [installment, setInstallment] = useState({});
    const [loading, setLoading] = useState(true);
    
    const { primary  } = useStyle();

    const fetcher = useFetch();

    const navHash = useSelector(state => state.navigation.navigationHash);


    useEffect(() => {
        setLoading(true);
        fetcher("getInsstallments" , { formulaId : factorId , requestId : reqId })
            .then(({ data }) => {
                setInstallment(data);
                setLoading(false);
            })
    } , [navHash]);


    const navigateToRequirementHandler = (id) => {
        navigation.push("insuranceRequirements" , { factorId , reqId , installmentId: id })
    }

    return loading ? <Loading /> : (
        <ScreenWrapper>
            <TabScreenHeader 
                navigation={navigation} 
                title="انتخاب طرح قسطی" 
                extendStyle={{ backgroundColor : generateColor(primary , 6) , marginBottom : 20 }} />
            
                <ScrollView>
                    {
                        installment
                        ?.installmentData
                        ?.map((el , i) => <InstallmentItem
                                            onSelect={navigateToRequirementHandler}
                                            isLastItem={i === installment?.installmentData.length - 1}
                                            key={i} 
                                            details={el.details} 
                                            title={el.title}
                                            insuranceInstallmentPrice={installment_Value}
                                            {...el} />)
                    }
                </ScrollView>
        </ScreenWrapper>
    )
}



export default Installment;
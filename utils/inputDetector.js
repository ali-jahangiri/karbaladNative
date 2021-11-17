import React from 'react';

import CarCategory from '../components/CarCategory';

// car section components
import CarDirectory from "../components/CarDirectory";
import CarUsageDirectory from '../components/CarUsageDirectory';
import SearchBox from '../components/SearchBox';
import SelectBox from '../components/SelectBox';
import SelectBoxItem from '../components/SelectBoxItem';
import DatePicker from '../components/DatePicker';
import { ScrollView } from 'react-native';
import InputNumber from '../components/InputNumber';
import MultiSelect from '../components/MultiSelect';
import SelectBoxOptimized from '../components/SelectBoxOptimized';

import client from '../client';


const { CHECK_FORM , DATE , DROPDOWN , FLOAT , INT , INFO , LONG , CREATE_YEAR } = client.static.INPUT_DETECTOR

const InputDetector = ({typesName , isCarCase , temporary : { value , setValue } , pushToNextStageHandler , formData , formName , formNameNested , step , maxNumber = 1000000 , minNumber = 0}) => {
    switch(typesName) {
        case INFO :   
            case DROPDOWN : 
            // NOTE checking for CAR case
            if(isCarCase) {
                return (
                    <ScrollView>
                        <SearchBox
                            placeholder="نام خودرو موردنظر را جستجو کنید"
                            value={value.searchFilterBase} 
                            onChange={value => setValue({key : 'searchFilterBase' , value})} />
                        <CarCategory 
                            value={value} 
                            setValue={setValue} 
                            list={isCarCase} />
                        <CarDirectory 
                            handler={setValue} 
                            selectedCar={value[formName]}
                            categoryWasSelected={!!value?.CarCategoryId}
                            isSearchFilterApplied={!!value.searchFilterBase}
                            currentAvailableItems={formData.filter(el => el.carGroupId === value?.CarCategoryId || value.searchFilterBase && el.dataName.includes(value.searchFilterBase))} />
                        <CarUsageDirectory 
                            pushToNextStageHandler={pushToNextStageHandler}
                            selectHandler={setValue} 
                            currentSelectedUsage={value[formNameNested]} 
                            items={value?.usageItems} />
                    </ScrollView>
                )
            }
            else {
                if(formData.length > 50) return (
                    <React.Fragment>
                        <SearchBox
                            placeholder="عبارت موردنظر را جستجو کنید" 
                            value={value.searchFilterBase} 
                            onChange={value => setValue({key : 'searchFilterBase' , value})} />
                        <SelectBoxOptimized
                                           items={formData.filter(el => el.dataName.includes(value.searchFilterBase))} 
                                           selectedItem={value[formName]}
                                           onSelect={value => setValue({ value })} />
                    </React.Fragment>
                )
                return (
                    <SelectBox selectedIndex={formData?.findIndex(el => el.id === value[formName])}>
                        {
                            formData
                                ?.filter(el => el.dataName)
                                .map((el , i) => (
                                <SelectBoxItem 
                                    selectedInStore={value[formName] === el.id} 
                                    onSelect={value => setValue({ value })}  
                                    key={i} 
                                    value={el.id} >
                                    {el.dataName}
                                </SelectBoxItem>
                            ))
                        }
                    </SelectBox>
                )
            }
        case DATE : 
        return (
                <DatePicker date={value[formName]} onChange={setValue} />
            )
        case LONG :
        case INT :
        case FLOAT :
            return (
                <InputNumber
                    liftValueForFirstTime
                    isNotLimited={!maxNumber} 
                    length={{ max : maxNumber || 100000000 , min : minNumber || 0 }} 
                    stepForEachOperation={step || 10000} 
                    value={value[formName] || 0}
                    onChange={setValue} />
            )
        case CREATE_YEAR :
            return (
                <React.Fragment>  
                    <SearchBox
                        searchType="number-pad"
                        placeholder="سال ساخت خودرو را وارد کنید"
                        onChange={value => setValue({ key : "searchFilterBase" , value })}
                        value={value?.searchFilterBase} />
                        <SelectBox 
                            selectedIndex={formData?.findIndex(el => el.id === value[formName])}>
                            {formData
                                ?.filter(el => value?.searchFilterBase ? el.dataName.includes(value?.searchFilterBase) || `${Number(el.dataName) + 621}`.includes(value?.searchFilterBase): el)
                                ?.reverse()
                                ?.map((el , i) => <SelectBoxItem 
                                                    selectedInStore={value[formName] === el.id} 
                                                    value={el.id} 
                                                    key={i} 
                                                    onSelect={value => setValue({ value })} >
                                                    {`${el.dataName} - ${Number(el.dataName) + 621}`}
                                                </SelectBoxItem> )}
                    </SelectBox>
                </React.Fragment>
            )
        case CHECK_FORM :
            return (
                <MultiSelect onChange={setValue} items={formData} values={value[formName]} />
            )

        default : throw new Error("something went wrong in inputDetector ! Please try again.")
    }
}


export default InputDetector;
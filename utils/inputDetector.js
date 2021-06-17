import React from 'react';

import CarCategory from '../components/CarCategory';
import Para from '../components/Para';

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



const InputDetector = ({typesName , isCarCase , temporary : { value , setValue } , formData , formName , formNameNested , step , maxNumber = 1000000 , minNumber = 0}) => {
    
    switch(typesName) {
        case "Info" :
            break;
            case "DropDown" : 
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
                            selectHandler={setValue} 
                            currentSelectedUsage={value[formNameNested]} 
                            items={value?.usageItems} />
                    </ScrollView>
                )
            }
            else {
                const selectHandler = value => {
                    setValue({ value })
                }
                return (
                    <SelectBox>
                        {
                            formData
                                ?.filter(el => el.dataName)
                                .map((el , i) => (
                                <SelectBoxItem 
                                    selectedInStore={value[formName] === el.id} 
                                    onSelect={selectHandler}  
                                    key={i} 
                                    value={el.id} >
                                    {el.dataName}
                                </SelectBoxItem>
                            ))
                        }
                    </SelectBox>
                )
            }
        case "Date" : 
        return (
                <DatePicker date={value[formName]} onChange={setValue} />
            )
        case "Long" :
        case "Int" :
        case "Float" :
            return (
                <InputNumber isNotLimited={!maxNumber} length={{ max : maxNumber || 100000000 , min : minNumber ||0 }} stepForEachOperation={step || 10000} value={value[formName] || 0} onChange={setValue} />
            )
        case "CreateYear":
            return (
                <React.Fragment>  
                    <SearchBox  
                        placeholder="سال ساخت خودرو را وارد کنید" 
                        onChange={value => setValue({ key : "searchFilterBase" , value })}
                        value={value?.searchFilterBase} />
                        <SelectBox>
                            {formData
                                ?.filter(el => value?.searchFilterBase ? el.dataName.includes(value?.searchFilterBase) : el)
                                ?.map((el , i) => <SelectBoxItem 
                                                    selectedInStore={value[formName] === el.id} 
                                                    value={el.id} 
                                                    key={i} 
                                                    onSelect={value => setValue({ value })} >
                                                    {el.dataName} - {Number(el.dataName) + 621}
                                                </SelectBoxItem> )}
                    </SelectBox>
                </React.Fragment>
            )
        case "CheckedForm" :
            return (
                <MultiSelect onChange={setValue} items={formData} values={value[formName]} />
            )

        default : return <Para>nothing find</Para>
    }
}


export default InputDetector;
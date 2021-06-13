import React from 'react';

import CarCategory from '../components/CarCategory';
import Para from '../components/Para';

// car section components
import CarDirectory from "../components/CarDirectory";
import CarUsageDirectory from '../components/CarUsageDirectory';
import SearchBox from '../components/SearchBox';


const InputDetector = ({typesName , isCarCase , temporary : { value , setValue } , formData}) => {
    switch(typesName) {
        case "Info" :
            break;
            case "DropDown" : 
            // NOTE checking for CAR case
            if(isCarCase) {

                const onSearchBoxChange = value => {
                    setValue(prev => ({...prev , searchFilterBase : value}))
                }
                return (
                    <>
                        <SearchBox value={value.searchFilterBase} onChange={onSearchBoxChange} />
                        <CarCategory value={value} setValue={setValue} list={isCarCase} />
                        <CarDirectory handler={setValue} value={value} currentAvailableItems={formData.filter(el => el.carGroupId === value.CarId)} />
                        <CarUsageDirectory items={value?.nestedData} />
                    </>
                )
            }
        case "Date" : 
        case "Long" :
        case "Int" :
        case "Float" :
        case "CreateYear":
        case "CheckedForm" :

        default : return <Para>nothing find</Para>
    }
}


export default InputDetector;
import React from 'react';

import CarCategory from '../components/CarCategory';
import CarItem from '../components/CarItem';
import Para from '../components/Para';

const InputDetector = ({typesName , isCarCase , temporary : { value , setValue } , formData}) => {
    switch(typesName) {
        case "Info" :
            break;
            case "DropDown" : 
            // NOTE checking for CAR case
            console.log('ttt' , typesName);
            if(isCarCase) {
                return (
                    <>
                        <CarCategory value={value} setValue={setValue} list={isCarCase} />
                        {
                            formData
                                .filter(el => el.carGroupId === value.CarId)
                                .map((el , i) => <CarItem index={i} key={i} {...el} />)

                        }
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
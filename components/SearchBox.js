import React from 'react';
import { TextInput , View } from 'react-native';
import { debounce } from '../utils';

const SearchBox = ({ value = "" , onChange , placeholder = "نام مورد نطر خود را جسنجو کنید" }) => {
    
    const onChangeHandler = debounce(() => {
        console.log('sd');
        onchange(value)
    })

    return (
        <TextInput 
            placeholder={placeholder}
            onChangeText={onChangeHandler} 
            value={value} />
    )
}



export default SearchBox;
import React, { useEffect } from 'react';
import Input from './Input';


const StringInput = ({ onChange , value = "" , autoFocus }) => {
    
    return (
        <Input placeholder="وارد نمایید ..." autoFocus={autoFocus} value={value} changeHandler={onChange} />
    )
}



export default StringInput;
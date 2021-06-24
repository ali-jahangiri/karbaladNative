import React, { useEffect, useRef } from 'react';
import { ScrollView} from 'react-native';


const SelectBox = ({ children , selectedIndex}) => {

    const ref = useRef();
    useEffect(() => {
        if(selectedIndex && selectedIndex > 0) {
            ref.current.scrollTo({
                y : selectedIndex * 70
            })
        }
    } , [selectedIndex])

    return (
        <ScrollView ref={ref}>
            {children}
        </ScrollView>
    )
}

export default SelectBox;
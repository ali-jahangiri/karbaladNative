import React from 'react';
import { ScrollView} from 'react-native';


const SelectBox = ({ children }) => {
    return (
        <ScrollView>
            {children}
        </ScrollView>
    )
}

export default SelectBox;
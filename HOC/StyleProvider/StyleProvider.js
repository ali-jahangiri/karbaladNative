import React from 'react';
import { useState } from 'react';
import { createContext } from 'react';


export const StyleContext = createContext({
    style : {},
    setStyle : {}
});


const StyleProvider = ({ children }) => {
    const [style, setStyle] = useState({ globalStyle : {} })
    return (
        <StyleContext.Provider value={{ style , setStyle }}>
            {children}
        </StyleContext.Provider>
    )
}



export default StyleProvider;
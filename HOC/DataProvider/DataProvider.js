import React, { useState } from 'react';

export const DataContext = React.createContext({
    data : {},
    setData : () => {}
});

const DataProvider = ({ children }) => {
    const [dataStore, setDataStore] = useState({});

    return (
        <DataContext.Provider value={{ data : dataStore , setData : setDataStore }}>
            {children}
        </DataContext.Provider>
    )
}


export default DataProvider;
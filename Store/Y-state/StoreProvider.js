import React, { createContext, useState } from 'react';

export const Store = createContext({
    store : {},
    setStore : ({ type , payload }) => {}
});

const StoreProvider = ({ children , store , logger = false }) => {
    if(!store) throw new Error("Please pass your store to Provider!");
    const [_store, set_Store] = useState(() => store.value);

    const changeStore = ({ valueMaker , sliceName , payload , ...other }) => {
        set_Store(prev => ({
            ...prev,
            [sliceName] : valueMaker(prev[sliceName] , payload)
        }));
        // console.log('STORE' , {..._store, [sliceName] : valueMaker(_store[sliceName] , payload)});
        // console.log(`Action => ${other.type} - inside ' ${sliceName} ' slice` , _store);
        // console.groupCollapsed('Dispatching')
        // console.log(`Action => ${other.type} - inside ' ${sliceName} ' slice`);
        // console.groupEnd("end")
    }

    return (
        <Store.Provider value={{ store : _store , setStore : changeStore }}>
            {children}
        </Store.Provider>
    )
}

export default StoreProvider;
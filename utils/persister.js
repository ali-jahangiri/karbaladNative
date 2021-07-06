import * as SecureStore from "expo-secure-store";

const persister = (() => {
    const set = async (key , value) => {
        await SecureStore.setItemAsync(key , typeof value === "object" ? JSON.stringify(value) : value)
            .catch(err => {
                throw new Error(`Cannot set ${value} as ${key} - ${err}`);
            });
    }
    
    
    const get = async key => {
        const res = await SecureStore.getItemAsync(key);
        if(res) console.warn(`'${key}' don't set in Store ; Make sure you pass current key.`);
        return res
    }
    
    
    const remove = async key => {
        await SecureStore.deleteItemAsync(key)
            .catch(err => {
                throw new Error(`Cannot remove item with ${key} - ${key}`)
            })
    }
    
    
    return {
        set,
        get,
        remove
    }
    
})();


export default persister;
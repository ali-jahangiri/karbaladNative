import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

const _defaultDeveloperOptions = {
    webLink : '-',
    internalPath : "wallet"
}

const _rootPath = ['home' , 'insurance' , 'wallet' , 'profile']
const _parent = {reminder : 'profile' , support : "profile" , profileEdit : "profile"}


const useRedirection = ({ webLink, selectedInternalPath}) => {
    const navigation = useNavigation();

    return () => {
        // if web_link was empty and internal path was not selected (was default), we return out from function
        if(!webLink && selectedInternalPath === _defaultDeveloperOptions.internalPath) return;
        // priority of web link is more then internalPath
        if(webLink !== _defaultDeveloperOptions.webLink) { 
            Linking.openURL(webLink)
        }else {
            if(_rootPath.includes(selectedInternalPath)) {
                navigation.navigate(selectedInternalPath);
            }else navigation.navigate(_parent[selectedInternalPath] , { screen : selectedInternalPath }); 
        }
    }
}


export default useRedirection;
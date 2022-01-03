import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";

const _defaultDeveloperOptions = {
    webLink : '-',
    internalPath : "wallet"
}

const _rootPath = ['home' , 'insurance' , 'wallet' , 'profile']
const _parent = {reminder : 'profile' , support : "profile" , profileEdit : "profile"}


const useRedirection = ({ webLink = "", selectedInternalPath }) => {
    const navigation = useNavigation();

    return () => {
        // if web_link was empty and internal path was not selected (was default), we return out from function and do nothing
        if(!webLink && selectedInternalPath === _defaultDeveloperOptions.internalPath) return;
        if(webLink.startsWith("insuranceId:") || webLink.startsWith("insuranceid:")) {
            // if customer pass some non-valid value , we have '13' form id fallback
            const insuranceId = Number(webLink.slice(webLink.indexOf(":") + 1)) || 13;
            navigation.navigate("insStepper" , { id : insuranceId , name : "" })
        }
        // priority of web link is more then internalPath
        else if(webLink !== _defaultDeveloperOptions.webLink) { 
            Linking.openURL(webLink)
        }else {
            if(_rootPath.includes(selectedInternalPath)) {
                navigation.navigate(selectedInternalPath);
                
            }else navigation.navigate(_parent[selectedInternalPath] , { comeFromNestedPath : selectedInternalPath }) 
        }
    }
}


export default useRedirection;
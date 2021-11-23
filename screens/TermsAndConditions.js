import { StyleSheet, View } from "react-native";
import client from "../client";
import Para from "../components/Para";
import { useStyle } from "../Hooks/useStyle";

const TermsAndConditions = () => {
    const appendedStyle = useStyle(style);
    return (
        <View style={appendedStyle.container}>
            <View style={appendedStyle.header}>
                <Para>{client.static.TERMS_AND_CONDITION_HEADER}</Para>
            </View>
        </View>
    )
}


const style = () => StyleSheet.create({
    cotnaienr : {

    },
    header : {

    }
})

export default TermsAndConditions;
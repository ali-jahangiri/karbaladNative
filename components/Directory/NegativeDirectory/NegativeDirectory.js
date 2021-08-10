import { ScrollView, StyleSheet } from "react-native";

const NegativeDirectory = ({ children }) => {
    return (
        <ScrollView style={style.container}>
            {children}
        </ScrollView>
    )
}


const style = StyleSheet.create({
    container : {
        
    }
})

export default NegativeDirectory;
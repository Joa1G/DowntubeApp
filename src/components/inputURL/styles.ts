import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title:{
        fontFamily: "Roboto_700Bold",
        fontSize: 18,
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    inputContainer:{
        backgroundColor: "#3C3D37",
        width: "95%",
        marginTop: 10,
        borderRadius: 5,
        padding: 8,
        alignItems: 'center'
    },
    inputText:{
        backgroundColor: '#fff',
        height: 40,
        padding: 8,
        width: "100%",
        marginTop: 10,
    }
});
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headingContainer: {
        backgroundColor: "#1E201E",
        height: 55,
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        flex: 1
    },
    headingText:{
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
        fontFamily: "Roboto_700Bold",
        textShadowColor: '#000',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    headingImage: {
        height: 50,
        width: 50
    }
});
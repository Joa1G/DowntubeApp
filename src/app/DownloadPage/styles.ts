import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonReturn: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 10, // garante que fique por cima de outros elementos
        borderRadius: 50,
        backgroundColor: 'rgba(30,42,68,0.6)',
        padding: 10,
    },
    loadedInfoContainer: {
        padding: 5,
        width: '95%',
        flex: 1,
        marginTop: 60
    },
    titleVideo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: "Roboto_700Bold"
    },
    infoVideo: {
        color: '#fff',
        fontWeight: 'bold'
    },
    thumbnail: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10
    },
    subtitle: {
        marginTop: 20,
        fontWeight: 'bold',
        color: '#fff' 
    },
    audioInfoButton: {
        backgroundColor: '#19376D',
        flex: 1,
        margin: 8,
        padding: 10,
        borderRadius: 8,

    },
    errorText: {
        color: 'red',
        marginTop: 20
    }
})
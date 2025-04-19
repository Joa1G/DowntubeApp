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
        padding: 10,
        paddingTop: 250,
        width: '95%'
    },
    titleVideo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    infoVideo: {
        color: '#fff'
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
        marginVertical: 8,
        padding: 5,
        backgroundColor: '#19376D',
        borderRadius: 8
    },
    errorText: {
        color: 'red',
        marginTop: 20
    }
})
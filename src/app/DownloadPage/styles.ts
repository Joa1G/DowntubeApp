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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#1E201E',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '80%',
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    downloadButton: {
        backgroundColor: '#19376D',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    downloadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#333',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressBarBackground: {
        width: '100%',
        height: 20,
        backgroundColor: '#333',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#19376D',
        borderRadius: 10,
    },
    progressText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
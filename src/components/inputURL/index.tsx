import { SubmitButton } from '../submitButton';
import { styles } from './styles'
import { Text, TextInput, View } from 'react-native';
import { useState } from 'react';


export function InputURL(){

    const [inputURL, setInputURL] = useState('')
    const [storedURL, setStoredURL] = useState('')

    const handleButtonClick = () =>{
        setStoredURL(inputURL);
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Insira a URL do video a abaixo:</Text>
            <TextInput placeholder='Insira URL' style={styles.inputText} onChangeText={text => setInputURL(text)} value={inputURL}/>
            <SubmitButton onPress={handleButtonClick}/>
        </View>
    )
}
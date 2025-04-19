import { SubmitButton } from '../submitButton';
import { styles } from './styles'
import { Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { isURL } from '../../validators/isURL';

export function InputURL(){
    const router = useRouter();

    const [inputURL, setInputURL] = useState('');
    const [showError, setShowError] = useState(false);

    const handleButtonClick = () => {
        if (isURL(inputURL)) {
            router.push(`/DownloadPage?url=${encodeURIComponent(inputURL)}`);
        } else {
            setShowError(true);
        }
    };

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.title}>Insira a URL do video a abaixo:</Text>
            {showError && (
                <Text style={[styles.title, {color: 'red'}]}>Erro! Insira uma URL válida!</Text>
            )}
            <TextInput placeholder='Insira URL' style={styles.inputText} onChangeText={text => setInputURL(text)} value={inputURL}/>
            <SubmitButton onPress={handleButtonClick}/>
        </View>
    )
}
import { styles } from "./styles";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

export function SubmitButton({...rest}:TouchableOpacityProps){

    return(
        <TouchableOpacity {...rest} style={styles.buttonContainer}>
            <Text style={styles.textButton}>Enviar</Text>
        </TouchableOpacity>
    )
}
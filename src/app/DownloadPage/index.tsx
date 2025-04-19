import { Cabecalho } from '../../components/header/index'
import { styles } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ioicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { encodeURLSpecialChars } from '../../utils/encondeURLSpecialChars';

export default function DownloadPage(){

    const { url } = useLocalSearchParams()
    let urlReplaced = encodeURLSpecialChars(url as string)

    const router = useRouter()

    const handleNavigation = () => {
        router.back()
    }

    return (
        <LinearGradient style={{flex: 1}} colors={['#1E201E', '#a6a6a6', '#1E201E']}>
            <SafeAreaProvider style={styles.container}>
                <Cabecalho/>
                <StatusBar style="auto" backgroundColor='#1E201E'/>
                <TouchableOpacity style={styles.buttonReturn}>
                    <Ioicons name="arrow-back" color="#fff" size={24} onPress={handleNavigation}/>
                </TouchableOpacity>
                <Text style={{fontSize: 20, fontWeight: 700, color: '#fff'}}>URL: {urlReplaced}</Text>
            </SafeAreaProvider>
        </LinearGradient>
    );
}
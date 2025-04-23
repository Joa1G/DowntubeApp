import { StatusBar } from 'expo-status-bar';
import { Cabecalho } from '../components/header'
import { styles } from './styles';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { InputURL } from '../components/inputURL';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {

  const [fontsLoaded] = useFonts({
          Roboto_400Regular,
          Roboto_700Bold,
      });
  
      useEffect(() => {
          if (fontsLoaded) {
            SplashScreen.hideAsync();
          }
        }, [fontsLoaded]);
      
        if (!fontsLoaded) {
          return null;
        }

  return (
    <LinearGradient style={{flex: 1}} colors={['#1E201E', '#a6a6a6', '#1E201E']}>
        <SafeAreaProvider style={styles.container}>
        <Cabecalho/>
        <InputURL/>
        <StatusBar style="light" backgroundColor='#1E201E'/>
      </SafeAreaProvider>
    </LinearGradient>
  );
}

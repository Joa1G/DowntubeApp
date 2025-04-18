import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Cabecalho(){

    const insets = useSafeAreaInsets()

    const [headerHeight, setHeaderHeight] = useState(0)

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

    return(
        <View style={[styles.headingContainer, {top:insets.top}]} onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setHeaderHeight(height);
        }}>
            <Image style={styles.headingImage} source={require('../../../assets/icons/downtube-splash-icon.png')}/>
            <Text style={styles.headingText}>Downtube</Text>
        </View>
    );
};
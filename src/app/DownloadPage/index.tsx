import { Cabecalho } from '../../components/header/index';
import { styles } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ioicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList } from 'react-native';
import { encodeURLSpecialChars } from '../../utils/encondeURLSpecialChars';
import { useEffect, useState } from 'react';
import { getInfoVideo } from '../../services/ytdlpapi.service';
import { Info } from '../../types/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Linking } from 'react-native';

export default function DownloadPage() {
  const insets = useSafeAreaInsets();
  const { url } = useLocalSearchParams();
  const router = useRouter();
  const [videoInfo, setVideoInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const encodedUrl = encodeURLSpecialChars(url as string);

  const handleNavigation = () => {
    router.back();
  };

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const data = await getInfoVideo(encodedUrl);
        setVideoInfo(data);
      } catch (error) {
        console.error('Erro ao buscar info do vídeo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [encodedUrl]);

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#1E201E', '#a6a6a6', '#1E201E']}>
      <SafeAreaProvider style={styles.container}>
        <Cabecalho />
        <StatusBar style="auto" backgroundColor="#1E201E" />
        <TouchableOpacity style={styles.buttonReturn} onPress={handleNavigation}>
          <Ioicons name="arrow-back" color="#fff" size={24} />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : videoInfo ? (
          <View style={styles.loadedInfoContainer}>
            <Text style={styles.titleVideo}>{videoInfo.title}</Text>
            <Text style={styles.infoVideo}>Canal: {videoInfo.uploader}</Text>
            <Text style={styles.infoVideo}>
              Duração: {Math.floor(videoInfo.duration / 60)}m {videoInfo.duration % 60}s
            </Text>
            <Text style={styles.infoVideo}>Visualizações: {videoInfo.view_count.toLocaleString('pt-br')}</Text>

            <Image
              source={{ uri: videoInfo.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />

            <Text style={styles.subtitle}>
              Formatos de Áudio:
            </Text>
            <FlatList
              data={videoInfo.audio_formats}
              keyExtractor={(item) => item.format_id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.audioInfoButton} onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.infoVideo}>Formato: {item.ext}</Text>
                  <Text style={styles.infoVideo}>Bitrate: {item.abr} kbps</Text>
                  <Text style={styles.infoVideo}>Nota: {item.format_note}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 200 }} // espaço extra no final
            />
          </View>
        ) : (
          <Text style={styles.errorText}>Erro ao carregar informações do vídeo.</Text>
        )}
      </SafeAreaProvider>
    </LinearGradient>
  );
}
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
import { getAudioInfoVideo, getVideoInfoVideo } from '../../services/ytdlpapi.service';
import { Info } from '../../types/types';
import { Linking } from 'react-native';

export default function DownloadPage() {
  const { url } = useLocalSearchParams();
  const router = useRouter();
  const [audioVideoInfo, setAudioVideoInfo] = useState<Info | null>(null);
  const [videoInfo, setVideoInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const encodedUrl = encodeURLSpecialChars(url as string);

  const handleNavigation = () => {
    router.back();
  };

  useEffect(() => {
    const fetchVideoInfo = async () => {
      try {
        const audioData = await getAudioInfoVideo(encodedUrl)
        const videoData = await getVideoInfoVideo(encodedUrl)
        setAudioVideoInfo(audioData);
        setVideoInfo(videoData)
  
      } catch (error) {
        console.error('Erro ao buscar info do vídeo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoInfo();
  }, [encodedUrl]);

  const columns = 2;

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#1E201E', '#a6a6a6', '#1E201E']}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar style="auto" backgroundColor="#1E201E" />

        <Cabecalho />
        

        <TouchableOpacity style={styles.buttonReturn} onPress={handleNavigation}>
          <Ioicons name="arrow-back" color="#fff" size={24} />
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        ) : audioVideoInfo ? (
          <View style={styles.loadedInfoContainer}>
            <Text style={styles.titleVideo}>{audioVideoInfo.title}</Text>
            <Text style={styles.infoVideo}>Canal: {audioVideoInfo.uploader}</Text>
            <Text style={styles.infoVideo}>
              Duração: {Math.floor(audioVideoInfo.duration / 60)}m {audioVideoInfo.duration % 60}s
            </Text>
            <Text style={styles.infoVideo}>Visualizações: {audioVideoInfo.view_count.toLocaleString('pt-br')}</Text>

            <Image
              source={{ uri: audioVideoInfo.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />

            <Text style={styles.subtitle}>
              Formatos de Áudio:
            </Text>
            <FlatList
              key={`flatlist-columns-${columns}`}
              data={audioVideoInfo.audio_formats.filter(item => item.ext !== 'mhtml')}
              keyExtractor={(item) => item.format_id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.audioInfoButton} onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.infoVideo}>{(item.ext.toUpperCase())}</Text>
                  <Text style={styles.infoVideo}>Bitrate: {item.abr} kbps</Text>
                  <Text style={styles.infoVideo}>Qualidade: {item.format_note}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 50 }} // espaço extra no final
              numColumns={columns}
            />

            <Text style={styles.subtitle}>
              Formatos de Video:
            </Text>

            <FlatList
              data={videoInfo?.video_formats}
              keyExtractor={(item) => item.format_id}
              renderItem={({ item }) => (
                <TouchableOpacity style={[styles.audioInfoButton, {backgroundColor: '#8E1616'}]} onPress={() => Linking.openURL(item.url)}>
                  <Text style={styles.infoVideo}>{(item.ext.toUpperCase())}</Text>
                  <Text style={styles.infoVideo}>Tamanho: {item.file_size || 'sem informações'}</Text>
                  <Text style={styles.infoVideo}>Qualidade: {item.format_note}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 50 }} // espaço extra no final
            />

          </View>
        ) : (
          <Text style={styles.errorText}>Erro ao carregar informações do vídeo.</Text>
        )}
      </SafeAreaProvider>
    </LinearGradient>
  );
}
import React from 'react';
import { Cabecalho } from '../../components/header/index';
import { styles } from './styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Ioicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, TouchableOpacity, View, Image, ActivityIndicator, FlatList, Modal, Animated } from 'react-native';
import { encodeURLSpecialChars } from '../../utils/encondeURLSpecialChars';
import { useEffect, useState } from 'react';
import { getAudioInfoVideo, getVideoInfoVideo } from '../../services/ytdlpapi.service';
import { Info } from '../../types/types';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

interface DownloadProgress {
  totalBytesWritten: number;
  totalBytesExpectedToWrite: number;
}

export default function DownloadPage() {
  const { url } = useLocalSearchParams();
  const router = useRouter();
  const [audioVideoInfo, setAudioVideoInfo] = useState<Info | null>(null);
  const [videoInfo, setVideoInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [selectedFilename, setSelectedFilename] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadResumable, setDownloadResumable] = useState<FileSystem.DownloadResumable | null>(null);
  const encodedUrl = encodeURLSpecialChars(url as string);
  const [totalBytesWritten, setTotalBytesWritten] = useState(0);
  const [totalBytesExpectedToWrite, setTotalBytesExpectedToWrite] = useState(1); // evita divisão por zero
  const [downloadCompleted, setDownloadCompleted] = useState(false);


  const handleNavigation = () => {
    router.back();
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      setIsDownloading(true);
      setDownloadProgress(0);
      setTotalBytesWritten(0);
      setTotalBytesExpectedToWrite(1); // evita divisão por 0 no início
  
      const fileUri = FileSystem.documentDirectory + filename;
      let lastUpdate = Date.now();
  
      const progressCallback = (progress: DownloadProgress) => {
        const now = Date.now();
        if (now - lastUpdate > 300) { // atualiza no máx. a cada 300ms
          lastUpdate = now;
          const progressPercent = progress.totalBytesWritten / progress.totalBytesExpectedToWrite;
          setDownloadProgress(progressPercent);
          setTotalBytesWritten(progress.totalBytesWritten);
          setTotalBytesExpectedToWrite(progress.totalBytesExpectedToWrite);
        }
      };
  
      const resumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
        },
        progressCallback
      );
  
      setDownloadResumable(resumable);
      const downloadRes = await resumable.downloadAsync();
  
      if (!downloadRes) {
        throw new Error('Download falhou');
      }
  
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Erro', 'Compartilhamento não disponível neste dispositivo');
        return;
      }
  
      await Sharing.shareAsync(downloadRes.uri, {
        dialogTitle: 'Salvar arquivo',
        UTI: '*/*',
        mimeType: '*/*',
      });
      
      setDownloadCompleted(true);
      setIsDownloading(false);
  
    } catch (error: any) {
      if (error.message !== 'Download cancelado') {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Não foi possível baixar ou compartilhar o arquivo');
      }
    } finally {
      if (!downloadCompleted) {
        setIsDownloading(false);
        setDownloadProgress(0);
        setDownloadResumable(null);
        setTotalBytesWritten(0);
        setTotalBytesExpectedToWrite(1);
      }
    }
  };

  const handleCancelDownload = async () => {
    if (downloadResumable) {
      try {
        await downloadResumable.cancelAsync();
        Alert.alert('Download cancelado', 'O download foi cancelado com sucesso');
      } catch (error) {
        console.error('Erro ao cancelar download:', error);
      }
    }
    setIsDownloading(false);
    setDownloadProgress(0);
    setDownloadResumable(null);
    setModalVisible(false);
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

  const handleOpenModal = (url: string, filename: string) => {
    setSelectedUrl(url);
    setSelectedFilename(filename);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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
                <TouchableOpacity 
                  style={styles.audioInfoButton} 
                  onPress={() => handleOpenModal(item.url, `${audioVideoInfo.title}-Audio.${item.ext}`)}
                >
                  <Text style={styles.infoVideo}>{(item.ext.toUpperCase())}</Text>
                  <Text style={styles.infoVideo}>Bitrate: {item.abr} kbps</Text>
                  <Text style={styles.infoVideo}>Qualidade: {item.format_note}</Text>
                  <Text style={styles.infoVideo}>Tamanho: {item.filesize_human}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 50 }}
              numColumns={columns}
            />

            <Text style={styles.subtitle}>
              Formatos de Video:
            </Text>

            <FlatList
              data={videoInfo?.video_formats}
              keyExtractor={(item) => item.format_id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.audioInfoButton, {backgroundColor: '#8E1616'}]}
                  onPress={() => handleOpenModal(item.url, `${audioVideoInfo.title}-Video.${item.ext}`)}
                >
                  <Text style={styles.infoVideo}>{(item.ext.toUpperCase())}</Text>
                  <Text style={styles.infoVideo}>Qualidade: {item.format_note}</Text>
                  <Text style={styles.infoVideo}>Tamanho: {item.filesize_human}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={{ paddingBottom: 50 }}
            />

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={handleCloseModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {downloadCompleted ? (
                    <>
                      <Text style={styles.modalTitle}>Download Concluído!</Text>
                      <Text style={styles.modalText}>O arquivo foi baixado com sucesso.</Text>
                      <TouchableOpacity 
                        style={styles.downloadButton}
                        onPress={() => {
                          setModalVisible(false);
                          setDownloadCompleted(false);
                        }}
                      >
                        <Text style={styles.downloadButtonText}>OK</Text>
                      </TouchableOpacity>
                    </>
                  ) : isDownloading ? (
                    <>
                      <Text style={styles.modalTitle}>Download em andamento</Text>
                      <View style={styles.progressContainer}>
                        <View style={styles.progressBarBackground}>
                          <Animated.View
                            style={[
                              styles.progressBarFill,
                              { width: `${downloadProgress * 100}%` }
                            ]}
                          />
                        </View>
                        <Text style={styles.progressText}>
                          {Math.round(downloadProgress * 100)}% (
                          {(totalBytesWritten / (1024 * 1024)).toFixed(2)}MB de {(totalBytesExpectedToWrite / (1024 * 1024)).toFixed(2)}MB)
                        </Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={handleCancelDownload}
                      >
                        <Text style={styles.cancelButtonText}>Cancelar Download</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <Text style={styles.modalTitle}>Iniciar Download</Text>
                      <Text style={styles.modalText}>Deseja baixar este arquivo?</Text>
                      <TouchableOpacity 
                        style={styles.downloadButton}
                        onPress={() => {
                          handleDownload(selectedUrl, selectedFilename);
                        }}
                      >
                        <Text style={styles.downloadButtonText}>Download</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={handleCloseModal}
                      >
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Modal>

          </View>
        ) : (
          <Text style={styles.errorText}>Erro ao carregar informações do vídeo.</Text>
        )}
      </SafeAreaProvider>
    </LinearGradient>
  );
}
import axios from "axios";

const api = axios.create({
    baseURL: "https://yt-dlp-api-production-19f7.up.railway.app/",
})

export const getAudioInfoVideo = async (url: string) => {
    const response = await api.get(`audio_info/${url}`)
    return response.data;
}

export const getVideoInfoVideo = async (url: string) => {
    const response = await api.get(`video_info/${url}`)
    return response.data;
}
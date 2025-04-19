import axios from "axios";

const api = axios.create({
    baseURL: "https://yt-dlp-api-production-19f7.up.railway.app/",
})

export const getInfoVideo = async (url: string) => {
    const response = await api.get(`audio_info/${url}`)
    return response.data;
}
import axios from "axios";

const api = axios.create({
    baseURL: "https://yt-dlp-api-production-19f7.up.railway.app/",
    params: {
        api_token: 'f748ab61-5e27-4df0-ba92-4a39d48dd2e4'
    }
})

export const getInfoVideo = async (url: string) => {
    const response = await api.get(`audio_info/${url}`)
    return response.data;
}
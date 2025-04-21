export type Info = {
    title: string;
    uploader: string;
    thumbnail: string;
    duration: number;
    view_count: number;
    audio_formats: AudioFormat[];
    video_formats: VideoFormart[];
}

export type AudioFormat = {
    format_id: string;
    ext: string;
    abr: number;
    file_size: number;
    format_note: string;
    url: string;
}

export type VideoFormart = {
    format_id: string;
    ext: string;
    abr: number;
    vcodec: string;
    acodec: string;
    file_size: number;
    format_note: string;
    url: string;
}
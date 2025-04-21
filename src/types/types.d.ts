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
    filesize: number;
    filesize_human: string;
    format_note: string;
    url: string;
}

export type VideoFormart = {
    format_id: string;
    ext: string;
    abr: number;
    vcodec: string;
    acodec: string;
    filesize: number;
    filesize_human: string;
    format_note: string;
    url: string;
}
export type Info = {
    title: string;
    uploader: string;
    thumbnail: string;
    duration: number;
    view_count: number;
    audio_formats: AudioFormat[];
}

export type AudioFormat = {
    format_id: string;
    ext: string;
    abr: number;
    file_size: number;
    format_note: string;
    url: string;
}
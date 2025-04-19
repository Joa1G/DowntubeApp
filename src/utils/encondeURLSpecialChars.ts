export function encodeURLSpecialChars(url: string): string {
    return url
        .replace(/:/g, '%3A')
        .replace(/\//g, '%2F')
        .replace(/\?/g, '%3F')
        .replace(/=/g, '%3D')
        .replace(/&/g, '%26');
} 
export function formateFileSize(bytes: number) {
    if (bytes < 1080 * 1080) {
        return `${(bytes / 1024).toFixed(0)}KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(0)}MB`;
}
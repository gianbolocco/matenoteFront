export const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export const validateYoutubeUrl = (url: string): boolean => {
    return youtubeRegex.test(url);
};

export const validatePdfFile = (file: File): boolean => {
    return file.type === "application/pdf";
};

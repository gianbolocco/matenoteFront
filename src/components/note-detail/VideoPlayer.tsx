
interface VideoPlayerProps {
    url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
    const getEmbedUrl = (url: string) => {
        try {
            // Extracts video ID from common YouTube URL formats
            const match = url.match(/(?:youtu\.be\/|youtube\.com\/.*v=)([^"&?\/\s]{11})/);
            const videoId = match ? match[1] : null;
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
        } catch (e) {
            return null;
        }
    };

    const embedUrl = getEmbedUrl(url);

    if (!embedUrl) return null;

    return (
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black aspect-video">
            <iframe
                src={embedUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
            />
        </div>
    );
}

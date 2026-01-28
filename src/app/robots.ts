import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/admin/', '/home', '/profile', '/notes/'], // Disallow private routes
        },
        sitemap: 'https://matenote.app/sitemap.xml',
    };
}

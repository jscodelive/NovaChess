import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
            },
            manifest: {
                name: 'LacteoData',
                short_name: 'LacteoData',
                description: 'SaaS para la industria láctea',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                icons: [
                    {
                        src: '/logo192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/logo512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        }),
    ],
    server: {
        host: '0.0.0.0',
        port: parseInt(process.env.VITE_PORT ?? 5173),
        hmr: {
            host: 'localhost',
            port: parseInt(process.env.VITE_PORT ?? 5173),
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});

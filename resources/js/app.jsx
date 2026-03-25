import './bootstrap';
import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
});

function useRoute() {
    const [route, setRoute] = useState(window.location.hash || '#/');
    useEffect(() => {
        const handler = () => setRoute(window.location.hash || '#/');
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, []);
    return route;
}

function App() {
    const route = useRoute();
    if (route === '#/dashboard') return <Dashboard />;
    return <Landing />;
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    );
}

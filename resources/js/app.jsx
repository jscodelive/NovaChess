import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';

export default function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                    <svg className="w-16 h-16 text-indigo-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Hello World!</h1>
                <p className="text-gray-500 mb-6">Laravel 13 + React + Vite + TailwindCSS built with Docker</p>
                <button className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-indigo-700 hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Click Me
                </button>
            </div>
        </div>
    );
}

if (document.getElementById('app')) {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
}

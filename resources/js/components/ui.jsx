import React, { useState } from 'react';

export function Modal({ open, onClose, title, children }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export function Input({ label, error, ...props }) {
    return (
        <div>
            {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
            <input
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-200 ${
                    error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white focus:border-blue-400'
                }`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export function Select({ label, options, error, ...props }) {
    return (
        <div>
            {label && <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
            <select
                className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-200 ${
                    error ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white focus:border-blue-400'
                }`}
                {...props}
            >
                <option value="">Seleccionar…</option>
                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}

export function Button({ children, variant = 'primary', loading, className = '', ...props }) {
    const base = 'font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 inline-flex items-center gap-2';
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        ghost: 'text-slate-600 hover:bg-slate-100',
    };
    return (
        <button className={`${base} ${variants[variant]} ${className}`} disabled={loading} {...props}>
            {loading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    );
}

export function Badge({ children, color = 'slate' }) {
    const colors = {
        emerald: 'bg-emerald-100 text-emerald-700',
        amber: 'bg-amber-100 text-amber-700',
        red: 'bg-red-100 text-red-700',
        blue: 'bg-blue-100 text-blue-700',
        slate: 'bg-slate-100 text-slate-600',
        violet: 'bg-violet-100 text-violet-700',
    };
    return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[color]}`}>{children}</span>;
}

export function EmptyState({ icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            {icon && <div className="mb-4 opacity-30">{icon}</div>}
            <p className="font-semibold text-slate-500">{title}</p>
            {description && <p className="text-sm mt-1">{description}</p>}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}

export function StatCard({ title, value, sub, color, icon }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                </svg>
            </div>
            <div className="min-w-0">
                <p className="text-xs text-slate-500 font-medium mb-1">{title}</p>
                <p className="text-2xl font-extrabold text-slate-800 truncate">{value}</p>
                {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
            </div>
        </div>
    );
}

export function useForm(initial) {
    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const set = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const reset = () => { setForm(initial); setErrors({}); };

    const submit = async (fn) => {
        setLoading(true);
        setErrors({});
        try {
            await fn(form);
            reset();
        } catch (e) {
            if (e.response?.status === 422) {
                const errs = {};
                for (const [k, v] of Object.entries(e.response.data.errors ?? {})) {
                    errs[k] = v[0];
                }
                setErrors(errs);
            } else {
                setErrors({ _general: e.response?.data?.message ?? 'Error inesperado' });
            }
            throw e;
        } finally {
            setLoading(false);
        }
    };

    return { form, errors, loading, set, reset, submit };
}

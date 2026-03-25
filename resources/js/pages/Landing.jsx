import React, { useState } from 'react';

const NAV_LINKS = [
    { label: 'Características', href: '#features' },
    { label: 'Cómo funciona', href: '#how' },
    { label: 'Precios', href: '#pricing' },
];

const FEATURES = [
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
            </svg>
        ),
        title: 'Inventario inteligente',
        desc: 'Controla stock de quesos e insumos en tiempo real con alertas de mínimos y trazabilidad completa por lote.',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Gestión de ventas',
        desc: 'Registra ventas al contado y a crédito con precios en USD. Genera cuentas por cobrar automáticamente.',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        title: 'Recepción de leche',
        desc: 'Registra volumen, acidez y temperatura por proveedor. Calcula rendimiento litros/kg automáticamente.',
        color: 'bg-amber-50 text-amber-600',
    },
    {
        icon: (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
        ),
        title: 'Tasas de cambio',
        desc: 'BCV y paralelo actualizados diariamente. Todos los precios y reportes en USD con conversión automática.',
        color: 'bg-violet-50 text-violet-600',
    },
];

const STEPS = [
    {
        num: '01',
        title: 'Registra tu operación',
        desc: 'Configura tus proveedores, productos y precios base en minutos.',
    },
    {
        num: '02',
        title: 'Gestiona producción y ventas',
        desc: 'Recibe leche, produce lotes y registra ventas con descuento automático de inventario.',
    },
    {
        num: '03',
        title: 'Analiza y cobra',
        desc: 'Visualiza métricas clave, controla cuentas por cobrar y toma decisiones con datos reales.',
    },
];

const PLANS = [
    {
        name: 'Básico',
        price: '$15',
        period: '/mes',
        desc: 'Para queserías pequeñas que empiezan a digitalizarse.',
        features: ['Hasta 2 usuarios', 'Inventario y ventas', 'Recepción de leche', 'Reportes básicos'],
        cta: 'Empezar gratis',
        highlight: false,
    },
    {
        name: 'Profesional',
        price: '$35',
        period: '/mes',
        desc: 'Para operaciones medianas con mayor volumen.',
        features: ['Hasta 5 usuarios', 'Todo en Básico', 'Lotes de producción', 'Cuentas por cobrar', 'Exportar a Excel'],
        cta: 'Comenzar ahora',
        highlight: true,
    },
    {
        name: 'Empresa',
        price: '$80',
        period: '/mes',
        desc: 'Para grupos de queserías y distribuidores.',
        features: ['Usuarios ilimitados', 'Todo en Profesional', 'Multi-sucursal', 'API acceso', 'Soporte prioritario'],
        cta: 'Contactar ventas',
        highlight: false,
    },
];

function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <a href="#/" className="flex items-center gap-2">
                    <span className="text-2xl">🧀</span>
                    <span className="text-lg font-bold text-slate-800 tracking-tight">LacteoData</span>
                </a>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(l => (
                        <a key={l.label} href={l.href} className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors">
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <a href="#/dashboard" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Iniciar sesión
                    </a>
                    <a
                        href="#/dashboard"
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Ir al tablero →
                    </a>
                </div>

                <button className="md:hidden p-2 rounded-md text-slate-600" onClick={() => setOpen(!open)}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                    </svg>
                </button>
            </div>

            {open && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 flex flex-col gap-4">
                    {NAV_LINKS.map(l => (
                        <a key={l.label} href={l.href} className="text-sm text-slate-600 font-medium" onClick={() => setOpen(false)}>
                            {l.label}
                        </a>
                    ))}
                    <a href="#/dashboard" className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center">
                        Ir al tablero →
                    </a>
                </div>
            )}
        </nav>
    );
}

export default function Landing() {
    return (
        <div className="min-h-screen bg-white font-sans">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
                        Para queserías artesanales venezolanas
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                        Gestiona tu quesería{' '}
                        <span className="text-blue-600">con precisión</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Control de inventario, ventas, recepciones de leche y tasas de cambio en una sola plataforma. Diseñada para la realidad venezolana.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#/dashboard"
                            className="bg-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-base"
                        >
                            Comenzar ahora →
                        </a>
                        <a
                            href="#how"
                            className="border border-slate-200 text-slate-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-colors text-base"
                        >
                            Ver cómo funciona
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
                        {[['200+', 'Queserías activas'], ['50k+', 'Ventas registradas'], ['99.9%', 'Disponibilidad']].map(([val, lbl]) => (
                            <div key={lbl} className="text-center">
                                <div className="text-2xl font-extrabold text-slate-900">{val}</div>
                                <div className="text-xs text-slate-500 mt-1">{lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-20 px-4 sm:px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Todo lo que necesitas</h2>
                        <p className="text-slate-500 max-w-xl mx-auto">Una plataforma completa pensada para el día a día de una quesería artesanal.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURES.map(f => (
                            <div key={f.title} className="p-6 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                                    {f.icon}
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="py-20 px-4 sm:px-6 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Cómo funciona</h2>
                        <p className="text-slate-500">Empieza a operar en minutos, sin configuración compleja.</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {STEPS.map((s, i) => (
                            <div key={s.num} className="relative text-center">
                                {i < STEPS.length - 1 && (
                                    <div className="hidden sm:block absolute top-6 left-2/3 w-full h-px bg-blue-200 -translate-y-1/2" />
                                )}
                                <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center mx-auto mb-4 relative z-10">
                                    {s.num}
                                </div>
                                <h3 className="font-bold text-slate-800 mb-2">{s.title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-20 px-4 sm:px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Planes simples y transparentes</h2>
                        <p className="text-slate-500">Sin sorpresas. Cancela cuando quieras.</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {PLANS.map(p => (
                            <div
                                key={p.name}
                                className={`rounded-2xl p-7 flex flex-col ${p.highlight ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105' : 'border border-slate-100 text-slate-800'}`}
                            >
                                <div className={`text-sm font-semibold mb-1 ${p.highlight ? 'text-blue-100' : 'text-blue-600'}`}>{p.name}</div>
                                <div className="flex items-end gap-1 mb-2">
                                    <span className="text-4xl font-extrabold">{p.price}</span>
                                    <span className={`text-sm mb-1.5 ${p.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{p.period}</span>
                                </div>
                                <p className={`text-sm mb-6 ${p.highlight ? 'text-blue-100' : 'text-slate-500'}`}>{p.desc}</p>
                                <ul className="flex-1 space-y-2.5 mb-8">
                                    {p.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm">
                                            <svg className={`w-4 h-4 shrink-0 ${p.highlight ? 'text-blue-200' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <a
                                    href="#/dashboard"
                                    className={`text-center font-semibold py-2.5 rounded-xl text-sm transition-colors ${
                                        p.highlight
                                            ? 'bg-white text-blue-600 hover:bg-blue-50'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                    }`}
                                >
                                    {p.cta}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">¿Listo para digitalizar tu quesería?</h2>
                    <p className="text-blue-100 mb-8 text-lg">Únete a cientos de queserías venezolanas que ya gestionan su operación con LacteoData.</p>
                    <a
                        href="#/dashboard"
                        className="inline-block bg-white text-blue-600 font-bold px-10 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-base"
                    >
                        Ir al tablero →
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">🧀</span>
                            <span className="text-white font-bold">LacteoData</span>
                        </div>
                        <p className="text-sm max-w-xs leading-relaxed">
                            SaaS para la gestión de queserías artesanales venezolanas. Simple, preciso y confiable.
                        </p>
                    </div>
                    <div className="flex gap-12 text-sm">
                        <div>
                            <div className="text-white font-semibold mb-3">Producto</div>
                            {['Características', 'Precios', 'Tablero'].map(l => (
                                <div key={l} className="mb-1.5 hover:text-white cursor-pointer transition-colors">{l}</div>
                            ))}
                        </div>
                        <div>
                            <div className="text-white font-semibold mb-3">Empresa</div>
                            {['Acerca de', 'Soporte', 'Privacidad'].map(l => (
                                <div key={l} className="mb-1.5 hover:text-white cursor-pointer transition-colors">{l}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 text-xs text-center">
                    © {new Date().getFullYear()} LacteoData. Hecho con ♥ en Venezuela.
                </div>
            </footer>
        </div>
    );
}

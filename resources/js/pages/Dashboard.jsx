import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../components/api';
import { Modal, Input, Select, Button, Badge, EmptyState, StatCard, useForm } from '../components/ui';

/* ─── NAV CONFIG ─── */
const NAV = [
    { id: 'overview',    label: 'Resumen',     icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'sales',       label: 'Ventas',      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { id: 'inventory',   label: 'Inventario',  icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11' },
    { id: 'milk',        label: 'Leche',       icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
    { id: 'production',  label: 'Producción',  icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'receivables', label: 'Por cobrar',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'providers',   label: 'Proveedores', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'rates',       label: 'Tasas',       icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3' },
];

const today = () => new Date().toISOString().split('T')[0];

/* ─── OVERVIEW ─── */
function OverviewTab() {
    const { data: rate, isLoading: rl } = useQuery({ queryKey: ['rate'], queryFn: api.getCurrentRate });
    const { data: sales, isLoading: sl } = useQuery({ queryKey: ['sales'], queryFn: api.getSales });
    const { data: receivables } = useQuery({ queryKey: ['receivables'], queryFn: () => api.getReceivables({ status: 'pending' }) });
    const { data: products } = useQuery({ queryKey: ['products'], queryFn: () => api.getProducts({ type: 'cheese' }) });

    const todayTotal = sales?.data?.filter(s => s.sale_date === today()).reduce((a, s) => a + parseFloat(s.total_usd), 0) ?? 0;
    const totalStock = products?.data?.reduce((a, p) => a + parseFloat(p.stock), 0) ?? 0;
    const pendingTotal = receivables?.data?.reduce((a, r) => a + parseFloat(r.balance_usd), 0) ?? 0;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard title="Ventas hoy" value={sl ? '…' : `$${todayTotal.toFixed(2)}`} sub="Total del día USD" color="bg-blue-50 text-blue-600" icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <StatCard title="Stock quesos" value={`${totalStock.toFixed(1)} kg`} sub="En inventario" color="bg-emerald-50 text-emerald-600" icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V11" />
                <StatCard title="Por cobrar" value={`$${pendingTotal.toFixed(2)}`} sub={`${receivables?.data?.length ?? 0} pendientes`} color="bg-amber-50 text-amber-600" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                <StatCard title="Tasa BCV" value={rl ? '…' : rate ? `Bs. ${parseFloat(rate.rate_bcv).toFixed(2)}` : 'Sin datos'} sub={rate ? `Paralelo: Bs. ${parseFloat(rate.rate_parallel ?? 0).toFixed(2)}` : ''} color="bg-violet-50 text-violet-600" icon="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="px-6 py-4 border-b border-slate-100">
                    <h2 className="font-bold text-slate-800">Últimas ventas</h2>
                </div>
                {sl ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : <SalesTable data={sales?.data} />}
            </div>
        </div>
    );
}

/* ─── SHARED TABLE COMPONENTS ─── */
function SalesTable({ data }) {
    if (!data?.length) return <EmptyState title="No hay ventas registradas" />;
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead><tr className="border-b border-slate-100">
                    {['Cliente', 'Fecha', 'Producto', 'Kg', 'Total USD', 'Estado'].map(h => (
                        <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${h === 'Kg' || h === 'Total USD' ? 'text-right' : h === 'Estado' ? 'text-center' : 'text-left'}`}>{h}</th>
                    ))}
                </tr></thead>
                <tbody className="divide-y divide-slate-50">
                    {data.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 px-4 font-medium text-slate-700">{s.customer_name}</td>
                            <td className="py-3 px-4 text-slate-500">{s.sale_date}</td>
                            <td className="py-3 px-4 text-slate-500">{s.product?.name ?? '-'}</td>
                            <td className="py-3 px-4 text-right text-slate-600">{parseFloat(s.quantity_kg).toFixed(2)}</td>
                            <td className="py-3 px-4 text-right font-semibold text-slate-800">${parseFloat(s.total_usd).toFixed(2)}</td>
                            <td className="py-3 px-4 text-center">
                                <Badge color={s.status === 'paid' ? 'emerald' : 'amber'}>{s.status === 'paid' ? 'Pagado' : 'Crédito'}</Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ─── SALES MODULE ─── */
function SalesTab() {
    const [open, setOpen] = useState(false);
    const qc = useQueryClient();
    const { data: sales, isLoading } = useQuery({ queryKey: ['sales'], queryFn: api.getSales });
    const { data: products } = useQuery({ queryKey: ['products', 'cheese'], queryFn: () => api.getProducts({ type: 'cheese' }) });
    const { form, errors, loading, set, submit, reset } = useForm({
        customer_name: '', sale_date: today(), product_id: '', quantity_kg: '', price_usd: '', status: 'paid', due_date: '',
    });

    const mutation = useMutation({
        mutationFn: api.createSale,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['sales'] }); qc.invalidateQueries({ queryKey: ['products'] }); setOpen(false); reset(); },
    });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">Ventas</h2>
                <Button onClick={() => setOpen(true)}>+ Nueva venta</Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : <SalesTable data={sales?.data} />}
            </div>
            <Modal open={open} onClose={() => setOpen(false)} title="Registrar venta">
                <form onSubmit={e => { e.preventDefault(); submit(d => mutation.mutateAsync(d)); }} className="space-y-4">
                    {errors._general && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors._general}</p>}
                    <Input label="Cliente" value={form.customer_name} onChange={e => set('customer_name', e.target.value)} error={errors.customer_name} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Fecha" type="date" value={form.sale_date} onChange={e => set('sale_date', e.target.value)} error={errors.sale_date} />
                        <Select label="Producto" value={form.product_id} onChange={e => set('product_id', e.target.value)} error={errors.product_id} options={(products?.data ?? []).map(p => ({ value: p.id, label: `${p.name} (${p.stock} kg)` }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Cantidad (kg)" type="number" step="0.01" value={form.quantity_kg} onChange={e => set('quantity_kg', e.target.value)} error={errors.quantity_kg} />
                        <Input label="Precio USD/kg" type="number" step="0.01" value={form.price_usd} onChange={e => set('price_usd', e.target.value)} error={errors.price_usd} />
                    </div>
                    <Select label="Estado" value={form.status} onChange={e => set('status', e.target.value)} error={errors.status} options={[{ value: 'paid', label: 'Pagado' }, { value: 'credit', label: 'Crédito' }]} />
                    {form.status === 'credit' && (
                        <Input label="Fecha de vencimiento" type="date" value={form.due_date} onChange={e => set('due_date', e.target.value)} error={errors.due_date} />
                    )}
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button type="submit" loading={loading}>Registrar</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

/* ─── INVENTORY MODULE ─── */
function InventoryTab() {
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const qc = useQueryClient();
    const { data: products, isLoading } = useQuery({ queryKey: ['products'], queryFn: () => api.getProducts() });
    const { form, errors, loading, set, submit, reset } = useForm({ name: '', type: 'cheese', stock: '', unit: 'kg', cost_usd: '' });

    const create = useMutation({ mutationFn: api.createProduct, onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); setOpen(false); reset(); } });
    const update = useMutation({ mutationFn: ({ id, ...data }) => api.updateProduct(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['products'] }); setOpen(false); setEditId(null); reset(); } });

    const openEdit = (p) => { setEditId(p.id); set('name', p.name); set('type', p.type); set('stock', p.stock); set('unit', p.unit); set('cost_usd', p.cost_usd); setOpen(true); };
    const close = () => { setOpen(false); setEditId(null); reset(); };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">Inventario</h2>
                <Button onClick={() => { setEditId(null); reset(); setOpen(true); }}>+ Nuevo producto</Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : !products?.data?.length ? <EmptyState title="Sin productos registrados" /> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                            {['Producto', 'Tipo', 'Stock', 'Unidad', 'Costo USD', ''].map(h => (
                                <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${h === 'Stock' || h === 'Costo USD' ? 'text-right' : 'text-left'}`}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-50">
                            {products.data.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-3 px-4 font-medium text-slate-700">{p.name}</td>
                                    <td className="py-3 px-4"><Badge color={p.type === 'cheese' ? 'amber' : 'blue'}>{p.type === 'cheese' ? 'Queso' : 'Insumo'}</Badge></td>
                                    <td className={`py-3 px-4 text-right font-semibold ${parseFloat(p.stock) < 5 ? 'text-red-600' : 'text-slate-800'}`}>{parseFloat(p.stock).toFixed(2)}</td>
                                    <td className="py-3 px-4 text-slate-500">{p.unit}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">${parseFloat(p.cost_usd).toFixed(2)}</td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => openEdit(p)} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal open={open} onClose={close} title={editId ? 'Editar producto' : 'Nuevo producto'}>
                <form onSubmit={e => { e.preventDefault(); submit(d => editId ? update.mutateAsync({ id: editId, ...d }) : create.mutateAsync(d)); }} className="space-y-4">
                    <Input label="Nombre" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} />
                    <div className="grid grid-cols-2 gap-3">
                        <Select label="Tipo" value={form.type} onChange={e => set('type', e.target.value)} error={errors.type} options={[{ value: 'cheese', label: 'Queso' }, { value: 'input', label: 'Insumo' }]} />
                        <Input label="Unidad" value={form.unit} onChange={e => set('unit', e.target.value)} error={errors.unit} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Stock" type="number" step="0.01" value={form.stock} onChange={e => set('stock', e.target.value)} error={errors.stock} />
                        <Input label="Costo USD" type="number" step="0.01" value={form.cost_usd} onChange={e => set('cost_usd', e.target.value)} error={errors.cost_usd} />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" type="button" onClick={close}>Cancelar</Button>
                        <Button type="submit" loading={loading}>{editId ? 'Guardar' : 'Crear'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

/* ─── MILK MODULE ─── */
function MilkTab() {
    const [open, setOpen] = useState(false);
    const qc = useQueryClient();
    const { data: receptions, isLoading } = useQuery({ queryKey: ['milk'], queryFn: api.getMilkReceptions });
    const { data: providers } = useQuery({ queryKey: ['providers'], queryFn: api.getProviders });
    const { form, errors, loading, set, submit, reset } = useForm({ provider_id: '', reception_date: today(), volume_liters: '', acidity: '', temperature: '', price_per_liter_usd: '' });

    const mutation = useMutation({ mutationFn: api.createMilkReception, onSuccess: () => { qc.invalidateQueries({ queryKey: ['milk'] }); setOpen(false); reset(); } });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">Recepciones de leche</h2>
                <Button onClick={() => setOpen(true)}>+ Registrar recepción</Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : !receptions?.data?.length ? <EmptyState title="Sin recepciones registradas" /> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                            {['Proveedor', 'Fecha', 'Litros', 'Acidez', 'Temp', '$/Litro'].map(h => (
                                <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${['Litros', 'Acidez', 'Temp', '$/Litro'].includes(h) ? 'text-right' : 'text-left'}`}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-50">
                            {receptions.data.map(r => (
                                <tr key={r.id} className="hover:bg-slate-50">
                                    <td className="py-3 px-4 font-medium text-slate-700">{r.provider?.name ?? '-'}</td>
                                    <td className="py-3 px-4 text-slate-500">{r.reception_date}</td>
                                    <td className="py-3 px-4 text-right font-semibold text-slate-800">{parseFloat(r.volume_liters).toFixed(1)}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">{r.acidity ?? '-'}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">{r.temperature ? `${r.temperature}°` : '-'}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">${parseFloat(r.price_per_liter_usd).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal open={open} onClose={() => setOpen(false)} title="Registrar recepción de leche">
                <form onSubmit={e => { e.preventDefault(); submit(d => mutation.mutateAsync(d)); }} className="space-y-4">
                    <Select label="Proveedor" value={form.provider_id} onChange={e => set('provider_id', e.target.value)} error={errors.provider_id} options={(providers?.data ?? []).map(p => ({ value: p.id, label: p.name }))} />
                    <Input label="Fecha" type="date" value={form.reception_date} onChange={e => set('reception_date', e.target.value)} error={errors.reception_date} />
                    <div className="grid grid-cols-3 gap-3">
                        <Input label="Litros" type="number" step="0.01" value={form.volume_liters} onChange={e => set('volume_liters', e.target.value)} error={errors.volume_liters} />
                        <Input label="Acidez" type="number" step="0.01" value={form.acidity} onChange={e => set('acidity', e.target.value)} error={errors.acidity} placeholder="Opcional" />
                        <Input label="Temp °C" type="number" step="0.1" value={form.temperature} onChange={e => set('temperature', e.target.value)} error={errors.temperature} placeholder="Opcional" />
                    </div>
                    <Input label="Precio USD/litro" type="number" step="0.01" value={form.price_per_liter_usd} onChange={e => set('price_per_liter_usd', e.target.value)} error={errors.price_per_liter_usd} />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button type="submit" loading={loading}>Registrar</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

/* ─── PRODUCTION MODULE ─── */
function ProductionTab() {
    const [open, setOpen] = useState(false);
    const qc = useQueryClient();
    const { data: batches, isLoading } = useQuery({ queryKey: ['batches'], queryFn: api.getBatches });
    const { data: cheeses } = useQuery({ queryKey: ['products', 'cheese'], queryFn: () => api.getProducts({ type: 'cheese' }) });
    const { data: inputs } = useQuery({ queryKey: ['products', 'input'], queryFn: () => api.getProducts({ type: 'input' }) });
    const { form, errors, loading, set, submit, reset } = useForm({ product_id: '', production_date: today(), volume_milk_used: '', yield_kg: '', notes: '', inputs: [] });

    const addInput = () => set('inputs', [...form.inputs, { product_id: '', quantity: '' }]);
    const setInput = (i, field, val) => { const ins = [...form.inputs]; ins[i] = { ...ins[i], [field]: val }; set('inputs', ins); };
    const removeInput = (i) => set('inputs', form.inputs.filter((_, idx) => idx !== i));

    const mutation = useMutation({
        mutationFn: api.createBatch,
        onSuccess: () => { qc.invalidateQueries({ queryKey: ['batches'] }); qc.invalidateQueries({ queryKey: ['products'] }); setOpen(false); reset(); },
    });

    const yieldRatio = form.volume_milk_used && form.yield_kg ? (parseFloat(form.volume_milk_used) / parseFloat(form.yield_kg)).toFixed(1) : null;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">Lotes de producción</h2>
                <Button onClick={() => { reset(); setOpen(true); }}>+ Nuevo lote</Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : !batches?.data?.length ? <EmptyState title="Sin lotes registrados" /> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                            {['Fecha', 'Queso', 'Leche (L)', 'Producido (kg)', 'Rend. L/kg', 'Insumos'].map(h => (
                                <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${['Leche (L)', 'Producido (kg)', 'Rend. L/kg'].includes(h) ? 'text-right' : 'text-left'}`}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-50">
                            {batches.data.map(b => (
                                <tr key={b.id} className="hover:bg-slate-50">
                                    <td className="py-3 px-4 text-slate-500">{b.production_date}</td>
                                    <td className="py-3 px-4 font-medium text-slate-700">{b.product?.name ?? '-'}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">{parseFloat(b.volume_milk_used).toFixed(1)}</td>
                                    <td className="py-3 px-4 text-right font-semibold text-slate-800">{parseFloat(b.yield_kg).toFixed(2)}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">{(parseFloat(b.volume_milk_used) / parseFloat(b.yield_kg)).toFixed(1)}</td>
                                    <td className="py-3 px-4">{b.inputs?.length ? b.inputs.map(i => <Badge key={i.id} color="slate">{i.product?.name}: {i.quantity}</Badge>) : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal open={open} onClose={() => setOpen(false)} title="Nuevo lote de producción">
                <form onSubmit={e => { e.preventDefault(); submit(d => mutation.mutateAsync({ ...d, inputs: d.inputs.filter(i => i.product_id && i.quantity) })); }} className="space-y-4">
                    {errors._general && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors._general}</p>}
                    <Select label="Queso a producir" value={form.product_id} onChange={e => set('product_id', e.target.value)} error={errors.product_id} options={(cheeses?.data ?? []).map(p => ({ value: p.id, label: p.name }))} />
                    <Input label="Fecha" type="date" value={form.production_date} onChange={e => set('production_date', e.target.value)} error={errors.production_date} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Leche usada (L)" type="number" step="0.1" value={form.volume_milk_used} onChange={e => set('volume_milk_used', e.target.value)} error={errors.volume_milk_used} />
                        <Input label="Queso producido (kg)" type="number" step="0.01" value={form.yield_kg} onChange={e => set('yield_kg', e.target.value)} error={errors.yield_kg} />
                    </div>
                    {yieldRatio && <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg">Rendimiento: <strong>{yieldRatio} L/kg</strong></p>}
                    <Input label="Notas" value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Opcional" />

                    <div className="border-t border-slate-100 pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-semibold text-slate-700">Insumos usados</span>
                            <Button variant="ghost" type="button" onClick={addInput}>+ Agregar insumo</Button>
                        </div>
                        {form.inputs.map((inp, i) => (
                            <div key={i} className="flex gap-2 mb-2 items-end">
                                <div className="flex-1">
                                    <Select value={inp.product_id} onChange={e => setInput(i, 'product_id', e.target.value)} options={(inputs?.data ?? []).map(p => ({ value: p.id, label: `${p.name} (${p.stock})` }))} />
                                </div>
                                <div className="w-28">
                                    <Input type="number" step="0.01" placeholder="Cant." value={inp.quantity} onChange={e => setInput(i, 'quantity', e.target.value)} />
                                </div>
                                <button type="button" onClick={() => removeInput(i)} className="text-red-400 hover:text-red-600 pb-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button type="submit" loading={loading}>Crear lote</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

/* ─── RECEIVABLES MODULE ─── */
function ReceivablesTab() {
    const [payId, setPayId] = useState(null);
    const qc = useQueryClient();
    const { data: receivables, isLoading } = useQuery({ queryKey: ['receivables'], queryFn: () => api.getReceivables() });
    const { form, errors, loading, set, submit, reset } = useForm({ amount_usd: '' });

    const mutation = useMutation({ mutationFn: ({ id, ...data }) => api.payReceivable(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['receivables'] }); qc.invalidateQueries({ queryKey: ['sales'] }); setPayId(null); reset(); } });

    const statusMap = { pending: ['amber', 'Pendiente'], partial: ['blue', 'Parcial'], paid: ['emerald', 'Pagado'] };

    return (
        <div className="space-y-4">
            <h2 className="font-bold text-slate-800 text-lg">Cuentas por cobrar</h2>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : !receivables?.data?.length ? <EmptyState title="Sin cuentas pendientes" /> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                            {['Cliente', 'Fecha venta', 'Original', 'Saldo', 'Vencimiento', 'Estado', ''].map(h => (
                                <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${['Original', 'Saldo'].includes(h) ? 'text-right' : h === 'Estado' ? 'text-center' : 'text-left'}`}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-50">
                            {receivables.data.map(r => {
                                const [color, label] = statusMap[r.status] ?? ['slate', r.status];
                                return (
                                    <tr key={r.id} className="hover:bg-slate-50">
                                        <td className="py-3 px-4 font-medium text-slate-700">{r.sale?.customer_name ?? '-'}</td>
                                        <td className="py-3 px-4 text-slate-500">{r.sale?.sale_date ?? '-'}</td>
                                        <td className="py-3 px-4 text-right text-slate-600">${parseFloat(r.original_amount_usd).toFixed(2)}</td>
                                        <td className="py-3 px-4 text-right font-semibold text-slate-800">${parseFloat(r.balance_usd).toFixed(2)}</td>
                                        <td className={`py-3 px-4 ${r.due_date && new Date(r.due_date) < new Date() && r.status !== 'paid' ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>{r.due_date?.split('T')[0] ?? '-'}</td>
                                        <td className="py-3 px-4 text-center"><Badge color={color}>{label}</Badge></td>
                                        <td className="py-3 px-4">
                                            {r.status !== 'paid' && (
                                                <button onClick={() => { setPayId(r); reset(); }} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Abonar</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal open={!!payId} onClose={() => setPayId(null)} title="Registrar abono">
                {payId && (
                    <form onSubmit={e => { e.preventDefault(); submit(d => mutation.mutateAsync({ id: payId.id, ...d })); }} className="space-y-4">
                        <p className="text-sm text-slate-500">Cliente: <strong>{payId.sale?.customer_name}</strong> — Saldo: <strong>${parseFloat(payId.balance_usd).toFixed(2)}</strong></p>
                        {errors._general && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors._general}</p>}
                        <Input label="Monto a abonar (USD)" type="number" step="0.01" max={payId.balance_usd} value={form.amount_usd} onChange={e => set('amount_usd', e.target.value)} error={errors.amount_usd} />
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="secondary" type="button" onClick={() => setPayId(null)}>Cancelar</Button>
                            <Button type="submit" loading={loading}>Abonar</Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
}

/* ─── PROVIDERS MODULE ─── */
function ProvidersTab() {
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const qc = useQueryClient();
    const { data: providers, isLoading } = useQuery({ queryKey: ['providers'], queryFn: api.getProviders });
    const { form, errors, loading, set, submit, reset } = useForm({ name: '', document_id: '', phone: '', address: '' });

    const create = useMutation({ mutationFn: api.createProvider, onSuccess: () => { qc.invalidateQueries({ queryKey: ['providers'] }); setOpen(false); reset(); } });
    const update = useMutation({ mutationFn: ({ id, ...data }) => api.updateProvider(id, data), onSuccess: () => { qc.invalidateQueries({ queryKey: ['providers'] }); setOpen(false); setEditId(null); reset(); } });

    const openEdit = (p) => { setEditId(p.id); set('name', p.name); set('document_id', p.document_id ?? ''); set('phone', p.phone ?? ''); set('address', p.address ?? ''); setOpen(true); };
    const close = () => { setOpen(false); setEditId(null); reset(); };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">Proveedores</h2>
                <Button onClick={() => { setEditId(null); reset(); setOpen(true); }}>+ Nuevo proveedor</Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : !providers?.data?.length ? <EmptyState title="Sin proveedores registrados" /> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                            {['Nombre', 'RIF/CI', 'Teléfono', 'Recepciones', 'Estado', ''].map(h => (
                                <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${h === 'Recepciones' ? 'text-right' : h === 'Estado' ? 'text-center' : 'text-left'}`}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-50">
                            {providers.data.map(p => (
                                <tr key={p.id} className="hover:bg-slate-50">
                                    <td className="py-3 px-4 font-medium text-slate-700">{p.name}</td>
                                    <td className="py-3 px-4 text-slate-500">{p.document_id ?? '-'}</td>
                                    <td className="py-3 px-4 text-slate-500">{p.phone ?? '-'}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">{p.milk_receptions_count ?? 0}</td>
                                    <td className="py-3 px-4 text-center"><Badge color={p.is_active ? 'emerald' : 'red'}>{p.is_active ? 'Activo' : 'Inactivo'}</Badge></td>
                                    <td className="py-3 px-4">
                                        <button onClick={() => openEdit(p)} className="text-xs text-blue-600 hover:text-blue-800 font-semibold">Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal open={open} onClose={close} title={editId ? 'Editar proveedor' : 'Nuevo proveedor'}>
                <form onSubmit={e => { e.preventDefault(); submit(d => editId ? update.mutateAsync({ id: editId, ...d }) : create.mutateAsync(d)); }} className="space-y-4">
                    <Input label="Nombre" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="RIF / CI" value={form.document_id} onChange={e => set('document_id', e.target.value)} placeholder="J-12345678" />
                        <Input label="Teléfono" value={form.phone} onChange={e => set('phone', e.target.value)} />
                    </div>
                    <Input label="Dirección" value={form.address} onChange={e => set('address', e.target.value)} />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" type="button" onClick={close}>Cancelar</Button>
                        <Button type="submit" loading={loading}>{editId ? 'Guardar' : 'Crear'}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

/* ─── RATES MODULE ─── */
function RatesTab() {
    const [open, setOpen] = useState(false);
    const qc = useQueryClient();
    const { data: rate } = useQuery({ queryKey: ['rate'], queryFn: api.getCurrentRate });
    const { data: rates, isLoading } = useQuery({ queryKey: ['rates'], queryFn: api.getRates });
    const { form, errors, loading, set, submit, reset } = useForm({ date: today(), rate_bcv: '', rate_parallel: '' });

    const mutation = useMutation({ mutationFn: api.createRate, onSuccess: () => { qc.invalidateQueries({ queryKey: ['rate'] }); qc.invalidateQueries({ queryKey: ['rates'] }); setOpen(false); reset(); } });

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-800 text-lg">Tasas de cambio</h2>
                <Button onClick={() => setOpen(true)}>+ Registrar tasa</Button>
            </div>
            {rate && (
                <div className="grid sm:grid-cols-2 gap-4 max-w-md">
                    <div className="bg-blue-50 rounded-xl p-5 text-center">
                        <p className="text-xs text-blue-500 font-semibold mb-1 uppercase">BCV</p>
                        <p className="text-3xl font-extrabold text-blue-700">Bs. {parseFloat(rate.rate_bcv).toFixed(2)}</p>
                        <p className="text-xs text-blue-400 mt-1">{rate.date?.split('T')[0]}</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-5 text-center">
                        <p className="text-xs text-amber-500 font-semibold mb-1 uppercase">Paralelo</p>
                        <p className="text-3xl font-extrabold text-amber-700">Bs. {parseFloat(rate.rate_parallel ?? 0).toFixed(2)}</p>
                        <p className="text-xs text-amber-400 mt-1">{rate.date?.split('T')[0]}</p>
                    </div>
                </div>
            )}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto">
                <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Historial</h3></div>
                {isLoading ? <div className="py-12 text-center text-slate-400 text-sm">Cargando…</div> : (
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-slate-100">
                            {['Fecha', 'BCV', 'Paralelo'].map(h => (
                                <th key={h} className={`py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide ${h !== 'Fecha' ? 'text-right' : 'text-left'}`}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody className="divide-y divide-slate-50">
                            {(rates?.data ?? []).map(r => (
                                <tr key={r.id} className="hover:bg-slate-50">
                                    <td className="py-3 px-4 text-slate-700 font-medium">{r.date?.split('T')[0]}</td>
                                    <td className="py-3 px-4 text-right text-slate-800">Bs. {parseFloat(r.rate_bcv).toFixed(2)}</td>
                                    <td className="py-3 px-4 text-right text-slate-600">{r.rate_parallel ? `Bs. ${parseFloat(r.rate_parallel).toFixed(2)}` : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal open={open} onClose={() => setOpen(false)} title="Registrar tasa de cambio">
                <form onSubmit={e => { e.preventDefault(); submit(d => mutation.mutateAsync(d)); }} className="space-y-4">
                    {errors._general && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errors._general}</p>}
                    <Input label="Fecha" type="date" value={form.date} onChange={e => set('date', e.target.value)} error={errors.date} />
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Tasa BCV" type="number" step="0.01" value={form.rate_bcv} onChange={e => set('rate_bcv', e.target.value)} error={errors.rate_bcv} />
                        <Input label="Tasa Paralelo" type="number" step="0.01" value={form.rate_parallel} onChange={e => set('rate_parallel', e.target.value)} error={errors.rate_parallel} placeholder="Opcional" />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" type="button" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button type="submit" loading={loading}>Registrar</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

/* ─── SIDEBAR ─── */
function Sidebar({ active, setActive, collapsed, setCollapsed }) {
    return (
        <aside className={`hidden md:flex flex-col bg-slate-900 transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}>
            <div className="flex items-center gap-2 h-16 px-4 border-b border-slate-800 shrink-0">
                <span className="text-xl">🧀</span>
                {!collapsed && <span className="text-white font-bold text-sm">LacteoData</span>}
            </div>
            <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
                {NAV.map(n => (
                    <button key={n.id} onClick={() => setActive(n.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${active === n.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={n.icon} /></svg>
                        {!collapsed && n.label}
                    </button>
                ))}
            </nav>
            <div className="p-2 border-t border-slate-800">
                <button onClick={() => setCollapsed(!collapsed)} className="w-full flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={collapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7m8 14l-7-7 7-7'} /></svg>
                </button>
            </div>
        </aside>
    );
}

/* ─── MAIN DASHBOARD ─── */
export default function Dashboard() {
    const [active, setActive] = useState('overview');
    const [collapsed, setCollapsed] = useState(false);
    const { data: rate } = useQuery({ queryKey: ['rate'], queryFn: api.getCurrentRate });

    const TABS = { overview: OverviewTab, sales: SalesTab, inventory: InventoryTab, milk: MilkTab, production: ProductionTab, receivables: ReceivablesTab, providers: ProvidersTab, rates: RatesTab };
    const ActiveTab = TABS[active] ?? OverviewTab;

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
                    <div>
                        <h1 className="text-base font-bold text-slate-800">{NAV.find(n => n.id === active)?.label ?? 'Tablero'}</h1>
                        <p className="text-xs text-slate-400">{new Date().toLocaleDateString('es-VE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {rate && <div className="hidden sm:flex items-center gap-2 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full"><span>💱</span>BCV: Bs. {parseFloat(rate.rate_bcv).toFixed(2)}</div>}
                        <a href="#/" className="text-xs text-slate-500 hover:text-blue-600 transition-colors font-medium">← Volver al sitio</a>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6"><ActiveTab /></main>
            </div>
        </div>
    );
}

import axios from 'axios';

const api = {
    // Products
    getProducts:       (params) => axios.get('/api/products', { params }).then(r => r.data),
    createProduct:     (data) => axios.post('/api/products', data).then(r => r.data),
    updateProduct:     (id, data) => axios.put(`/api/products/${id}`, data).then(r => r.data),

    // Sales
    getSales:          () => axios.get('/api/sales').then(r => r.data),
    createSale:        (data) => axios.post('/api/sales', data).then(r => r.data),

    // Providers
    getProviders:      () => axios.get('/api/providers').then(r => r.data),
    createProvider:    (data) => axios.post('/api/providers', data).then(r => r.data),
    updateProvider:    (id, data) => axios.put(`/api/providers/${id}`, data).then(r => r.data),

    // Milk Receptions
    getMilkReceptions: () => axios.get('/api/milk-receptions').then(r => r.data),
    createMilkReception: (data) => axios.post('/api/milk-receptions', data).then(r => r.data),

    // Production Batches
    getBatches:        () => axios.get('/api/production-batches').then(r => r.data),
    createBatch:       (data) => axios.post('/api/production-batches', data).then(r => r.data),

    // Accounts Receivable
    getReceivables:    (params) => axios.get('/api/accounts-receivable', { params }).then(r => r.data),
    payReceivable:     (id, data) => axios.post(`/api/accounts-receivable/${id}/pay`, data).then(r => r.data),

    // Exchange Rates
    getCurrentRate:    () => axios.get('/api/exchange-rates/current').then(r => r.data),
    getRates:          () => axios.get('/api/exchange-rates').then(r => r.data),
    createRate:        (data) => axios.post('/api/exchange-rates', data).then(r => r.data),
};

export default api;

const express = require('express');
const app = express();
const PORT = 3000;

// ==========================================
// 1. MICROSERVICIO 1: Catálogo de Productos
// ==========================================
app.get('/microservices/products/:id', (req, res) => {
    const id = req.params.id;
    res.json({
        id: id,
        name: "Laptop Gamer XYZ",
        category: "Computo",
        price_usd: 1200.00
    });
});

// ==========================================
// 2. MICROSERVICIO 2: Inventario y Almacén
// ==========================================
app.get('/microservices/inventory/:productId', (req, res) => {
    res.json({
        stock_status: "IN_STOCK",
        available_units: 15,
        warehouse: "Almacén Central"
    });
});

// ==========================================
// 3. COMPOSITE API (API Agregadora)
// ==========================================
app.get('/api/v1/product-summary/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        // Consultamos nuestros microservicios locales y la API externa de Frankfurter
        const [productRes, inventoryRes, currencyRes] = await Promise.all([
            fetch(`http://localhost:${PORT}/microservices/products/${productId}`),
            fetch(`http://localhost:${PORT}/microservices/inventory/${productId}`),
            fetch('https://api.frankfurter.app/latest?from=USD&to=MXN')
        ]);

        // Convertimos las respuestas a formato JSON
        const product = await productRes.json();
        const inventory = await inventoryRes.json();
        const currency = await currencyRes.json();

        // Calculamos el precio en moneda local (MXN)
        const exchangeRate = currency.rates.MXN;
        const priceMxn = parseFloat((product.price_usd * exchangeRate).toFixed(2));

        // Estructura del contrato JSON consolidado final
        const consolidatedPayload = {
            product_id: product.id,
            title: product.name,
            price_usd: product.price_usd,
            price_mxn: priceMxn,
            stock_status: inventory.stock_status,
            available_units: inventory.available_units,
            currency_conversion_source: "Frankfurter External API",
            status: "SUCCESS"
        };

        return res.json(consolidatedPayload);

    } catch (error) {
        // Manejo básico de errores (Resiliencia)
        return res.status(500).json({
            status: "ERROR",
            message: "No se pudo completar la operación en la Composite API.",
            details: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de prácticas ejecutándose en http://localhost:${PORT}`);
});
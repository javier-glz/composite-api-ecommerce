# E-Commerce Gateway & Dashboard - Composite API

Práctica correspondiente a la Unidad 3 de la asignatura **Desarrollo Web Integral** en la Universidad Tecnológica de Chihuahua (UTCH).

## Descripción del Proyecto
Solución backend desarrollada con **Node.js y Express** que implementa el patrón de arquitectura **Composite API (API Aggregator)**. Su objetivo principal es optimizar el rendimiento del frontend mediante la centralización y orquestación de peticiones concurrentes a múltiples microservicios (Catálogo e Inventario) y una API externa de divisas (*Frankfurter*), resolviendo el problema de latencia (*Chatty I/O*).

## Endpoints Implementados
- **Catálogo de Productos:** `GET /microservices/products/{id}`[cite: 1]
- **Inventario y Almacén:** `GET /microservices/inventory/{productId}`[cite: 1]
- **API Externa de Divisas:** `GET https://api.frankfurter.app/latest?from=USD&to=MXN`[cite: 1]
- **Composite API (Agregadora):** `GET /api/v1/product-summary/{id}`[cite: 1]

## Instrucciones de Instalación y Ejecución Local
1. Clona el repositorio en tu equipo:
   ```bash
   git clone [https://github.com/javier-glz/composite-api-ecommerce.git](https://github.com/javier-glz/composite-api-ecommerce.git)
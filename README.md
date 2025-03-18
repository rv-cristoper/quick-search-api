# Quick Search API

API de búsqueda rápida para documentos de identidad DNI y RUC.

## Descripción

Quick Search API es un servicio REST desarrollado con NestJS que permite consultar información asociada a documentos de identidad (DNI) y números de RUC mediante un endpoint simple y eficiente.

## Características

- Búsqueda por DNI o RUC mediante un único endpoint
- Validación de parámetros de entrada
- Respuestas con formato JSON estandarizado
- Documentación con Swagger
- Gestión de errores centralizada

## Requisitos

- Node.js (v16.x o superior)
- npm o yarn
- Git

## Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/rv-cristoper/quick-search-api.git
cd quick-search-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Crea un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```
PORT=3000
NODE_ENV=development
TOKEN=XXXXXXXXXXXXX
```

## Ejecución

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

## Uso de la API

### Endpoint principal

```
GET /search?documentType=[dni/ruc]&documentNumber=[number]
```

### Parámetros

| Parámetro | Tipo | Descripción | Valores válidos |
|-----------|------|-------------|----------------|
| documentType | string | Tipo de documento a consultar | dni, ruc |
| documentNumber | string | Número de documento | Números |

### Ejemplos de uso

#### Consulta de DNI

```
GET /search?documentType=dni&documentNumber=12345678
```

Respuesta:

```json
{
  "status": "success",
  "data": {
    "documentType": "dni",
    "documentNumber": "12345678",
    "personInfo": {
      "fullName": "Nombre Apellido",
    }
  }
}
```

#### Consulta de RUC

```
GET /search?documentType=ruc&documentNumber=20123456789
```

Respuesta:

```json
{
  "status": "success",
  "data": {
    "documentType": "ruc",
    "documentNumber": "20123456789",
    "companyInfo": {
      "fullName": "Empresa S.A.C.",
    }
  }
}
```

## Licencia

Este proyecto está bajo la Licencia MIT.
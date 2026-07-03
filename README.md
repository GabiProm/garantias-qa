# Garantias QA Automation Framework

Framework de Automatización de Pruebas para **GarantiasApp** utilizando **Playwright**, **Postman**, **Newman** y **GitHub Actions**.

El proyecto automatiza pruebas funcionales, pruebas API, pruebas híbridas API + UI y escenarios End-to-End para la gestión de tickets de garantía.

---

# Objetivo

Validar la calidad de la aplicación GarantiasApp mediante pruebas automatizadas que cubren:

- Creación de Tickets
- Búsqueda de Tickets
- Actualización de Tickets
- Gestión de Componentes
- Dashboard de Indicadores
- Exportación de Reportes
- Integración API + UI
- CRUD Completo

---

# Tecnologías Utilizadas

- Playwright
- JavaScript
- Node.js
- Postman
- Newman
- GitHub Actions
- SQL Server
- REST API
- .NET 8
- React
- Vite

---

# Arquitectura del Proyecto

```text
garantias-qa
│
├── api
│   └── tickets.api.js
│
├── fixtures
│   ├── pages.fixture.js
│   └── apiTicket.fixture.js
│
├── pages
│   ├── CreateTicketPage.js
│   ├── SearchTicketPage.js
│   ├── UpdateTicketPage.js
│   └── AddComponentePage.js
│
├── tests
│   ├── crud
│   ├── api-ui
│   ├── dashboard
│   └── reportes
│
├── utils
│   └── testData.js
│
├── evidences
├── playwright-report
├── test-results
├── playwright.config.js
└── package.json
```

---

# Patrones Implementados

## Page Object Model (POM)

Se encapsulan acciones y locators dentro de clases reutilizables.

Ejemplos:

- CreateTicketPage
- SearchTicketPage
- UpdateTicketPage
- AddComponentePage

Beneficios:

- Menor duplicación
- Mayor mantenibilidad
- Mejor escalabilidad

---

## Fixtures Personalizadas

Se utilizan fixtures para inyectar automáticamente:

- createPage
- searchPage
- updatePage
- componentePage
- apiTicket

Beneficios:

- Menos código repetido
- Mejor reutilización
- Tests más limpios

---

## Test Data Factory

Generación automática de datos dinámicos.

Ejemplo:

```javascript
generateTicketData();
```

Permite evitar colisiones entre ejecuciones.

---

# Tipos de Pruebas Implementadas

## Smoke Tests

Validan funcionalidades críticas.

Ejemplos:

- Crear Ticket
- Crear y Buscar Ticket
- Dashboard carga correctamente
- API crea ticket y UI lo encuentra

Ejecución:

```bash
npm run smoke
```

---

## Regression Tests

Validan el comportamiento completo del sistema.

Incluyen:

- CRUD de Tickets
- Dashboard
- Reportes
- API + UI
- API + UI + API

Ejecución:

```bash
npm run regression
```

---

# Suite CRUD

Cobertura funcional:

- Crear Ticket
- Buscar Ticket
- Actualizar Ticket
- Agregar Componentes
- CRUD Completo

Ejecución:

```bash
npm run crud
```

---

# Suite Dashboard

Cobertura:

- KPIs
- Gráficos
- Filtros
- Validaciones visuales

Ejecución:

```bash
npm run dashboard
```

---

# Suite Reportes

Cobertura:

- Exportación Word

Ejecución:

```bash
npm run reportes
```

---

# Suite API + UI

Cobertura:

## API → UI

```text
API
↓
Crear Ticket
↓
UI
↓
Buscar Ticket
```

## API → UI → API

```text
API
↓
Crear Ticket
↓
UI
↓
Buscar Ticket
↓
Actualizar Ticket
↓
API
↓
Validar Persistencia
```

## CRUD Híbrido Completo

```text
API
↓
Create
↓
UI
↓
Read
↓
Update
↓
API
↓
Validate Update
↓
Delete
↓
Validate Delete
```

Ejecución:

```bash
npm run apiui
```

---

# Evidencias Automáticas

Playwright genera automáticamente:

## Screenshots

```text
only-on-failure
```

## Videos

```text
retain-on-failure
```

## Trace Viewer

```text
retain-on-failure
```

Visualización:

```bash
npx playwright show-trace trace.zip
```

---

# Limpieza Automática de Datos

La automatización implementa:

```text
Create Ticket
↓
Ejecutar Test
↓
Delete Ticket
```

mediante API para evitar contaminación de la base de datos.

Funciones utilizadas:

```javascript
createTicketByApi()
deleteTicketByApi()
getTicketById()
getTicketResponseById()
```

---

# Ejecución del Proyecto

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar todas las pruebas

```bash
npm test
```

---

## Ejecutar Smoke

```bash
npm run smoke
```

---

## Ejecutar Regression

```bash
npm run regression
```

---

## Ejecutar CRUD

```bash
npm run crud
```

---

## Ejecutar Dashboard

```bash
npm run dashboard
```

---

## Ejecutar Reportes

```bash
npm run reportes
```

---

## Ejecutar API + UI

```bash
npm run apiui
```

---

## Visualizar Reporte

```bash
npm run report
```

---

# Configuración de Entorno

## Frontend

```bash
npm run dev
```

URL:

```text
http://localhost:5173
```

---

## Backend

```bash
dotnet run
```

URL:

```text
http://localhost:5177
```

---

## Base de Datos

```text
SQL Server
```

---

# Integración Continua

GitHub Actions permite ejecutar automáticamente:

- Playwright
- Smoke Tests
- Regression Tests
- API Tests
- Reportes

en cada Push o Pull Request.

---

# Funcionalidades Validadas

✅ Crear Ticket

✅ Buscar Ticket

✅ Actualizar Ticket

✅ Agregar Componentes

✅ Dashboard

✅ KPIs

✅ Gráficos

✅ Exportación Word

✅ API Create

✅ API Read

✅ API Update

✅ API Delete

✅ API + UI Integration

✅ CRUD Híbrido Completo

✅ Limpieza Automática

✅ Screenshots Automáticos

✅ Videos Automáticos

✅ Trace Viewer

✅ GitHub Actions

---

# Proyecto Destacado

Este framework implementa escenarios híbridos API + UI con Playwright, integrando:

- Frontend React
- Backend .NET
- SQL Server
- APIs REST
- GitHub Actions

permitiendo validar el ciclo completo de vida de un Ticket de Garantía mediante automatización end-to-end.
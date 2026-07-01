# Garantias QA Automation

Framework de automatización desarrollado para validar la aplicación **GarantiasApp**, una solución de gestión de garantías implementada con React, .NET 8 y SQL Server.

## Objetivo

Automatizar las pruebas funcionales de la aplicación mediante pruebas End-to-End (E2E) y pruebas de API, garantizando la calidad de los principales procesos de negocio.

## Tecnologías Utilizadas

### UI Testing
- Playwright
- JavaScript
- Page Object Model (POM)

### API Testing
- Postman
- Newman

### Herramientas
- Git
- GitHub
- GitHub Actions
- Node.js

---

## Cobertura de Pruebas

### Pruebas UI Automatizadas (Playwright)

- Crear Ticket
- Buscar Ticket
- Actualizar Ticket
- Agregar Componente
- Dashboard
- Exportar Informe Word

### Pruebas API Automatizadas (Postman / Newman)

- GET /tickets
- POST /tickets
- GET /tickets/{id}
- PUT /tickets/{id}
- GET /tickets/buscar
- DELETE /tickets/{id}

---

## Estructura del Proyecto

```text
garantias-qa
│
├── pages
├── tests
├── postman
├── test-cases
├── gherkin
├── playwright.config.js
├── package.json
└── README.md
```

---

## Patrones Implementados

- Page Object Model (POM)
- Reutilización de componentes de prueba
- Variables de entorno
- Datos dinámicos para ejecución repetible
- Automatización CRUD completa

---

## Ejecución Local

### Playwright

```bash
npx playwright test
```

### Abrir interfaz Playwright

```bash
npx playwright test --ui
```

### Postman con Newman

```bash
newman run postman/Garantias_API.postman_collection.json -e postman/STM_Local_Docker.postman_environment.json
```

---

## Resultados Obtenidos

✅ Automatización E2E de los principales procesos de negocio.

✅ Automatización de pruebas API CRUD.

✅ Descarga y validación de documentos.

✅ Validación de dashboard y métricas.

✅ Ejecución de pruebas desde línea de comandos mediante Newman.

✅ Integración preparada para CI/CD con GitHub Actions.

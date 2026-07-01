# Garantias QA Automation

Framework de automatización desarrollado para validar el sistema GarantiasApp.

## Tecnologías

- Playwright
- Postman
- Newman
- JavaScript
- Node.js

## Casos Automatizados

### UI Testing

- Crear Ticket
- Buscar Ticket
- Actualizar Ticket
- Agregar Componente
- Dashboard
- Exportar Word

### API Testing

- GET Tickets
- POST Ticket
- GET Ticket por ID
- PUT Ticket
- Buscar Ticket
- DELETE Ticket

### Ejecución

Playwright:

npx playwright test

Newman:

newman run postman/Garantias_API.postman_collection.json -e postman/STM_Local_Docker.postman_environment.json
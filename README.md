# 🎯 Smart Hire AI - Sistema de Reclutamiento Inteligente

Sistema de reclutamiento con inteligencia artificial que conecta empresas con candidatos ideales.

## 🚀 Inicio Rápido

### Configuración del Backend

1. **Configurar URL del Backend**
   ```bash
   # El archivo .env ya está creado con:
   VITE_API_URL=http://localhost:8000
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el frontend**
   ```bash
   npm run dev
   ```

El frontend estará disponible en: **http://localhost:5173**

### 📚 Documentación de Integración

- **[INICIO_RAPIDO.md](INICIO_RAPIDO.md)** - Guía rápida de 3 pasos
- **[CONFIGURACION_BACKEND.md](CONFIGURACION_BACKEND.md)** - Guía completa de configuración
- **[EJEMPLOS_USO.md](EJEMPLOS_USO.md)** - Ejemplos de código
- **[RESUMEN_INTEGRACION.md](RESUMEN_INTEGRACION.md)** - Resumen de integración
- **[CHECKLIST_INTEGRACION.md](CHECKLIST_INTEGRACION.md)** - Checklist de verificación

## ✨ Características

### Para Empresas
- ✅ Registro de empresa
- ✅ Creación de vacantes
- ✅ Generación automática de preguntas con IA
- ✅ Revisión y aprobación de preguntas
- ✅ Publicación de vacantes
- ✅ Ver aplicaciones recibidas

### Para Candidatos
- ✅ Búsqueda de vacantes con filtros
- ✅ Ver detalles de vacantes
- ✅ Aplicación con CV (PDF)
- ✅ Chatbot interactivo para entrevista
- ✅ Evaluación automática con IA
- ✅ Puntuación y compatibilidad

## 🔌 Endpoints Conectados

### Empresa
- `POST /api/empresa/registrar`
- `POST /api/empresa/crear-vacante`
- `POST /api/empresa/aprobar-preguntas`
- `GET /api/empresa/{empresaId}/aplicaciones`

### Vacantes
- `GET /api/vacantes/publicadas`
- `GET /api/vacantes/{vacanteId}/detalles`

### Candidato
- `POST /api/candidato/aplicar`
- `POST /api/candidato/responder`
- `POST /api/candidato/chatbot/iniciar`
- `POST /api/candidato/chatbot/siguiente`
- `POST /api/candidato/chatbot/finalizar`

## 🎯 Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/company` | Portal de empresas |
| `/candidate` | Portal de candidatos |

## Project info

**URL**: https://lovable.dev/projects/bae92cf7-2383-447f-85ca-07c6f10f44d1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bae92cf7-2383-447f-85ca-07c6f10f44d1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bae92cf7-2383-447f-85ca-07c6f10f44d1) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

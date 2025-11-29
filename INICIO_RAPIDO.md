# ⚡ Inicio Rápido - Conexión con Backend

## 🚀 3 Pasos para Empezar

### 1️⃣ Configurar URL del Backend

El archivo `.env` ya está creado con la configuración por defecto:

```env
VITE_API_URL=http://localhost:8000
```

Si tu backend está en otra URL, edita este archivo.

### 2️⃣ Instalar Dependencias (si es necesario)

```bash
npm install
```

### 3️⃣ Iniciar el Frontend

```bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

---

## ✅ Verificar que Funciona

### Opción 1: Probar Portal de Empresas

1. Ve a: **http://localhost:5173/company**
2. Completa el formulario de registro de empresa
3. Si ves un toast de éxito → ✅ **¡Funciona!**
4. Si ves un error → ⚠️ Verifica que el backend esté corriendo

### Opción 2: Probar Portal de Candidatos

1. Ve a: **http://localhost:5173/candidate**
2. Haz click en "Buscar"
3. Si ves vacantes → ✅ **¡Funciona!**
4. Si ves "No se encontraron vacantes" → ⚠️ Verifica que haya vacantes en el backend

---

## 🔍 Solución de Problemas

### ❌ Error: "Failed to fetch" o "Network Error"

**Causa**: El backend no está corriendo o la URL es incorrecta

**Solución**:
1. Verifica que el backend esté corriendo en `http://localhost:8000`
2. Prueba abrir `http://localhost:8000/docs` en tu navegador
3. Si no abre, inicia el backend
4. Si abre pero el frontend no conecta, verifica CORS en el backend

### ❌ Error: "CORS policy"

**Causa**: El backend no permite peticiones desde el frontend

**Solución**: Configura CORS en el backend para permitir:
```python
# En tu backend FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### ❌ Error: "404 Not Found"

**Causa**: El endpoint no existe en el backend

**Solución**:
1. Verifica que el backend tenga todos los endpoints implementados
2. Revisa la documentación del backend en `http://localhost:8000/docs`
3. Compara con los endpoints en `src/config/api.ts`

---

## 📚 Documentación Completa

- **`CONFIGURACION_BACKEND.md`** - Guía completa de configuración
- **`EJEMPLOS_USO.md`** - Ejemplos de código
- **`RESUMEN_INTEGRACION.md`** - Resumen de todo lo implementado

---

## 🎯 Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio |
| `/company` | Portal de empresas (registrar, crear vacantes) |
| `/candidate` | Portal de candidatos (buscar, aplicar) |

---

## 📞 ¿Necesitas Ayuda?

1. Revisa la consola del navegador (F12) para ver errores
2. Revisa los logs del backend
3. Verifica que todos los servicios estén corriendo
4. Lee la documentación completa en los archivos MD

---

## ✨ ¡Listo!

Si todo funciona correctamente, deberías poder:

- ✅ Registrar empresas
- ✅ Crear vacantes con IA
- ✅ Buscar vacantes
- ✅ Aplicar a vacantes con CV
- ✅ Responder preguntas en el chatbot
- ✅ Ver puntuaciones y compatibilidad

**¡Disfruta tu sistema de reclutamiento con IA!** 🎉

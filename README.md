# Sistema de Gestión de Proyectos - Innovación y Competitividad SENA

<div align="center">

![SENA Logo](./favicon_io/logoSena.png)

**Sistema integral para la gestión de convocatorias y proyectos de investigación e innovación del SENA**

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción General del Sistema](#-descripción-general-del-sistema)
- [Características Principales](#-características-principales)
- [Arquitectura Técnica](#-arquitectura-técnica)
- [Guía de Instalación](#-guía-de-instalación)
- [Manual de Usuario](#-manual-de-usuario)
- [Documentación Técnica](#-documentación-técnica)
- [Roles y Permisos](#-roles-y-permisos)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

---

## 🎯 Descripción General del Sistema

El **Sistema de Gestión de Proyectos - Innovación y Competitividad** es una plataforma web desarrollada para el Servicio Nacional de Aprendizaje (SENA) que permite gestionar de manera eficiente todo el ciclo de vida de las convocatorias y proyectos de investigación, desarrollo tecnológico e innovación.

### Objetivo Principal

Centralizar y optimizar la administración de proyectos de I+D+i, proporcionando herramientas para:
- Registro y seguimiento de convocatorias
- Gestión de usuarios e investigadores
- Control presupuestal y financiero
- Generación de reportes y análisis
- Asociación de investigadores a proyectos

### Alcance del Sistema

El sistema está diseñado para ser utilizado por diferentes roles dentro de la estructura organizacional del SENA, desde investigadores hasta administradores de alto nivel, facilitando la colaboración y el seguimiento de proyectos a nivel nacional.

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- Sistema de login con validación JWT
- Recuperación de contraseña por correo electrónico
- Cambio de contraseña seguro
- Verificación automática de sesión
- Validación de correos institucionales (@sena.edu.co)

### 📊 Gestión de Proyectos
- **Registro de convocatorias** con información completa:
  - Año, consecutivo y nombre
  - Centro de formación y región
  - Mecanismo de postulación
  - Estado del proyecto
  - Fechas de aprobación, inicio y fin
  - Presupuesto: solicitado, aprobado y diferencias
  - URLs y observaciones
- **Búsqueda y filtrado avanzado**:
  - Por año, nombre, estado
  - Por centro de formación
  - Por tipo de postulación
  - Por rangos de presupuesto
- **Edición y eliminación** (según permisos)
- **Asociación de usuarios** a proyectos
- **Plan de desarrollo financiero** por proyecto

### 👥 Gestión de Usuarios
- Listado completo de usuarios registrados
- Búsqueda por nombre, email o rol
- Modificación de roles (según permisos jerárquicos)
- Activación/desactivación de cuentas
- Perfiles de usuario detallados con:
  - Información personal y de contacto
  - Área de trabajo
  - Clasificación MinCiencias
  - Semillero de investigación
  - Centro de formación
  - Link CvLAC

### 📈 Reportes y Análisis
- Generación de reportes en formato Excel
- Filtros personalizables
- Descarga de datos de proyectos
- Visualización de proyectos por investigador

### 👤 Perfiles de Investigador
- Consulta de proyectos asociados
- Edición de información personal
- Registro de participación en proyectos
- Remoción de proyectos del perfil

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

#### Frontend
- **Framework**: React 19.2.0 con TypeScript
- **Build Tool**: Vite 6.x
- **UI Library**: HeroUI (NextUI v2) + Tailwind CSS 4.x
- **Routing**: React Router DOM 7.9.5
- **State Management**: Zustand 5.0.8
- **Form Management**: React Hook Form 7.15.0
- **HTTP Client**: Axios 1.13.1
- **Animations**: Framer Motion 12.23.24
- **Notifications**: Sonner 2.0.7
- **Icons**: React Icons 5.5.0

#### Herramientas de Desarrollo
- **Linter**: ESLint 9.x
- **Type Checking**: TypeScript 5.x
- **CSS Processing**: PostCSS + Tailwind

### Patrón de Arquitectura

El proyecto sigue una **arquitectura hexagonal (Clean Architecture)** dividida en capas:

```
src/
├── app/                    # Capa de Presentación
│   ├── home/              # Gestión de proyectos
│   ├── login/             # Autenticación
│   ├── register/          # Registro de usuarios
│   ├── users/             # Gestión de usuarios
│   ├── profiles/          # Perfiles de investigador
│   ├── reports/           # Generación de reportes
│   ├── admin/             # Activación de usuarios
│   ├── recover-password/  # Recuperación de contraseña
│   └── shared/            # Stores y componentes compartidos
│
├── core/                   # Capa de Dominio y Aplicación
│   ├── auth/              # Lógica de autenticación
│   │   ├── domain/        # Entidades e interfaces
│   │   ├── application/   # Casos de uso
│   │   └── infrastructure/# Repositorios
│   ├── convocatorias/     # Lógica de proyectos
│   ├── users/             # Lógica de usuarios
│   └── planFinanciero/    # Lógica de plan financiero
│
├── components/             # Componentes UI reutilizables
├── config/                # Configuración de la aplicación
├── layouts/               # Layouts de página
├── router/                # Configuración de rutas
├── styles/                # Estilos globales
└── types/                 # Tipos TypeScript globales
```

### Gestión de Estado

El sistema utiliza **Zustand** para la gestión de estado global, organizado en stores específicos:

- `auth.store.tsx`: Autenticación y sesión del usuario
- `convocatorias.store.tsx`: Estado de proyectos y convocatorias
- `users.store.tsx`: Estado de usuarios
- `planFinanciero.store.tsx`: Estado del plan financiero

### Comunicación con Backend

La comunicación se realiza mediante **Axios** con:
- Instancia configurada con interceptores
- Manejo automático de tokens JWT
- Timeout configurado
- Manejo centralizado de errores

---

## 🚀 Guía de Instalación

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 18.x
- **npm** >= 9.x (o yarn/pnpm/bun como alternativa)
- **Git** para clonar el repositorio

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/convocatorias-frontend.git
cd convocatorias-frontend
```

### Paso 2: Instalar Dependencias

Elige uno de los siguientes gestores de paquetes:

**Con npm:**
```bash
npm install
```

**Con yarn:**
```bash
yarn install
```

**Con pnpm:**
```bash
# Configurar pnpm (primera vez)
echo "public-hoist-pattern[]=*@heroui/*" >> .npmrc
pnpm install
```

**Con bun:**
```bash
bun install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# URL del backend
VITE_BACKEND_URL=http://localhost:3000/api

# Otras configuraciones (opcional)
VITE_APP_NAME=Convocatorias SENA
VITE_APP_VERSION=1.0.0
```

### Paso 4: Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El sistema estará disponible en: `http://localhost:5173`

### Paso 5: Compilar para Producción

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`

### Paso 6: Vista Previa de Producción

```bash
npm run preview
```

---

## 📖 Manual de Usuario

### 1. Inicio de Sesión

1. Accede a la página principal del sistema
2. Ingresa tu **correo institucional** (@sena.edu.co)
3. Ingresa tu **contraseña**
4. Haz clic en **"Iniciar Sesión"**

> 💡 **Nota**: Si olvidaste tu contraseña, usa la opción "Recuperar contraseña"

### 2. Recuperación de Contraseña

1. En la página de login, haz clic en **"¿Olvidaste tu contraseña?"**
2. Ingresa tu correo electrónico registrado
3. Recibirás un correo con un código de verificación
4. Ingresa el código y tu nueva contraseña
5. Confirma la nueva contraseña

### 3. Registro de Usuarios

1. Desde la página de inicio, haz clic en **"Registrarse"**
2. Completa el formulario con:
   - Nombre de usuario
   - Correo personal
   - Correo institucional (@sena.edu.co)
   - Teléfono
   - Rol (Investigador, Líder Investigador, Aprendiz, etc.)
   - Contraseña segura
3. Campos opcionales según el rol:
   - Área de trabajo
   - Clasificación MinCiencias
   - Link CvLAC
   - Semillero de investigación
   - Centro de formación
4. Haz clic en **"Registrarse"**
5. Espera la activación por parte de un administrador

### 4. Gestión de Proyectos

#### 4.1 Visualizar Proyectos

- Accede al menú **"Gestión de Proyectos"**
- Visualiza la tabla con todos los proyectos disponibles
- Usa el botón de filtros 🔍 para buscar proyectos específicos

#### 4.2 Filtrar Proyectos

1. Haz clic en el ícono de **filtros** 🔍
2. Selecciona los criterios de búsqueda:
   - **Año**: Filtrar por año de convocatoria
   - **Nombre**: Buscar por nombre del proyecto
   - **Estado**: Filtrar por estado (Aprobado, En curso, Finalizado, etc.)
   - **Centro de Formación**: Seleccionar centro específico
   - **Mecanismo**: Tipo de postulación
3. Haz clic en **"Aplicar"** o presiona Enter
4. Para limpiar filtros, usa el botón de **borrador** 🗑️

#### 4.3 Subir un Nuevo Proyecto (Dinamizadores, Líderes, Coordinadores)

1. En la página principal, haz clic en **"Subir Proyecto"** ⬆️
2. Completa el formulario:
   - **Año**: Año de la convocatoria
   - **Convocatoria**: Número de convocatoria
   - **Consecutivo**: Código único del proyecto
   - **Centro de Formación**: Selecciona el centro
   - **Mecanismo**: Tipo de postulación
   - **Estado**: Estado actual del proyecto
   - **Nombre**: Título del proyecto
   - **Presupuesto**:
     - Valor solicitado
     - Valor aprobado
     - Diferencia presupuestal
   - **Fechas**:
     - Fecha de aprobación
     - Fecha de inicio
     - Fecha de finalización
   - **URL**: Link del proyecto (si aplica)
   - **Observaciones**: Notas adicionales
3. Haz clic en **"Guardar"**

#### 4.4 Editar un Proyecto

1. En la tabla de proyectos, localiza el proyecto a editar
2. Haz clic en el ícono de **edición** ✏️ (botón amarillo)
3. Modifica los campos necesarios en el formulario
4. Haz clic en **"Actualizar"**

#### 4.5 Eliminar un Proyecto

1. En la tabla de proyectos, localiza el proyecto a eliminar
2. Haz clic en el ícono de **eliminación** 🗑️ (botón rojo)
3. Confirma la eliminación en el diálogo

> ⚠️ **Advertencia**: Esta acción no se puede deshacer

#### 4.6 Ver Plan de Desarrollo Financiero

1. En la tabla de proyectos, haz clic en el ícono de **calendario** 📅
2. Se abrirá una vista detallada con:
   - Información del proyecto
   - Plan de desarrollo financiero
   - Cronograma de actividades

### 5. Gestión de Usuarios

#### 5.1 Listar Usuarios (Dinamizadores y superiores)

1. Accede al menú **"Gestión de Usuarios"**
2. Visualiza la tabla con todos los usuarios registrados
3. Información mostrada:
   - Nombre de usuario
   - Email institucional
   - Rol
   - Estado (Activo/Inactivo)

#### 5.2 Buscar Usuarios

1. En la página de usuarios, usa el campo de **búsqueda**
2. Filtra por:
   - Nombre de usuario
   - Email
   - Rol específico
3. Los resultados se actualizan automáticamente

#### 5.3 Activar Usuarios (Administradores)

1. Accede a **"Activar Usuarios"** desde el menú
2. Visualiza usuarios pendientes de activación
3. Haz clic en **"Activar"** para aprobar el registro

#### 5.4 Cambiar Rol de Usuario

1. En la lista de usuarios, haz clic en **"Cambiar Rol"**
2. Selecciona el nuevo rol del menú desplegable
3. Confirma el cambio

> 📌 **Restricciones de permisos**:
> - Super Administradores: Pueden modificar cualquier rol
> - Dinamizadores: No pueden modificar Super Administradores
> - Líderes Investigadores: Solo modifican Investigadores

### 6. Perfil de Usuario

#### 6.1 Ver Perfil Propio

1. Haz clic en tu nombre de usuario en la barra superior
2. Selecciona **"Mi Perfil"**
3. Visualiza tu información personal y proyectos asociados

#### 6.2 Editar Perfil

1. En tu perfil, haz clic en **"Editar mis datos"** ✏️
2. Modifica los campos editables:
   - Nombre de usuario
   - Teléfono
   - Área de trabajo
   - Clasificación MinCiencias
   - Link CvLAC
   - Semillero de investigación
   - Centro de formación
3. Haz clic en **"Guardar"** ✔️
4. Para cancelar cambios, haz clic en **"Cancelar"** ✖️

#### 6.3 Registrar Participación en Proyectos

1. Desde tu perfil, haz clic en **"Agregar Proyectos"**
2. Se abrirá un modal con la lista de proyectos disponibles
3. **Selecciona** los proyectos en los que participaste (selección múltiple)
4. Haz clic en **"Guardar"**
5. Los proyectos aparecerán en la lista de **"Proyectos en los que he participado"**

#### 6.4 Remover Proyectos del Perfil

1. En la sección **"Proyectos en los que he participado"**
2. Localiza el proyecto a remover
3. Haz clic en **"Remover este proyecto de mi perfil"**
4. El proyecto se eliminará de tu lista inmediatamente

#### 6.5 Consultar Perfil de Otro Usuario

1. Desde **"Gestión de Usuarios"**, haz clic en un nombre de usuario
2. Visualiza la información pública del usuario
3. Consulta los proyectos en los que ha participado

### 7. Generación de Reportes

#### 7.1 Generar Reporte de Proyectos

1. Accede a **"Reportes"** → **"Proyectos"**
2. Configura los filtros deseados (opcional)
3. Haz clic en **"Descargar Reporte"** 📥
4. El sistema generará un archivo Excel con:
   - Listado de proyectos filtrados
   - Información completa de cada proyecto
   - Totales y estadísticas

---

## 📚 Documentación Técnica

### Estructura de Componentes

#### Componentes Principales

**ConvocatoriasTable**
- **Ubicación**: `src/app/home/components/ConvocatoriasTable.tsx`
- **Propósito**: Tabla principal para visualizar proyectos
- **Props**:
  - `mode`: `"home" | "profile" | "profileConsult"`
  - `isOwnProfile`: `boolean`
- **Características**:
  - Paginación automática
  - Selección múltiple en modo "profile"
  - Acciones contextuales según el modo y rol
  - Visualización responsive

**Filters**
- **Ubicación**: `src/app/home/components/Filters.tsx`
- **Propósito**: Panel de filtros avanzados
- **Props**:
  - `filtros`: Objeto con valores actuales
  - `onChange`: Callback para cambios
  - `onReset`: Callback para limpiar filtros
  - `showDownload`: Mostrar botón de descarga

**UploadConvocatoriaForm**
- **Ubicación**: `src/app/home/components/UploadConvocatoriaForm.tsx`
- **Propósito**: Formulario para crear/editar proyectos
- **Características**:
  - Validación de campos
  - Manejo de fechas
  - Cálculo automático de diferencias presupuestales

#### Hooks Personalizados

**useConvocatorias**
```typescript
// src/app/home/hooks/UseConvocatorias.tsx
export const useConvocatorias = () => {
  const {
    convocatorias,
    profileConvocatorias,
    loading,
    filterLoading,
    searchConvocatorias,
    getAllConvocatorias,
    generarReporte
  } = useConvocatoriasStore();
  
  return {
    convocatorias,
    profileConvocatorias,
    loading,
    filterLoading,
    searchConvocatorias,
    getAllConvocatorias,
    generarReporte
  };
};
```

**useProfile**
```typescript
// src/app/profiles/hooks/useProfile.tsx
export const useProfile = () => {
  // Gestión del estado del perfil
  // Validación de datos
  // Operaciones de guardado y cancelación
  
  return {
    singleUser,
    loading,
    isEditing,
    setIsEditing,
    profileData,
    setProfileData,
    handleSave,
    handleCancel,
    errors,
    user
  };
};
```

### Stores (Zustand)

#### Auth Store

```typescript
// src/app/shared/auth.store.tsx
interface AuthState {
  user: ILoginRes | null;
  token: string | null;
  loginError: string | null;
  role: string | null;
}

interface AuthActions {
  login: (data: ILoginReq) => Promise<void>;
  register: (data: IRegisterReq) => Promise<void>;
  verify: () => Promise<IVerifyRes | null>;
  logout: () => void;
  recoverPassword: (data: IForgotPasswordRequest) => Promise<void>;
  changePassword: (data: IForgotPasswordRequest) => Promise<void>;
  activateUser: (email: string) => Promise<void>;
}
```

#### Convocatorias Store

```typescript
// src/app/shared/convocatorias.store.tsx
interface ConvocatoriasState {
  convocatorias: IGetAllConvocatoriasRes[];
  profileConvocatorias: IGetAllConvocatoriasRes[];
  singleConvocatoria: IGetAllConvocatoriasRes | null;
  loading: boolean;
  error: string | null;
  filterLoading: boolean;
}

interface ConvocatoriasActions {
  getAllConvocatorias: () => Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatoria: (data: IUploadConvocatoriaReq) => Promise<void>;
  searchConvocatorias: (data: ISearchConvocatoriasReq) => Promise<void>;
  deleteConvocatorias: (id: string) => Promise<void>;
  getSingleConvocatoria: (id: string) => Promise<IGetAllConvocatoriasRes>;
  patchConvocatorias: (id: string, data: IPatchConvocatoriasReq) => Promise<void>;
  downloadReport: (data: ISearchConvocatoriasReq) => Promise<void>;
  addUserToConvocatoria: (data: IAddUserToConvocatoriaReq) => Promise<void>;
  removeUserFromConvocatoria: (data: IRemoveUserFromConvocatoriaReq) => Promise<void>;
  searchProfileConvocatorias: (data: ISearchConvocatoriasReq) => Promise<void>;
  clearProfileConvocatorias: () => void;
}
```

### Rutas Protegidas

El sistema implementa protección de rutas mediante los componentes:

**ProtectedRoute**
```typescript
// src/router/ProtectedRoute.tsx
// Verifica token y redirige a login si no está autenticado
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/" replace />;
  }
  
  return <DefaultLayout>{children}</DefaultLayout>;
};
```

**PublicRoute**
```typescript
// src/router/PublicRoute.tsx
// Redirige a /home si ya está autenticado
export const PublicRoute = ({ children }) => {
  const { user } = useAuthStore();
  const token = localStorage.getItem("token");
  
  if (token && user) {
    return <Navigate to="/home" replace />;
  }
  
  return <>{children}</>;
};
```

### Configuración de Axios

```typescript
// src/config/axios/instance.ts
import axios from 'axios';
import { BACKEND_URL } from './config';

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Sesión expirada
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
```

### Tipos TypeScript Principales

```typescript
// Proyecto
interface IGetAllConvocatoriasRes {
  _id: string;
  convocatoria: number;
  consecutivo: string;
  direccion_oficina_regional: string;
  tipo_postulacion: string;
  nuevo_estado: string;
  nombre: string;
  fecha_aprobacion: string | null;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  observaciones: string | null;
  user_id: number;
  url: string;
  valor_solicitado: number;
  valor_aprobado: number;
  diferencia_presupuesto: number;
  users?: string[];
}

// Usuario
interface ILoginRes {
  token: string;
  userId: string;
  role: string;
  username: string;
}

// Perfil de usuario
interface IGetSingleUserRes {
  _id: string;
  username: string;
  email: string;
  telefono: string;
  areaDeTrabajo: string;
  clasificacionMinCiencias: string;
  CvLAC: string;
  SemilleroInvestigacion: string;
  centroDeFormacion: string;
  SENAemail: string;
  role: string;
  estado: string;
}
```

### Scripts Disponibles

```json
{
  "dev": "vite",                // Inicia servidor de desarrollo
  "build": "vite build",        // Compila para producción
  "lint": "eslint --fix",       // Ejecuta linter y corrige
  "preview": "vite preview"     // Vista previa de build
}
```

### Optimizaciones

- **Code Splitting**: Rutas cargadas de forma lazy
- **Tree Shaking**: Eliminación de código no utilizado
- **Minificación**: Compresión de assets en producción
- **Caching**: Estrategia de cache para assets estáticos

---

## 👥 Roles y Permisos

### Jerarquía de Roles

```
Super Administrador (superadmin)
    ├── Dinamizador (dinamizador)
    │   ├── Líder Investigador (Linvestigador)
    │   │   └── Investigador (investigador)
    │   ├── Supervisor (admin)
    │   └── Aprendiz (aprendiz)
    └── Coordinador (coordinador)
```

### Matriz de Permisos

| Funcionalidad | Superadmin | Dinamizador | Líder Inv. | Coordinador | Investigador | Supervisor | Aprendiz |
|--------------|------------|-------------|------------|-------------|--------------|------------|----------|
| Ver proyectos | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Crear proyecto | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Editar proyecto | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Eliminar proyecto | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver plan financiero | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver usuarios | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Activar usuarios | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Cambiar roles | ✅ | ✅* | ✅** | ❌ | ❌ | ❌ | ❌ |
| Generar reportes | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Editar perfil propio | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Agregar proyectos a perfil | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

\* No puede modificar Super Administradores  
\** Solo puede modificar Investigadores

---

## 🤝 Contribución

### Flujo de Trabajo

1. **Fork** del repositorio
2. Crear una **rama** para tu feature:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Commit** de cambios:
   ```bash
   git commit -m "Add: Nueva funcionalidad"
   ```
4. **Push** a la rama:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Crear un **Pull Request**

### Convenciones de Código

- Usar **TypeScript** en todos los archivos
- Seguir las reglas de **ESLint**
- Componentes con **nombres en PascalCase**
- Hooks con prefijo **"use"**
- Stores con sufijo **".store.tsx"**
- Comentarios en español para lógica de negocio

### Commits Semánticos

```
feat: Nueva característica
fix: Corrección de bug
docs: Cambios en documentación
style: Formato, punto y coma faltante, etc.
refactor: Refactorización de código
test: Agregar tests
chore: Actualizar dependencias
```

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

---

## 📞 Soporte

Para soporte técnico o reportar problemas:
- **Email**: seguimientoidiregionalcauca@gmail.com
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/convocatorias-frontend/issues)

---

## 🔄 Historial de Versiones

### Versión 1.0.0 (Actual)
- ✅ Sistema de autenticación completo
- ✅ Gestión de proyectos (CRUD)
- ✅ Gestión de usuarios y roles
- ✅ Perfiles de investigador
- ✅ Generación de reportes
- ✅ Plan de desarrollo financiero
- ✅ Filtros avanzados
- ✅ Asociación de usuarios a proyectos

---

<div align="center">

**Desarrollado con ❤️ para el SENA**

[🏠 Inicio](#sistema-de-gestión-de-proyectos---innovación-y-competitividad-sena) • [📖 Documentación](#-tabla-de-contenidos) • [🚀 Instalación](#-guía-de-instalación)

</div>

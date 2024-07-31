# Aplicación de Gestión de Tareas

## Descripción del Proyecto

Esta es una aplicación de gestión de tareas desarrollada como parte de una prueba técnica para un puesto de Desarrollador Junior. La aplicación permite a los usuarios gestionar sus tareas diarias con funcionalidades para crear, ver, editar y eliminar tareas.

## Tecnologías Utilizadas

- **Frontend**: Next.js
- **Estilización**: Tailwind UI
- **Backend API**: Node.js y Express
- **ORM**: Prisma
- **Base de Datos**: SQLite

## Funcionalidades

1. **Gestión de Tareas**:
   - Crear una nueva tarea.
   - Ver la lista de tareas.
   - Editar una tarea existente.
   - Eliminar una tarea.

2. **Interfaz de Usuario**:
   - Diseño responsivo utilizando Tailwind UI.
   - Interfaz clara y fácil de usar.
   - Creación de usuarios.

3. **Base de Datos**:
   - Prisma para interactuar con la base de datos.
   - Modelo de datos para las tareas y los usuarios.
   - Almacenamiento de las tareas en una base de datos relacional.

4. **Bonus**:
   - Mostrar la lista de tareas creadas en un componente de calendario.

## Requisitos Previos

- Node.js (v18 o superior)
- npm (v6 o superior) o yarn

## Instrucciones para Ejecutar el Proyecto

1. **Clonar el Repositorio**

   ```sh
   git clone https://github.com/AncizarTorres19/task-manager-app.git
   cd task-manager

2. **Instalar Dependencias**

   ```sh
    npm install
    # o
    yarn install

3. **Configurar Prisma Inicializar Prisma y la base de datos**

   ```sh
    npx prisma migrate dev --name init


4. **Crear el Archivo `.env`**

   ```sh
    npm run dev
    # o
    yarn dev

5. **Ejecutar el Proyecto**

Debes crear un archivo `.env` en la raíz del proyecto. Un archivo de ejemplo `.env.example` está disponible en el repositorio. El contenido del archivo `.env` debe ser similar a:

   ```sh
    NEXT_PUBLIC_API_BASE_URL="http://localhost:3001/api/"

6. **Abrir en el Navegador Ve a http://localhost:3000 para ver la aplicación en funcionamiento.**
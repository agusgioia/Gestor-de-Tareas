# Frontend - Gestor de Tareas (Clon Trello)

Este proyecto es el frontend desarrollado en React para un gestor de tareas estilo Trello. La interfaz consume una API backend desplegada y utiliza Firebase para la autenticación.

---

## Tecnologías usadas

- React
- Firebase Authentication
- Axios (cliente HTTP para consumir la API)
- Netlify (despliegue) : https://gestordeproyectosytareas.netlify.app

---

## Configuración de variables de entorno

Para mantener seguras las credenciales de Firebase, la configuración se debe manejar con variables de entorno.

1. Crea un archivo `.env` en la raíz del proyecto.
2. Agrega las variables con prefijo `REACT_APP_` así:

REACT_APP_FIREBASE_API_KEY=tu_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=tu_database_url
REACT_APP_FIREBASE_PROJECT_ID=tu_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=tu_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=tu_measurement_id


3. Asegúrate de tener `.env` listado en tu `.gitignore` para no subirlo a GitHub.

4. En el código, usa `process.env.REACT_APP_FIREBASE_API_KEY` para acceder a cada variable.

---

## Instalación y ejecución local

```bash
npm install
npm start

IMPORTANTE: Consume una API desarrollada en Spring Boot desplegada en Render y si está sin uso un tiempo prolongado entra en un estado de "pausa", así que la primera petición a la API puede que tarde un poco.

🍽️ Grand Central – Frontend (React)

Frontend desarrollado en React para la plataforma Grand Central, una aplicación donde los usuarios pueden explorar restaurantes, crear platos, dejar reseñas, ver votaciones y mucho más.
Este proyecto consume la API desarrollada en Java Spring Boot.

🚀 Tecnologías utilizadas
React 18
React Router DOM
Axios
Context API
SweetAlert2
LocalStorage para tokens y sesión

⚙️ Instalación y ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/lu2311/grand_central_frontend.git
cd grand-central-frontend

2️⃣ Instalar dependencias
npm install

3️⃣ Configurar variables de entorno

Crear un archivo .env en la raíz con:
REACT_APP_BACKEND_URL=http://localhost:8080
Cambiar por la URL real cuando se despliegue en producción.

▶️ Ejecutar en modo desarrollo
npm start
Aplicación disponible en:
http://localhost:3000

📦 Generar build de producción
npm run build

🔌 Conexión con el backend
El proyecto consume la API del backend para:
Gestión de usuarios (login, registro)
Restaurantes
Platos (con subida de imágenes a Cloudinary)
Comentarios
Votaciones y resultados
Historial de votaciones
Dashboard del administrador
La comunicación se realiza mediante Axios usando el archivo ubicado en src/api/.

🔐 Autenticación
Basada en JWT enviado desde el backend.
El token se guarda en localStorage.

Axios automáticamente agrega el token en cada request.

🛠️ Scripts útiles
npm start       # Inicia el servidor de desarrollo
npm run build   # Genera build de producción
npm run test    # Ejecuta pruebas (si existen)

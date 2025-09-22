import express from 'express';
import cors from 'cors';

import { connectToDatabase } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import { ActorRoutes } from './src/actor/routes.js';

const { urlencoded } = express;
const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// Ruta raíz (para que no salga "Cannot GET /")
app.get('/', (req, res) => {
  res.status(200).send('Servidor funcionando 🚀. Bienvenido a la API del cine Iplacex.');
});

// Rutas de la API
app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

// Mensaje de bienvenida si alguien entra a /api directamente
app.get('/api', (req, res) => {
  res.status(200).send('Bienvenido a la API del cine Iplacex. Usa /api/actores o /api/peliculas');
});

// Conexión a la BD y levantamiento del servidor
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo iniciar el servidor:', err);
  });

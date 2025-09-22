import express from 'express';
import cors from 'cors';

import { connectToDatabase } from './src/common/db.js';
import peliculaRoutes from './src/pelicula/routes.js';
import { ActorRoutes } from './src/actor/routes.js';

const { urlencoded } = express;

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

app.get('/api', (req, res) => {
  res.status(200).send('Bienvenido a la API del cine Iplacex');
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('No se pudo iniciar el servidor:', err);
  });

import cors from 'cors'
import express, {urlencode} from 'express'
import { connectToDatabase } from './common/db.js';
import peliculaRoutes from './pelicula/routes.js';
import { ActorRoutes } from './actor/routes.js';




const PORT = process.env.PORT || 3000;

const app = express()

app.use('/api', peliculaRoutes);
app.use('/api', ActorRoutes);

app.use(express.json())
app.use(urlencode({extended: true}))
app.use(cors())

app.use('/api', (req, res) => {
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

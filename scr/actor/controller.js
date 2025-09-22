import { Actor } from './actor.js';
import { client } from '../common/db.js';
import { ObjectId } from 'mongodb';

const actorCollection = client.db().collection('actores');
const peliculaCollection = client.db().collection('peliculas');


export async function handleInsertActorRequest(req, res) {
  try {
    const nuevoActor = {
      idPelicula: req.body.idPelicula,
      nombre: req.body.nombre,
      edad: req.body.edad,
      estaRetirado: req.body.estaRetirado,
      premios: req.body.premios
    };

    const peliculaExiste = await peliculaCollection.findOne({ _id: new ObjectId(nuevoActor.idPelicula) });

    if (!peliculaExiste) {
      return res.status(400).json({ error: 'La película asociada no existe.' });
    }

    await actorCollection.insertOne(nuevoActor);
    res.status(201).json({ mensaje: 'Actor agregado correctamente' });
  } catch (err) {
    console.error('Error al insertar actor:', err);
    res.status(500).json({ error: 'Error al insertar actor' });
  }
}

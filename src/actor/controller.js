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
// Obtener todos los actores
export async function handleGetActoresRequest(req, res) {
  try {
    const actores = await actorCollection.find().toArray();
    res.status(200).json(actores);
  } catch (err) {
    console.error('Error al obtener actores:', err);
    res.status(500).json({ error: 'Error al obtener actores' });
  }
}

// Obtener actor por ID
export async function handleGetActorByIdRequest(req, res) {
  try {
    const { id } = req.params;
    const actor = await actorCollection.findOne({ _id: new ObjectId(id) });

    if (!actor) {
      return res.status(404).json({ error: 'Actor no encontrado' });
    }

    res.status(200).json(actor);
  } catch (err) {
    console.error('Error al obtener actor por ID:', err);
    res.status(500).json({ error: 'Error al obtener actor' });
  }
}

// Obtener actores por ID de película
export async function handleGetActoresByPeliculaIdRequest(req, res) {
  try {
    const { id } = req.params;
    const actores = await actorCollection.find({ idPelicula: id }).toArray();

    if (actores.length === 0) {
      return res.status(404).json({ error: 'No hay actores para esta película' });
    }

    res.status(200).json(actores);
  } catch (err) {
    console.error('Error al obtener actores por película:', err);
    res.status(500).json({ error: 'Error al obtener actores por película' });
  }
}

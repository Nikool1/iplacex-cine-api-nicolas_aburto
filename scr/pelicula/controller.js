import { Pelicula } from './pelicula.js';
import { client } from '../common/db.js';
import { ObjectId } from 'mongodb';



const peliculaCollection = client.db().collection("peliculas");

export async function handleInsertPeliculaRequest(req, res) {
  try {
    const nueva = {
      nombre: req.body.nombre,
      géneros: req.body.géneros,
      anioEstreno: req.body.anioEstreno
    };
    await peliculaCollection.insertOne(nueva);
    res.status(201).json({ mensaje: 'Película agregada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar película' });
  }
}

export async function handleGetPeliculasRequest(req, res) {
  try {
    const peliculas = await peliculaCollection.find().toArray();
    res.status(200).json(peliculas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
}

export async function handleGetPeliculaByIdRequest(req, res) {
  try {
    const id = req.params.id;
    const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(id) });
    if (!pelicula) return res.status(404).json({ error: 'Película no encontrada' });
    res.status(200).json(pelicula);
  } catch (err) {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

export async function handleUpdatePeliculaByIdRequest(req, res) {
  try {
    const id = req.params.id;
    const result = await peliculaCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: req.body }
    );
    res.status(200).json({ mensaje: 'Película actualizada' });
  } catch (err) {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

export async function handleDeletePeliculaByIdRequest(req, res) {
  try {
    const id = req.params.id;
    const result = await peliculaCollection.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json({ mensaje: 'Película eliminada' });
  } catch (err) {
    res.status(400).json({ error: 'ID mal formado' });
  }
}

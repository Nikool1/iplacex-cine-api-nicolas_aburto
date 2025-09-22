import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://ev3_express:Nicolas1@cluster-express.vvntfdl.mongodb.net/cine-db?retryWrites=true&w=majority&appName=cluster-express';
const client = new MongoClient(uri);

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error al conectar a MongoDB:', err);
    throw err;
  }
}

export { client };

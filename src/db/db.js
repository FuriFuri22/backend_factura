import mongoose from "mongoose";

//coneccion a base de datos de Mongo

export const connectDB = async(nameDB, passwordDB)=>{
    try{
        await mongoose.connect(`mongodb+srv://${nameDB}:${passwordDB}@cluster0.rdct6x6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Conectado a MongoDB');
    } catch (err){
        console.log('Error al intentar conectar con MongoDB', err);
        process.exit(1); //si no se establece la coneccion se detiene la aplicacion
    }
}
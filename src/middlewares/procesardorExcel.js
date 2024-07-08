import multer from "multer";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Definir carpeta de archivos subidos

const uploadsDir = path.join(__dirname, '..', 'uploads');

//Si la carpeta no existe, la crea
(!fs.existsSync(uploadsDir)) && fs.mkdirSync(uploadsDir, {recursive: true});

//Se configura almacenamient de multer

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, uploadsDir);
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

//exportar instancia de multer 

export const upload = multer({
    storage: storage
});
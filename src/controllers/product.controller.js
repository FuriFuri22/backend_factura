import { Repuesto } from "../models/repuesto.model.js";
import { parsersF } from "../helpers/parsers.js";
import xlsx from 'xlsx';

export const uploadProducts = async(req, res)=>{
    try{
        const filePath = req.file.path;
        const workBook = xlsx.readFile(filePath);

        const sheetNames = workBook.SheetNames;

        const parsers = {
            'Repuestos': parsersF.parseRepuestos
        }

        const models = {
            'Repuestos': Repuesto
        }

        for(const sheetName of sheetNames){
            const trimmedSheetName = sheetName.trim();
            const sheet = workBook.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet, {
                header: 1
            });
            const parser = parsers[trimmedSheetName];
            const model = models[trimmedSheetName];
            
            if(parser && model){
                const productToInsert = parser(data);

                if (!Array.isArray(productToInsert)) {
                    throw new Error('El parser no devolvió un arreglo');
                }

                const filteredProducts = productToInsert.filter(product => product.name);
                console.log(`Productos a insertar para ${trimmedSheetName}:`, filteredProducts);

                if (filteredProducts.length > 0) {
                    try {
                        await model.insertMany(filteredProducts);
                        console.log(`Productos insertados para ${trimmedSheetName}`);
                    } catch (dbErr) {
                        console.error(`Error al insertar productos en la base de datos para ${trimmedSheetName}:`, dbErr);
                    }
                } else {
                    console.log(`No hay productos válidos para insertar en ${trimmedSheetName}`);
                }
                  } else {
                console.log(`No se encontró un parser o modelo válido para ${trimmedSheetName}`);
                 }
                
            
        }
        res.status(200).send({
            message: 'Productos subidos exitosamente'
        });
    }catch(err){
        console.error(`Fallo la carga de productos:`, err);
        res.status(500).send({
            message: 'Error al subir los productos', err
        });
    }
};

export const getAllProducts = (model)=> async(req, res)=>{
    try{
        const products = await model.find();
        res.status(200).json(products);
    }catch(err){
        res.status(500).jsn({
            message: 'Error al consltar productos', err
        });
    }
};

export const getProductById = (model) => async(req, res)=>{
    try {
        const product = await model.findById(req.params.id);
        if(!product){ 
            return res.status(404).json({
             message: 'Producto no encontrado'
            });
        }
        res.status(200).json({
            product
        });
    } catch (error) {
        res.status(500).jsn({
            messaje: 'Error al buscar producto', error
        });
    }
};


import { Router } from "express";
import { uploadProducts,
    getAllProducts,
    getProductById
 } from "../controllers/product.controller.js";
import { upload } from "../middlewares/procesardorExcel.js";
import { Repuesto } from "../models/repuesto.model.js";


const router = Router();

router.post(
    '/upload', 
    upload.single('file'), 
    uploadProducts
);

router.get(
    '/repuestos',
    getAllProducts(Repuesto)
);

router.get(
    '/repuestos/:id',
    getProductById(Repuesto)
);

export const ProductRouter = router

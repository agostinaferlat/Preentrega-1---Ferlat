import { Router } from "express";
import { checkProductData } from "../middlewares/middlewares.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js"
import productsControllers from "../controllers/products.controllers.js";


const router = Router();

// Para traer todos los productos
router.get("/", passportCall ("jwt"), productsControllers.getAllProducts);

//Para traer un producto particular (en base a su ID)
router.get("/:pid", productsControllers.getProductById);


//Para crear un nuevo producto
router.post("/", passportCall("current"), authorization("admin"), checkProductData, productsControllers.createProduct);

//Para modificar propiedades de un producto existente a través del body
router.put("/:pid", passportCall("current"), authorization("admin"), productsControllers.updateProduct);

//Para eliminar un producto (pasa su status a false en la base de datos)
router.delete("/:pid", passportCall("current"), authorization("admin"), productsControllers.deleteProduct);






export default router;

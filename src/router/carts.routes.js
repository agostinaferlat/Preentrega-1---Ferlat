import { Router } from "express";
import { checkCartAndProductIds, checkQuantity, isUserCart } from "../middlewares/middlewares.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

// Para crear un nuevo carrito
router.post("/", cartsControllers.createCart);

// Trae un carrito por su ID
router.get ("/:cid", cartsControllers.getCartById);

//Agrega un producto a un carrito específico
router.post ("/:cid/product/:pid", passportCall ("current"), authorization("user"), checkCartAndProductIds, cartsControllers.addProductToCart);

//Para actualizar cantidad del producto en el carrito a través del body
router.put("/:cid/product/:pid", passportCall ("current"), authorization("user"), checkCartAndProductIds, checkQuantity, cartsControllers.updateProductQuantity);

//Para eliminar un producto del carrito en base a su cantidad (borra de a uno, cuando queda uno se borra el producto)
router.delete("/:cid/product/:pid", passportCall ("current"), authorization("user"), checkCartAndProductIds, cartsControllers.deleteProductInCart);

//Para vaciar el carrito de productos
router.delete ("/:cid", authorization("user"), cartsControllers.deleteAllProductsInCart);


//Para obtener ticket de compra
router.get ("/:cid/purchase", passportCall ("jwt"), authorization("user"), isUserCart, cartsControllers.purchaseCart);

export default router; 
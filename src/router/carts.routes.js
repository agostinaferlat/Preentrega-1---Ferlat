import { Router } from "express";
import cartDao from "../dao/MongoDB/cart.dao.js";
import productDao from "../dao/MongoDB/product.dao.js";
import { checkCartAndProductIds, checkQuantity } from "../middlewares/middlewares.js";

const router = Router();

// Para crear un nuevo carrito
router.post("/", async(req, res) =>{
    try {
        const cart = await cartDao.create();

        res.status(201).json({status:"success", cart});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});   
    }
})

// Trae un carrito por su ID
router.get ("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        if (!cart) return res.status (404).json ({status: "Error", msg: "Carrito no encontrado"});

        res.status (200).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Error interno del servidor"});
    }
});

//Agrega un producto a un carrito específico
router.post ("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const product = await productDao.getById(pid);

        if (!product) return res.status (404).json ({status: "Error", msg: `No se encontró el producto con el ID ${pid}`});
        
        const cart = await cartDao.getById(cid);
        if (!cart) return res.status (404).json ({status: "Error", msg: `No se encontró el carrito con el ID ${cid}}`});

        const cartUpdate = await cartDao.addProductToCart(cid, pid);
        
        res.status (200).json({status: "success", payload: cartUpdate});

    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Error interno del servidor"});
    }
});

//Para actualizar cantidad del producto en el carrito a través del body
router.put("/:cid/product/:pid", checkCartAndProductIds, checkQuantity, async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cartUpdate = await cartDao.updateQuantityProductInCart(cid, pid, Number(quantity));

        res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

//Para eliminar un producto del carrito en base a su cantidad (borra de a uno, cuando queda uno se borra el producto)
router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const product = await productDao.getById(pid);
        if (!product) {
            return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el ID ${pid}` });
        }
        
        const cart = await cartDao.getById(cid);
        if (!cart) {
            return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el ID ${cid}` });
        }

        const cartUpdate = await cartDao.deleteProductInCart(cid, pid);
        
        res.status(200).json({ status: "success", payload: cartUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
});

//Para vaciar el carrito de productos
router.delete ("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartDao.clearProductsInCart(cid);
        if (!cart) return res.status (404).json ({status: "Error", msg: "Carrito no encontrado"});

        res.status (200).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Error interno del servidor"});
    }
});

export default router; 
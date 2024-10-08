import { request, response } from "express";
import productRepository from "../persistence/MongoDB/product.repository.js";
import cartRepository from "../persistence/MongoDB/cart.repository.js";

export const checkProductData = async (req = request, res = response, next) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category
        };
        
        const productExists = await productRepository.checkProductByCode(code);
        if (productExists){
            return res.status(400).json({status:"Error", msg:`El producto con el código ${code} ya existe`});
        } 
        
        const checkData = Object.values (newProduct).includes (undefined);
        if (checkData) return res.status(400).json({status:"Error", msg:"Todos los campos son obligatorios"});

        next();



    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Internal server error"});
    }
};

//Middleware que chequea que el cid y el pid sean correctos en el endpoint para actualizar la cantidad de un producto en el carrito
export const checkCartAndProductIds = async (req = request, res = response, next) => {
    const { cid, pid } = req.params;

    try {
        const product = await productRepository.getById(pid);
        if (!product) {
            return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el ID ${pid}` });
        }

        const cart = await cartRepository.getById(cid);
        if (!cart) {
            return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el ID ${cid}` });
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal server error" });
    }
};


//Middleware que chequea que se esté enviando una cantidad por body cuando queremos cambiar la cantidad de un producto en el carrito
export const checkQuantity = (req = request, res = response, next) => {
    const { quantity } = req.body;

    if (quantity === undefined || typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).json({ status: "Error", msg: "Tenés que indicar una cantidad y que ésta sea mayor a cero" });
    }

    next();

};

export const isUserCart = async (req = request, res = response, next) =>{
    const { cid } = req.params;

    if (req.user.cart._id !== cid) return res.status(401).json({ status: "Error", msg: "Can't operate another user's cart"});

    next();
};
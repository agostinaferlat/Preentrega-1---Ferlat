import { cartModel } from "./models/cart.model.js";
import {productModel} from "./models/product.model.js"

const getAll= async () => {
    const cart = await cartModel.find({status: true});
    return cart;
};

const getById= async (id) => {
    const carts = await cartModel.findById(id).populate ("products.product");
    return carts;
};

const create = async () => {
    const cart = await cartModel.create({});
    return cart;
};

const update = async (id, data) => {
    await cartModel.findByIdAndUpdate(id, data, {new: true});
    return cartUpdate;
};

const deleteOne = async (data) => {
    const cart = await cartModel.deleteOne ({_id: id});
    return cart;
};

const addProductToCart = async (cid, pid) => {
    
    const cart = await cartModel.findById(cid);
   
    const productInCart = cart.products.find((product) => product.product == pid);
    if (productInCart){
        productInCart.quantity++;
    } else {
        cart.products.push({ product: pid, quantity: 1});
    }

    await cart.save();
    return cart;


};

//Función para eliminar un producto del carrito, en base a la cantidad que haya en el mismo. Si hay más de una unidad del mismo producto, se borra una unidad. Si hay una sola unidad en el carrito, se borra el producto directamente
const deleteProductInCart = async (cid, pid) => {
    try {
        const cart = await cartModel.findById(cid);

        if (!cart) {
            throw new Error(`No se encontró el carrito con el ID ${cid}`);
        }

        //Aquí identifica el index del producto en el carrito
        const productIndex = cart.products.findIndex(item => item.product.toString() === pid);

        if (productIndex !== -1) {
            //Si hay más de una unidad del mismo producto, se modifica su cantidad restando uno
            if (cart.products[productIndex].quantity > 1) {
                cart.products[productIndex].quantity--;
            } else {
                //Si hay una sola unidad del producto, al activarse la función en cambio borra el producto directamente. Si hay otros productos, devuelve array con esos productos. Si no había otros, devuelve array (carrito) vacío.
                cart.products.splice(productIndex, 1);
            }

            await cart.save();
        }

        return cart;
    } catch (error) {
        throw new Error(`Error al borrar el producto del carrito: ${error.message}`);
    }
};

const updateQuantityProductInCart = async (cid, pid, quantity) =>{
    
    const cart = await cartModel.findById(cid);
    const product = cart.products.find( element => element.product == pid);
    product.quantity = quantity;

    await cart.save();
    return cart;

}

const clearProductsInCart = async (cid) => {

    const cart = await cartModel.findById(cid);
    cart.products = []

    await cart.save();

    return  cart;

}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    addProductToCart,
    deleteProductInCart,
    updateQuantityProductInCart,
    clearProductsInCart
};
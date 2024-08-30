import cartRepository from "../persistence/MongoDB/cart.repository.js";
import productRepository from "../persistence/MongoDB/product.repository.js";



const createCart = async () => {
    return await cartRepository.create();
};


const getCartById = async (cid) => {
    return await cartRepository.getById(cid);
};


const addProductToCart = async (cid, pid) => {
    return await cartRepository.addProductToCart(cid, pid);
};

const updateProductQuantity = async (cid, pid, quantity) => {
    return await cartRepository.updateQuantityProductInCart(cid, pid, quantity);
};

const deleteProductInCart = async (cid, pid) => {
    return await cartRepository.deleteProductInCart(cid, pid);
};

const deleteAllProductsInCart = async (cid) => {
    return await cartRepository.clearProductsInCart(cid);
};

const purchaseCart = async (cid) => {
    const cart = await cartRepository.getById(cid);
    let total = 0;
    const productsWithoutStock = [];
    
    for( const productCart of cart.products){
        const product = await productRepository.getById(productCart.product);
        
        if( product.stock >= productCart.quantity){
            total += product.price * productCart.quantity;
            await productRepository.update(product._id, {stock: product.stock - productCart.quantity})
        } else {
            productsWithoutStock.push(productCart);
        }
    
    
        await cartRepository.update(cid, { products: productsWithoutStock });
    }

    return total;
}

export default {
    createCart, 
    getCartById,
    addProductToCart,
    updateProductQuantity,
    deleteProductInCart,
    deleteAllProductsInCart,
    purchaseCart
}
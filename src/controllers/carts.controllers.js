import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";


const createCart = async (req,res) => {
    try {
        const cart = await cartServices.createCart();

        res.status(201).json({status:"success", cart});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({status: "Error", msg: "Error interno del servidor"});   
    }
};


const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.getCartById(cid);
        if (!cart) return res.status (404).json ({status: "Error", msg: "Carrito no encontrado"});

        res.status (200).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Error interno del servidor"});
    }
};


const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cartUpdate = await cartServices.addProductToCart(cid, pid);
        
        res.status (200).json({status: "success", payload: cartUpdate});

    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Error interno del servidor"});
    }
};

const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cartUpdate = await cartServices.updateProductQuantity(cid, pid, Number(quantity));

        res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

const deleteProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cartUpdate = await cartServices.deleteProductInCart(cid, pid);
        
        res.status(200).json({ status: "success", payload: cartUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
};

const deleteAllProductsInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.clearProductsInCart(cid);
        if (!cart) return res.status (404).json ({status: "Error", msg: "Carrito no encontrado"});

        res.status (200).json({status: "success", cart});

    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Error interno del servidor"});
    }
};

const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartServices.getCartById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado"})

        const total = await cartServices.purchaseCart(cid);
        const ticket = await ticketServices.createTicket(req.user.email, total);

        res.status(200).json({status: "Success", ticket});


    } catch (error) {
        console.log(error);
        res.status (500).json ({status: "Error", msg: "Internal server error"});
    }
};



export default {
    createCart, 
    getCartById,
    addProductToCart,
    updateProductQuantity,
    deleteProductInCart,
    deleteAllProductsInCart,
    purchaseCart
};
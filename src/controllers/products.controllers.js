import { request, response } from "express";
import productsServices from "../services/products.services.js";



const getAllProducts = async (req = request, res = response) => {
    try {
        const { limit, page, sort, category, status } = req.query;

        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1
            },
            learn: true
        }

        if (category){
            const products= await productsServices.getAllProducts({category}, options);
            return res.status(200).json({status: "success", products});
        }

        if (status){
            const products= await productsServices.getAllProducts({status}, options);
            return res.status(200).json({status: "success", products});
        }

        const products = await productsServices.getAllProducts({}, options);
        res.status(200).json({status: "success", products});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
};

const getProductById = async (req = request, res = response) =>{
    try {
        const { pid } = req.params;
        const product = await productsServices.getProductById(pid);

        if (!product) return res.status(404).json({status: "Error", msg:"Product not found"})

        res.status(200).json({status: "success", product});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
};


const updateProduct = async (req = request, res = response) =>{
    try {
        const { pid } = req.params;
        const productData = req.body;
        const product = await productsServices.updateProduct(pid, productData);
        if (!product) return res.status(404).json({status:"Error", msg:"Product not found"})

        res.status(200).json({status: "success", product});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
};

const createProduct = async(req = request, res = response) =>{
    try {
        const productData = req.body;
        const product = await productsServices.createProduct(productData);

        res.status(201).json({status: "success", product});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
};

const deleteProduct = async (req = request, res = response) =>{
    try {
        const { pid } = req.params;
        const product = await productsServices.deleteProduct(pid);
        if (!product) return res.status(404).json({status:"Error", msg:"Product not found"})

        res.status(200).json({status: "success", msg:`Product with ID ${pid} has been deleted.`});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
};

export default{
    getAllProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
};
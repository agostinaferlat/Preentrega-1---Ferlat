import productRepository from "../persistence/MongoDB/product.repository.js"



const getAllProducts = async (query, options) => {
    return await productRepository.getAll(query, options);
};

const getProductById = async (pid) => {
    return await productRepository.getById(pid);
};


const updateProduct = async (pid, productData) => {
    return await productRepository.update(pid, productData);
};

const createProduct = async (productData) => {
    return await productRepository.create(productData);
};

const deleteProduct = async (pid) => {
    return await productRepository.deleteOne(pid);
};

export default{
    getAllProducts,
    getProductById,
    updateProduct,
    createProduct,
    deleteProduct
};
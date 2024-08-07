import { Router } from "express";
import { checkProductData } from "../middlewares/middlewares.js";
import productDao from "../dao/MongoDB/product.dao.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js"


const router = Router();

// Para traer todos los productos
router.get("/", passportCall ("jwt"), authorization ("user"), async (req, res) => {
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
            const products= await productDao.getAll({category}, options);
            return res.status(200).json({status: "success", products});
        }

        if (status){
            const products= await productDao.getAll({status}, options);
            return res.status(200).json({status: "success", products});
        }

        const products = await productDao.getAll({}, options);
        res.status(200).json({status: "success", products});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
});

//Para traer un producto particular (en base a su ID)
router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productDao.getById(pid);

        if (!product) return res.status(404).json({status: "Error", msg:"Product not found"})

        res.status(200).json({status: "success", product});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
});


//Para crear un nuevo producto
router.post("/", checkProductData, async (req, res) => {
    try {
        const productData = req.body;
        const product = await productDao.create(productData);

        res.status(201).json({status: "success", product});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
});

//Para modificar propiedades de un producto existente a través del body
router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const product = await productDao.update(pid, productData);
        if (!product) return res.status(404).json({status:"Error", msg:"Product not found"})

        res.status(200).json({status: "success", product});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
});

//Para eliminar un producto (pasa su status a false en la base de datos)
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productDao.deleteOne(pid);
        if (!product) return res.status(404).json({status:"Error", msg:"Product not found"})

        res.status(200).json({status: "success", msg:`Product with ID ${pid} has been deleted.`});
        
    } catch (error) {
       console.log(error);
       res.status(500).json({status: "Error", msg: "Internal server error"});
    }
});






export default router;

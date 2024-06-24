import { Router } from "express";
import {productModel} from "../dao/MongoDB/models/product.model.js";
import { io } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    res.render("home", { products , styles:"styles.css" });
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try{
    const products = await productModel.find({ status: true }).lean();
    io.emit("products", products);

    res.render("realTimeProducts", {products , styles:"styles.css"});
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, price, description } = req.body;
    await productModel.create({ title, price, description });
    const products = await productModel.find({ status: true }).lean();
    io.emit("products", products);

    res.render("realTimeProducts", {styles:"styles.css"});
  }catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/realtimeproducts/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    
    const updatedProduct = await productModel.findByIdAndUpdate(productId, { status: false });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const products = await productModel.find({ status: true }).lean();
    io.emit("products", products);

    res.render("realTimeProducts", { products, styles: "styles.css" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// router.delete("/realtimeproducts", async (req, res) => {
//   try {
//     const { _id } = req.body;
//     await productModel.findByIdAndDelete(_id);
//     const products = await productModel.find();
//     io.emit("products", products);

//     res.render("realTimeProducts");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// });


export default router;
import { Router } from "express"
import auth from "../middlewares/auth.middleware.js"
import { addProductController, deleteProductController, getProductController, updateProductController } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/add-product", auth, addProductController)
productRouter.get("/get-product", getProductController)
productRouter.put("/update-product",auth, updateProductController)
productRouter.delete("/delete-product",auth, deleteProductController)


export default productRouter
import { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { addToCartController, deleteCartController, getCartController, updateCartController } from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.post("/add-to-cart", auth, addToCartController)
cartRouter.get("/get-cart", auth, getCartController)
cartRouter.put("/update-cart", auth, updateCartController)
cartRouter.delete("/remove-from-cart", auth, deleteCartController)

export default cartRouter
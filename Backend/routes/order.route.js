import { Router } from "express"
import auth from "../middlewares/auth.middleware.js"
import { addCODOrderController, cancelOrderController, getOrdersController } from "../controllers/order.controller.js"

const orderRouter = Router()

orderRouter.post("/create-cod-order", auth, addCODOrderController)
orderRouter.get("/get-order", auth, getOrdersController)
orderRouter.put("/update-order", auth, cancelOrderController)

export default orderRouter
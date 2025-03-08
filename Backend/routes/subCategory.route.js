import { Router } from "express"
import auth from "../middlewares/auth.middleware.js"
import { AddSubCategoryController, deleteSubCategoryController, getSubCategoryController, updateSubCategoryController } from "../controllers/subCategory.controller.js"


const subCategoryRouter = Router()

subCategoryRouter.post("/add-subcategory",auth,AddSubCategoryController)
subCategoryRouter.get("/get-subcategory", getSubCategoryController)
subCategoryRouter.put("/update-subcategory", auth, updateSubCategoryController)
subCategoryRouter.delete("/delete-subcategory", auth, deleteSubCategoryController)

export default subCategoryRouter
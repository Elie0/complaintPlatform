import express from 'express';
import { createCategoryController,updateCategoryController,deleteCategoryController } from '../controllers/complaintCategory';
const router = express.Router();

router.post('/complaintcategories',createCategoryController);
router.put('/category',updateCategoryController);
router.delete('/category',deleteCategoryController);

export default router;

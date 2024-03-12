import express from 'express';
import { createCategoryController,updateCategoryController,deleteCategoryController,getClientComplaintCategoriesController,getClientComplaintsPaginatedController,getAllClientComplaintsController,updateComplaintStatusController } from '../controllers/admin';
const router = express.Router();

router.post('/category',createCategoryController);
router.put('/category',updateCategoryController);
router.delete('/category',deleteCategoryController);
router.get('/complaint-categories/', getClientComplaintCategoriesController);
router.get('/usercomplaints/', getClientComplaintsPaginatedController);
router.get('/complaints', getAllClientComplaintsController);
router.put('/complaints/:complaintId', updateComplaintStatusController);

export default router;

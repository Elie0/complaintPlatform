import express from 'express';
import { showComplaintCategories } from '../controllers/complaintCategory';
const 
router = express.Router();

router.get('/complaintcategories', showComplaintCategories);

export default router
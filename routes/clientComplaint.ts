import express from 'express';
import { submitComplaint,getClientComplaints,getClientComplaintDetails,deleteClientComplaint,changeClientPassword} from '../controllers/clientComplaint';
const router = express.Router();

router.post('/complaint',submitComplaint);
router.get('/complaints', getClientComplaints);
router.get('/complaint/:complaintId', getClientComplaintDetails);
router.delete('/complaints/:complaintId', deleteClientComplaint);
router.put('/change-password',changeClientPassword);

export default router;


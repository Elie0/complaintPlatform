import { createComplaint,getComplaintsPaginated,getComplaintById,deleteComplaintById,changePassword } from '../services/clientComplaint.service';
import { Response, NextFunction } from 'express';

export const submitComplaint = async (req: any,res: Response,next: NextFunction): Promise<void> => {
  try {
    const { title, body, categoryIds } = req.body; 
    console.log(categoryIds)
    let userId: any = req.userId;
    const complaint = await createComplaint(title, body, categoryIds, userId);
    res.status(201).json(complaint);
  } catch (error) {
    next(error);
  }
};

export const getClientComplaints = async (req: any,res: Response,next: NextFunction): Promise<void> => {
  try {
    const userId: string = req.userId;
    const page: number = parseInt(req.query.page as string) || 1;
    const pageSize: number = parseInt(req.query.pageSize as string) || 10;

    const complaints = await getComplaintsPaginated(userId, page, pageSize);

    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};



export const getClientComplaintDetails = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.userId;
    const complaintId: string = req.params.complaintId;

    const complaint = await getComplaintById(userId, complaintId);

    if (!complaint) {
      res.status(404).json({ message: 'Complaint not found' });
      return;
    }

    res.status(200).json(complaint);
  } catch (error) {
    next(error);
  }
};

export const deleteClientComplaint = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.userId;
    const complaintId: string = req.params.complaintId;

    await deleteComplaintById(userId, complaintId);

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const changeClientPassword = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const oldPassword: string = req.body.oldPassword;
    const newPassword:string = req.body.newPassword;

    await changePassword(req.userId,oldPassword,newPassword);

    res.status(200).json({ message: 'Password Changed successfully' });
  } catch (error) {
    next(error);
  }
};


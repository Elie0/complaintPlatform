import { Request, Response, NextFunction } from 'express';
import { getComplaintCategories,createCategory,updateCategory,deleteCategory,getClientComplaintCategories,
getClientComplaintsPaginated,getAllClientComplaints,updateComplaintStatus } from '../services/admin.service';
import { ComplaintStatus } from '../Schemas/complaint';

export const showComplaintCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await getComplaintCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error)
  }
};

export const createCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name } = req.body;
    
    if (!name) {
      res.status(400).json({ message: 'Category name is required.' });
      return;
    }
    const category = await createCategory(name);
    res.status(201).json({ message: 'Category created successfully.', category });
  } catch (error) {
    next(error)
  }
};
export const updateCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.body.id;
      const name = req.body.name
      if (!id) {
        res.status(400).json({ message: 'ID is required.' });
        return;
      }
      const category = await  updateCategory(id,name);
      res.status(201).json({ message: 'Category successfully updated !.', category });
    } catch (error) {
      next(error)
    }
  };
  export const deleteCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.body.id;
      if (!id) {
        res.status(400).json({ message: 'ID is required.' });
        return;
      }
      const category = await deleteCategory(id);
      res.status(201).json({ message: 'Category successfully updated !.', category });
    } catch (error) {
      next(error)
    }
  };

  export const getClientComplaintCategoriesController = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.query.userId;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 2;
      const categories = await getClientComplaintCategories(userId, page, pageSize);
  
      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  };

  export const getClientComplaintsPaginatedController = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.query.userId;
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 2;
  
      const complaints = await getClientComplaintsPaginated(userId, page, pageSize);
  
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  };

  export const getAllClientComplaintsController = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string) : 1;
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;
      const status = req.query.status as ComplaintStatus;
      const userId = req.query.userId as string;
  
      const complaints = await getAllClientComplaints(page, pageSize, status, userId);
  
      res.status(200).json(complaints);
    } catch (error) {
      next(error);
    }
  };

  export const updateComplaintStatusController = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const complaintId = req.params.complaintId;
      const newStatus = req.body.status;
      const updatedComplaint = await updateComplaintStatus(complaintId, newStatus);
      if (!updatedComplaint) {
        res.status(404).json({ message: 'Complaint not found' });
        return;
      }
  
      res.status(200).json(updatedComplaint);
    } catch (error) {
      next(error);
    }
  };
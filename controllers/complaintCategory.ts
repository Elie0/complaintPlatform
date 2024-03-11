import { Request, Response, NextFunction } from 'express';
import { getComplaintCategories,createCategory,updateCategory,deleteCategory } from '../services/complainCategory.service';

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
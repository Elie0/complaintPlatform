import ComplaintCategoryModel, { ComplaintCategory } from '../Schemas/complainCategory';

export const getComplaintCategories = async (): Promise<ComplaintCategory[]> => {

    const categories = await ComplaintCategoryModel.find();
    return categories;
  
};

export const createCategory = async (name: string): Promise<any> => {
    
      const category = await ComplaintCategoryModel.create({ name });
      return category;
  };

export const updateCategory = async (categoryId: string,  Name: string ): Promise<void> => {
    const category = await ComplaintCategoryModel.findByIdAndUpdate(
      categoryId,
      { name: Name },
    );
    if (!category) {
      throw new Error('Category not found.');
    }
  };

export const deleteCategory = async (categoryId: string ): Promise<void> => {
    const category = await ComplaintCategoryModel.findByIdAndDelete(
      categoryId,
    );
    if (!category) {
      throw new Error('Category not found.');
    }
  };
import ComplaintCategoryModel, { ComplaintCategory } from '../Schemas/complainCategory';
import ComplaintModel, {Complaint,ComplaintStatus} from '../Schemas/complaint';

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


export const getClientComplaintCategories = async (userId: string, page: number, pageSize: number): Promise<ComplaintCategory[]> => {
  const skip = (page - 1) * pageSize;
  

  const userComplaints = await ComplaintModel.find({ createdBy: userId }).skip(skip).limit(pageSize).populate('categories', 'name');


  const uniqueCategories: Set<string> = new Set();
  userComplaints.forEach((complaint) => {
    complaint.categories.forEach((category: any) => uniqueCategories.add(category.name));
  });

  const categoriesArray: string[] = Array.from(uniqueCategories);

  const categor:any = categoriesArray.map((name) => ({ name }));

  return categor;
};

export const getClientComplaintsPaginated = async (userId: string,page: number,pageSize: number): Promise<Complaint[]> => {
  const skip = (page - 1) * pageSize;
  const userComplaints = await ComplaintModel.find({ createdBy: userId })
    .skip(skip)
    .limit(pageSize)
    .populate('categories', 'name')
    .populate('createdBy', 'name');

  return userComplaints;
};

export const getAllClientComplaints = async (page: number,pageSize: number,status?: ComplaintStatus,userId?: string):Promise<Complaint[]> => {
  const skip = (page - 1) * pageSize;
  const query: any = {};

  if (status) {
    query.status = status;
  }

  if (userId) {
    query.createdBy = userId;
  }

  const complaints = await ComplaintModel.find(query)
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 }) 
    .populate('categories', 'name');

  return complaints;
};

export const updateComplaintStatus = async (complaintId: string, newStatus: string): Promise<Complaint | null> => {
  const updatedComplaint = await ComplaintModel.findByIdAndUpdate(
    complaintId,
    { status: newStatus },
    { new: true }
  ).populate('categories', 'name').populate('createdBy', 'name');

  return updatedComplaint;
};

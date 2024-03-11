import ComplaintModel, { Complaint, ComplaintStatus } from '../Schemas/complaint';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../Schemas/user';

export const createComplaint = async (
  title: string,
  body: string,
  categoryIds: string[], 
  userId: string
): Promise<Complaint> => {
  const complaint = await ComplaintModel.create({
    title,
    body,
    categories: categoryIds, 
    status: ComplaintStatus.PENDING,
    createdBy: userId,
  });
  return complaint;
};

export const getComplaintsPaginated = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<Complaint[]> => {
  const skip = (page - 1) * pageSize;

  const complaints = await ComplaintModel
    .find({ createdBy: userId })
    .skip(skip)
    .limit(pageSize)
    .exec();

  return complaints;
};

export const getComplaintById = async (
  userId: string,
  complaintId: string
): Promise<Complaint | null> => {
  const complaint = await ComplaintModel.findOne({
    _id: complaintId,
    createdBy: userId,
  })

  return complaint;
};

export const deleteComplaintById = async (
  userId: string,
  complaintId: string
): Promise<void> => {
  await ComplaintModel.findOneAndDelete({
    _id: complaintId,
    createdBy: userId,
  })
};

export const changePassword = async (userId: string, oldPassword: string, newPassword: string): Promise<void> => {
  const user = await User.findById(userId) as IUser;
  
  const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid old password.');
  }
  const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedNewPassword;
  await user.save();
};

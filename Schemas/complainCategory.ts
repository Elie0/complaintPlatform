import mongoose, { Document, Schema } from 'mongoose';

export interface ComplaintCategory extends Document {
  name: string;
}

const complaintCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<ComplaintCategory>('ComplaintCategory', complaintCategorySchema);
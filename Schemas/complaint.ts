import mongoose, { Document, Schema, set } from 'mongoose';

export enum ComplaintStatus {
  PENDING = 'PENDING',
  INPROGRESS = 'INPROGRESS',
  RESOLVED = 'RESOLVED',
  REJECTED = 'REJECTED',
}

export interface Complaint extends Document {
  title: string;
  body: string;
  categories: mongoose.Types.ObjectId[];
  status: ComplaintStatus;
}

const complaintSchema = new Schema({
  title: { 
    type: String,
    required: true 
    },
  body: 
  {  type: String,
     required: true
  },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ComplaintCategory',
      required: true,
    },
  ],  
  status: 
  { 
    type: String,
     enum: Object.values(ComplaintStatus),
      default: ComplaintStatus.PENDING
  },
  createdBy:
{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
}
});

export default mongoose.model<Complaint>('Complaint', complaintSchema);


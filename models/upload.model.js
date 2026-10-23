import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, unique: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ownerType: { type: String, required: true },
  },
  { timestamps: true }
);

export const UploadModel = mongoose.model('Upload', uploadSchema);
export default UploadModel;

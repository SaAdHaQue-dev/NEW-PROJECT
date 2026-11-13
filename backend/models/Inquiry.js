import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      default: ''
    },
    projectType: {
      type: String,
      default: 'Commercial Tower Development'
    },
    budget: {
      type: String,
      default: '$5M - $25M'
    },
    message: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_review', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default Inquiry;


import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Residential', 'Commercial', 'Eco Villas', 'Penthouses', 'Other'],
      default: 'Residential'
    },
    location: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    beds: {
      type: String,
      default: 'N/A'
    },
    baths: {
      type: String,
      default: 'N/A'
    },
    completion: {
      type: String,
      default: '2026'
    },
    image: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'Featured'
    },
    description: {
      type: String,
      required: true
    },
    features: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;


import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    institution: { type: String, required: true }, // e.g., "Kyoto College of Graduate Studies for Informatics (KCGI)"
    degree: { type: String, required: true }, // e.g., "Master of Science in Applied IT"
    fieldOfStudy: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true }, // e.g., "Expected March 2027"
    courses: [{ type: String }], // Key courses e.g., ["AI Software Applications", "System Administration"]
    type: { type: String, enum: ['Degree', 'Certification', 'Training'], default: 'Degree' },
    certificateUrl: { type: String }, // Optional link to degree or course certificate PDF
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);
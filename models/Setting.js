import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true, // e.g., 'cv_links'
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true, // Stores flexible objects like { en: "...", ja: "..." }
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
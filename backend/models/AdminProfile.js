
import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Administrator",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
      trim: true,
      lowercase: true,
      default: "superadmin@bookingswale.in",
    },
    phone: {
      type: String,
      match: [/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian phone number"],
      default: "9876543210",
    },
    role: {
      type: String,
      default: "Broker Manager",
      trim: true,
    },
  },
  { timestamps: true },
);

adminProfileSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("AdminProfile", adminProfileSchema);

import mongoose from "mongoose";

const brokerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Broker name is required"],
      trim: true,
    },
    rooms: {
      type: Number,
      default: 0,
      min: 0,
    },
    phone1: {
      type: String,
      required: [true, "Primary phone number is required"],
      match: [/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"],
      trim: true,
    },
    phone2: {
      type: String,
      required: [true, "Secondary phone number is required"],
      match: [/^[6-9]\d{9}$/, "Must be a valid 10-digit Indian mobile number"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    dateAdded: {
      type: String,
      default: () =>
        new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },
  },
  { timestamps: true },
);

brokerSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Broker", brokerSchema);

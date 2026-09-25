import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    brokerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker",
      required: [true, "Broker reference is required"],
    },
    title: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    roomType: {
      type: String,
      enum: [
        "Single Room",
        "Double Sharing",
        "1 RK",
        "1 BHK",
        "2 BHK",
        "3 BHK",
      ],
      default: "1 BHK",
    },
    roomsCount: {
      type: Number,
      required: [true, "Number of rooms is required"],
      min: [1, "Must have at least 1 room"],
      default: 1,
    },
    rent: {
      type: Number,
      default: 0,
      min: 0,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
    },
  },
  { timestamps: true },
);

homeSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.brokerId = ret.brokerId.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model("Home", homeSchema);

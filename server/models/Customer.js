const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
 

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      default: "",
    },

    company: {
      type: String,
      default: "",
    },

    designation: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Resolved", "Closed"],
      default: "Active",
    },

    notes: {
      type: String,
      default: "",
    },

    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
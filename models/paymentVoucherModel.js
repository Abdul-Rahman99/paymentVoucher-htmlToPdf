const mongoose = require("mongoose");
const Counter = require("./counterModel");

const paymentVoucherSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [1, "Amount must be greater than zero."],
    },
    empName: {
      // this employee name can be retrived from another schema as a ref if needed
      type: String,
      required: [true, "Employee name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    serialNumber: {
      type: Number,
      unique: true,
    },
    accountantSignature: {
      // this accountant name can be retrived from another schema as a ref if needed
      type: String,
      required: [true, "Accountant signature is required."],
    },
    empSignature: {
      // this employee name can be retrived from another schema as a ref if needed
      type: String,
      required: [true, "Employee signature is required."],
    },
  },
  { timestamps: true }
);

// @desc    incrementing the value of serial number
paymentVoucherSchema.pre("save", async function (next) {
  if (!this.isNew) {
    return next();
  }
  try {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "serialNumber" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.serialNumber = counter.sequence_value;
    next();
  } catch (error) {
    next(error);
  }
});

const PaymentVoucher = mongoose.model("PaymentVoucher", paymentVoucherSchema);

module.exports = PaymentVoucher;

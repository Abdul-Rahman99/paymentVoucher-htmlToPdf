const PaymentVoucher = require("../models/paymentVoucherModel");
const ApiError = require("../utils/apiError");
const asyncHandler = require("express-async-handler");

// Create a new payment voucher
const createPaymentVoucher = asyncHandler(async (data) => {
  const paymentVoucher = new PaymentVoucher(data);
  const newVoucher = await paymentVoucher.save();
  return newVoucher;
});

// @desc    get all payment vouchers
const getAllPaymentVouchers = asyncHandler(async () => {
  const vouchers = await PaymentVoucher.find({});
  if (!vouchers) {
    throw new ApiError(`No vouchers found`, 404);
  }
  return vouchers;
});

// @desc    get payment voucher by serial number or name
const getPaymentVoucherBySerialOrName = asyncHandler(
  async ({ serialOrName }) => {
    let voucher;

    if (!isNaN(serialOrName)) {
      voucher = await PaymentVoucher.findOne({ serialNumber: serialOrName });
    } else {
      // otherwise, search by name or any other similar name to the query
      const regex = new RegExp(serialOrName, "i");
      voucher = await PaymentVoucher.find({ empName: { $regex: regex } });
    }
    if (!voucher) {
      throw new ApiError(`No voucher found for ${serialOrName}`, 404);
    }
    return voucher;
  }
);

// IMPORTANT NOTE: update and delete functions can be actioned by serialNumber but for more security reasons mongoDb Id is best for now
// @desc    update voucher by id
const updatePaymentVoucher = asyncHandler(async (id, updateData) => {
  const voucher = await PaymentVoucher.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!voucher) {
    throw new ApiError(`No voucher found for ID ${id}`, 404);
  }
  return voucher;
});

// @desc    delete voucher by id
const deletePaymentVoucher = asyncHandler(async (id) => {
  const voucher = await PaymentVoucher.findByIdAndDelete(id);
  if (!voucher) {
    throw new ApiError(`No voucher found for ID ${id}`, 404);
  }
  return;
});

module.exports = {
  createPaymentVoucher,
  updatePaymentVoucher,
  deletePaymentVoucher,
  getAllPaymentVouchers,
  getPaymentVoucherBySerialOrName,
};

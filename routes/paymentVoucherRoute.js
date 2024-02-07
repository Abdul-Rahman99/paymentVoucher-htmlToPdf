const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const paymentVoucherService = require("../services/paymentVoucherService");
const pdfService = require("../services/pdfService");
const {
  createPaymentVoucherValidator,
  getPaymentVoucherValidator,
  updatePaymentVoucherValidator,
  deletePaymentVoucherValidator,
} = require("../utils/validators/paymentVoucherValidator");

// @desc    Create a new payment voucher
// @route   POST /api/payment-vouchers
router.post(
  "/",
  createPaymentVoucherValidator,
  asyncHandler(async (req, res) => {
    const newVoucher = await paymentVoucherService.createPaymentVoucher(
      req.body
    );

    // pdf generation after create a payment voucher
    const htmlContent = pdfService.generateHTMLContent(newVoucher);
    if (!htmlContent) {
      res.status(400).send("You should pass HTML content");
    }
    const pdfFileName = `payment_voucher_${newVoucher.empName}_${newVoucher.serialNumber}.pdf`;
    await pdfService.generatePDF(htmlContent, pdfFileName);

    res.contentType("application/pdf");
    res.send(pdfFileName);
  })
);

// @desc    Get all payment vouchers
// @route   GET /api/payment-vouchers
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const vouchers = await paymentVoucherService.getAllPaymentVouchers();
    res.status(200).json(vouchers);
  })
);

// @desc    Get payment voucher by ID
// @route   GET /api/payment-vouchers/:serialOrName
router.get(
  "/:serialOrName",
  getPaymentVoucherValidator,
  asyncHandler(async (req, res) => {
    const serialOrName = req.params.serialOrName;
    const voucher = await paymentVoucherService.getPaymentVoucherBySerialOrName(
      {
        serialOrName,
      }
    );
    res.status(200).json(voucher);
  })
);

// @desc    Update payment voucher by ID
// @route   PUT /api/payment-vouchers/:id
router.put(
  "/:id",
  updatePaymentVoucherValidator,
  asyncHandler(async (req, res) => {
    const updatedVoucher = await paymentVoucherService.updatePaymentVoucher(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedVoucher);
  })
);

// @desc    Delete payment voucher by ID
// @route   DELETE /api/payment-vouchers/:id
router.delete(
  "/:id",
  deletePaymentVoucherValidator,
  asyncHandler(async (req, res) => {
    await paymentVoucherService.deletePaymentVoucher(req.params.id);
    res.status(204).end();
  })
);

module.exports = router;

const { check, body, param } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const PaymentVoucher = require("../../models/paymentVoucherModel");

exports.getPaymentVoucherValidator = [
  param("serialOrName").custom(async (value, { req }) => {
    const voucher = await PaymentVoucher.findOne({ serialNumber: value });
    if (!voucher) {
      throw new Error(`No Voucher with this Serial Number ${value}`);
    }
    req.validVoucher = voucher;
    return true;
  }),
  validatorMiddleware,
];

exports.createPaymentVoucherValidator = [
  check("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Amount must be greater than or equal to zero"),
  check("empName")
    .notEmpty()
    .withMessage("Employee name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("Employee name must be between 3 and 32 characters"),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),
  check("accountantSignature")
    .notEmpty()
    .withMessage("Accountant signature is required"),
  check("empSignature")
    .notEmpty()
    .withMessage("Employee signature is required"),
  validatorMiddleware,
];

exports.updatePaymentVoucherValidator = [
  check("id").isMongoId().withMessage("Invalid Payment Voucher id format"),
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Amount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Amount must be greater than or equal to zero"),
  body("empName")
    .optional()
    .isLength({ min: 3, max: 32 })
    .withMessage("Employee name must be between 3 and 32 characters"),
  body("description")
    .optional()
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),
  body("accountantSignature").optional(),
  body("empSignature").optional(),
  validatorMiddleware,
];

exports.deletePaymentVoucherValidator = [
  check("id").isMongoId().withMessage("Invalid Payment Voucher id format"),
  validatorMiddleware,
];

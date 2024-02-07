const paymentVouchersRoutes = require("./paymentVoucherRoute");

const mountRoutes = (app) => {
  app.use("/api/payment-vouchers", paymentVouchersRoutes);
};

module.exports = mountRoutes;

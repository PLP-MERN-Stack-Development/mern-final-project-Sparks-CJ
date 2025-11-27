// backend/controllers/paymentController.js
export const payForTicket = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Mock stripe response
    const fakePaymentId = "pay_" + Math.random().toString(36).substring(2, 10);

    return res.json({
      message: "Payment successful (mock)",
      paymentId: fakePaymentId,
      amount,
      currency
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

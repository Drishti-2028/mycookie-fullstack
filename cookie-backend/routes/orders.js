const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const { protect } = require("../middleware/auth");

// POST /api/orders — save order to MongoDB
router.post("/", async (req, res) => {
  try {
    const { name, address, items, total, razorpayOrderId } = req.body;

    if (!name || !address || !items || items.length === 0)
      return res.status(400).json({ success: false, message: "Missing details" });

    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const decoded = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
        userId = decoded.id;
      } catch {}
    }

    const order = await Order.create({
      userId,
      name,
      address,
      items,
      total,
      razorpayOrderId,
      status: "pending",
      paymentStatus: "unpaid",
    });

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/all — get all orders (admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/orders/my — get logged in user's orders
router.get("/my", protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/orders/:id/status — update order status (admin)
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PATCH /api/orders/:id/verify — mark order as paid
router.patch("/:id/verify", async (req, res) => {
  try {
    const { razorpayPaymentId, razorpaySignature, razorpayOrderId } = req.body;

    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpaySignature)
      return res.status(400).json({ success: false, message: "Payment verification failed" });

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "paid",
        status: "processing",
        razorpayPaymentId,
        razorpaySignature,
      },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
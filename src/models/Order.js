const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: String,
    size: Number,
    quantity: Number,
    name: String,
    phone: String,
    email: String,
    address: String,
    note: String
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

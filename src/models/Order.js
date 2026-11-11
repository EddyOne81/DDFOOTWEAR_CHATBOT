const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: { type: String, required: true, trim: true },
    size: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, validate: Number.isInteger },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    address: { type: String, required: true, trim: true },
    note: { type: String, trim: true, default: 'No additional note' }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

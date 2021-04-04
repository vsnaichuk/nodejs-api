const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: { type: Array, required: true },
  totalAmount: { type: String, required: true },
  date: { type: Date, required: true },
  creator: { type: String, required: true },
});

module.exports = mongoose.model('Order', orderSchema);

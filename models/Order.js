const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  foodId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Order = mongoose.model('order', OrderSchema)

module.exports = Order

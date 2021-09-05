const express = require('express')
const router = express.Router()
const passport = require('passport')

// Load Validation
const validateOrderInput = require('../../validation/order')

// Load Order Model
const Order = require('../../models/Order')

// @route GET api/orders
// @desc current user profile
// @access Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    // Find logged in user
    Order.find({ user: req.user.id })
      .populate('user', ['id', 'name'])
      .then(orders => {
        if (!orders) {
          errors.noOrders = 'You have not ordered anything yet'
          return res.status(404).json(errors)
        }
        res.json(orders)
      })
      .catch(err => res.status(404).json(err))
  },
)

// @route POST api/orders
// @desc Create orders
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateOrderInput(req.body.foods)

    // Check validation
    if (!isValid) {
      // Return any errors
      return res.status(400).json(errors)
    }

    // Get food ids
    const foodIds = req.body.foods

    await foodIds.forEach(foodId => new Order({ foodId, user: req.user.id }).save())

    return res.json({
      success: true,
      message: 'Orders created',
    })
  },
)

module.exports = router

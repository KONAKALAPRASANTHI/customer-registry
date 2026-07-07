const Customer = require("../models/Customer");
const Activity = require("../models/Activity");

// GET ALL CUSTOMERS
exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: customers,
    });
  } catch (error) {
    next(error);
  }
};

// GET SINGLE CUSTOMER
exports.getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE CUSTOMER
exports.createCustomer = async (req, res, next) => {
  try {
    const existingCustomer = await Customer.findOne({
      email: req.body.email,
    });

    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer with this email already exists.",
      });
    }

    const customer = await Customer.create(req.body);

    await Activity.create({
      customerId: customer._id,
      message: "Customer created",
    });

    res.status(201).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE CUSTOMER
exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await Activity.create({
      customerId: customer._id,
      message: "Customer updated",
    });

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE CUSTOMER
exports.deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await Activity.deleteMany({
      customerId: customer._id,
    });

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
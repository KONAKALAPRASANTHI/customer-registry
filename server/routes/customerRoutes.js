const express = require("express");

const router = express.Router();

const {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

// GET all customers
router.get("/", getCustomers);

// GET single customer
router.get("/:id", getCustomer);

// CREATE customer
router.post("/", createCustomer);

// UPDATE customer
router.put("/:id", updateCustomer);

// DELETE customer
router.delete("/:id", deleteCustomer);

module.exports = router;
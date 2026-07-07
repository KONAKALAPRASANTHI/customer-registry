const Customer = require("../models/Customer");

exports.getDashboardStats = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    const stats = {
      totalCustomers: customers.length,
      activeCustomers: customers.filter(c => c.status === "Active").length,
      pendingCustomers: customers.filter(c => c.status === "Pending").length,
      resolvedCustomers: customers.filter(c => c.status === "Resolved").length,
      closedCustomers: customers.filter(c => c.status === "Closed").length,
      lowPriority: customers.filter(c => c.priority === "Low").length,
      mediumPriority: customers.filter(c => c.priority === "Medium").length,
      highPriority: customers.filter(c => c.priority === "High").length,
    };

    res.json({
      success: true,
      data: {
        stats,
        recentCustomers: customers.slice(0, 5),
      },
    });
  } catch (err) {
    next(err);
  }
};
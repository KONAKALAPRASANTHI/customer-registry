const Ticket = require("../models/Ticket");

// GET ALL TICKETS
exports.getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find()
      .populate("customer", "fullName company")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE TICKET
exports.getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("customer", "fullName company");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
};

// CREATE TICKET
exports.createTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.create(req.body);

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("customer", "fullName company");

    res.status(201).json({
      success: true,
      data: populatedTicket,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE TICKET
exports.updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("customer", "fullName company");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE TICKET
exports.deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
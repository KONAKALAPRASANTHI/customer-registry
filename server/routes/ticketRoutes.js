const express = require("express");

const router = express.Router();

const {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

router.get("/", getTickets);

router.get("/:id", getTicket);

router.post("/", createTicket);

router.put("/:id", updateTicket);

router.delete("/:id", deleteTicket);

module.exports = router;
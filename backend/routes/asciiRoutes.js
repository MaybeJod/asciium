import express from "express";

const router = express.Router();

// GET
// /items --> get all the item documents
router.get("/", (req, res) => {});

// GET
// /items/:id --> get a single item document
router.get("/:id", (req, res) => {});

// POST
// /items --> create a new item document
router.post("/", (req, res) => {});

// DELETE
// /items/:id --> delete a singe item
router.delete("/:id", (req, res) => {});

// PUT
// /items/:id --> updates a singe item
router.put("/:id", (req, res) => {});

export default router;

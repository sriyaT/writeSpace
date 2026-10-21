const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const documentController = require("../controllers/document.controller");
router.post("/", authMiddleware, documentController.createDocument);
router.get("/", authMiddleware, documentController.getDocuments);
router.get("/:id", authMiddleware, documentController.getDocumentById);
router.put("/:id", authMiddleware, documentController.updateDocument);
router.delete("/:id", authMiddleware, documentController.deleteDocument);

module.exports = router;

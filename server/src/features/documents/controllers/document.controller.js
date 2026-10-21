const documentService = require("../services/document.service");

const createDocument = async (req, res) => {
  try {
    const createdDocument = await documentService.createDocument({
      user: req.user,
      payload: req.body || {},
    });

    return res.status(201).json({
      success: true,
      data: createdDocument,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocuments({
      user: req.user,
    });

    return res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDocumentById = async (req, res) => {
  try {
    const document = await documentService.getDocumentById({
      user: req.user,
      documentId: req.params.id,
    });
    return res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateDocument = async (req, res) => {
  try {
    const updatedDocument = await documentService.updateDocument({
      user: req.user,
      documentId: req.params.id,
      payload: req.body,
    });

    return res.status(200).json({
      success: true,
      data: updatedDocument,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteDocument = async (req, res) => {
  try {
    const response = await documentService.deleteDocument({
      user: req.user,
      documentId: req.params.id,
    });

    return res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};

const documentRepository = require("../repository/document.repository");

const createDocument = async ({ user, payload }) => {
  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const documentData = {
    title: payload.title?.trim() || "Untitled Document",
    content: payload.content || "",
    owner_id: user.id,
  };

  return await documentRepository.createDocument(documentData);
};

const getDocuments = async ({ user }) => {
  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  const documents = await documentRepository.findDocumentsByOwner(user.id);

  return documents;
};

const getDocumentById = async ({ user, documentId }) => {
  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  if (!documentId) {
    throw new Error("Invalid document id.");
  }

  const document = await documentRepository.findDocumentById(
    documentId,
    user.id
  );

  if (!document) {
    throw new Error("Document not found.");
  }

  return document;
};

const updateDocument = async ({ user, documentId, payload }) => {
  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  if (!documentId) {
    throw new Error("Invalid document id.");
  }
  const existingDocument = await documentRepository.findDocumentById(
    documentId,
    user.id
  );

  if (!existingDocument) {
    throw new Error("Document not found.");
  }

  const updatedDocument = await documentRepository.updateDocument({
    documentId,
    ownerId: user.id,
    title: payload.title ?? existingDocument.title,
    content: payload.content ?? existingDocument.content,
  });
  return updatedDocument;
};

const deleteDocument = async ({ user, documentId }) => {
  if (!user?.id) {
    throw new Error("Unauthorized");
  }

  if (!documentId) {
    throw new Error("Invalid document id.");
  }

  const existingDocument = await documentRepository.findDocumentById(
    documentId,
    user.id
  );

  if (!existingDocument) {
    throw new Error("Document not found.");
  }

  const deletedRowCount = await documentRepository.deleteDocument({
    documentId,
    ownerId: user.id,
  });

  if (deletedRowCount === 0) {
    throw new Error("Failed to delete document.");
  }

  return {
    message: "Document deleted successfully.",
  };
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
};

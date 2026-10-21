const pool = require("../../../db/db");

const createDocument = async (documentData) => {
  const { title, content, owner_id } = documentData;

  const result = await pool.query(
    `
      INSERT INTO documents (
        
        title,
        content,
        owner_id
      )
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    [title, content, owner_id]
  );

  return result.rows[0];
};

const findDocumentsByOwner = async (owner_id) => {
  const result = await pool.query(
    `SELECT * FROM documents WHERE owner_id = $1 ORDER BY updated_at DESC`,
    [owner_id]
  );
  return result.rows;
};

const findDocumentById = async (documentId, ownerId) => {
  const result = await pool.query(
    `
      SELECT *
      FROM documents
      WHERE id = $1
      AND owner_id = $2;
    `,
    [documentId, ownerId]
  );

  return result.rows[0];
};

const updateDocument = async ({ documentId, ownerId, title, content }) => {
  const result = await pool.query(
    `
      UPDATE documents
      SET
        title = $1,
        content = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      AND owner_id = $4
      RETURNING *;
    `,
    [title, content, documentId, ownerId]
  );

  return result.rows[0];
};

const deleteDocument = async ({ documentId, ownerId }) => {
  const result = await pool.query(
    `
      DELETE FROM documents
      WHERE id = $1
      AND owner_id = $2;
    `,
    [documentId, ownerId]
  );

  return result.rowCount;
};

module.exports = {
  createDocument,
  findDocumentsByOwner,
  findDocumentById,
  updateDocument,
  deleteDocument,
};

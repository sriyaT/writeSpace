export const createDocument = async ({ title, content }) => {
  console.log("title:", title, typeof title);
  console.log("content:", content, typeof content);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.accessToken;

  const response = await fetch("http://localhost:5000/api/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to create document");
  }

  const data = await response.json();
  return data;
};

export const getDocuments = async () => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.accessToken;

  const response = await fetch("http://localhost:5000/api/documents", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch documents");
  }
  const data = await response.json();
  return data;
};

export const getDocumentById = async ({ id }) => {
  console.log("id", id);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.accessToken;
  const response = await fetch(`http://localhost:5000/api/documents/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch document");
  }
  const data = await response.json();
  return data;
};

export const updateDocumentById = async ({ id, title, content }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.accessToken;
  const response = await fetch(`http://localhost:5000/api/documents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to update documents");
  }
  const data = await response.json();
  return data;
};

export const deleteDocumentById = async ({ id }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const token = auth?.accessToken;
  const response = await fetch(`http://localhost:5000/api/documents/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete document");
  }
};

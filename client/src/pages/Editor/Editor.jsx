import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  createDocument,
  getDocumentById,
  updateDocumentById,
} from "../../api/document.api.js";

const Editor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("in edit page", id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTextArea = (e) => {
    console.log("e", e);
    let newText = e.target.value;
    setContent(newText);
  };

  const detailedDocumentById = async () => {
    try {
      setIsEdit(true);
      const data = await getDocumentById({ id });
      setTitle(data?.data?.title);
      setContent(data?.data?.content);
    } catch (error) {
      toast.error(error.message || "Failed to create document");
    }
  };
  useEffect(() => {
    if (id) {
      detailedDocumentById();
    }
  }, [id]);

  const updateDocument = async () => {
    try {
      const data = await updateDocumentById({
        id: id,
        title: title,
        content: content,
      });
      setTitle(data?.data?.title);
      setContent(data?.data?.content);
      toast.success("Document updated successfully!");
      setIsEdit(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to update document");
    }
  };
  const handleCreateDocument = async () => {
    console.log("call post document api", content);

    try {
      const data = await createDocument({
        title: title || "Untitled Document",
        content: content,
      });

      toast.success("Document created successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to create document");
    }
  };

  return (
    <div>
      <h1>Hi</h1>
      <input
        type="text"
        placeholder="Untitled Document"
        value={title}
        onChange={(e) => handleTitle(e)}
      />
      <textarea
        placeholder="Enter Text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onChange={(e) => handleTextArea(e)}
        value={content}
      />
      <button
        onClick={isEdit ? updateDocument : handleCreateDocument}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Done
      </button>
    </div>
  );
};

export default Editor;

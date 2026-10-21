import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getDocuments, deleteDocumentById } from "../../api/document.api.js";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleCreateDocument = () => {
    navigate("/editor");
  };

  const fetchList = async () => {
    try {
      setIsLoading(true);
      const data = await getDocuments();

      setDocuments(data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to fetch documents");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const handleDocumentClick = (id) => {
    navigate(`/editor/${id}`);
  };
  const handleDocumentDelete = async (id) => {
    try {
      await deleteDocumentById({ id });

      toast.success("Document deleted successfully!");
      fetchList();
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to delete documents");
    }
  };
  return (
    <div className="dashboard">
      <div className="flex">
        <div>
          <h1>Welcome to WriteSpace!!</h1>
          <h2>You can create your own documents for your use.</h2>
          <h3>
            {" "}
            Hurry up, Let's explore WriteSpace, you're just one step away, take
            a tour or just click on `Create Document` button to create your own
            document.
          </h3>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg transition duration-200 cursor-pointer shadow-sm hover:shadow-md"
          onClick={handleCreateDocument}
        >
          Create Document
        </button>
      </div>
      {isLoading ? (
        <div>Loading documents...</div>
      ) : documents.length === 0 ? (
        <div>
          <p>You don't have any documents yet.</p>
          <button onClick={handleCreateDocument}>
            Create your first document
          </button>
        </div>
      ) : (
        <div className="list">
          <h2>My Documents</h2>

          {documents.map((item) => {
            return (
              <div key={item.id}>
                <div onClick={() => handleDocumentClick(item?.id)}>
                  {item.title}
                </div>
                <button
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium px-5 py-2.5 rounded-lg transition duration-200 cursor-pointer shadow-sm hover:shadow-md"
                  onClick={() => handleDocumentDelete(item?.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

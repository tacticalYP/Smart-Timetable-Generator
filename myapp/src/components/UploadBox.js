import { useState } from "react";
import "./styles/UploadBox.css";

const UploadBox = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      setFile(uploadedFile);
      onFileUpload(uploadedFile);
    } else {
      alert("Please upload a valid image file.");
    }
  };

  const handleDelete = async () => {
    if (!file) return;

    try {
      await fetch(`http://127.0.0.1:8000/delete/${file.name}`, { method: "DELETE" });
      setFile(null);
      onFileUpload(null);
      alert("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div
      className={`upload-box ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {file ? (
        <div>
          <p>File Uploaded: {file.name}</p>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      ) : (
        <p>Drag and drop an image file here or click to select.</p>
      )}
    </div>
  );
};

export default UploadBox;

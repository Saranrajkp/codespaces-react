import React, { useState } from 'react';

function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(file);
      setFile(null);
    }
  };

  return (
    <div className="file-upload">
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        <div className={`drag-drop-area ${dragActive ? 'active' : ''}`}>
          <input type="file" onChange={handleFileChange} />
          <p>Drag and drop your file here, or click to select a file</p>
        </div>
        {file && <p className="selected-file">Selected file: {file.name}</p>}
        <button type="submit" className="btn btn-upload" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;

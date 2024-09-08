import React, { useState } from 'react';

function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
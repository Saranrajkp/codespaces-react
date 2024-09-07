import React from 'react';

function FileDownload({ fileId, fileName, onDownload }) {
  const handleDownload = () => {
    onDownload(fileId);
  };

  return (
    <div className="file-download">
      <button onClick={handleDownload}>Download {fileName}</button>
    </div>
  );
}

export default FileDownload;
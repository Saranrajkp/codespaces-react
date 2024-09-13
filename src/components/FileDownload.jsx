import React from 'react';

function FileDownload({ fileId, fileName, onDownload }) {
  const handleDownload = () => {
    onDownload(fileId);
  };

  return (
    <button className="btn btn-download" onClick={handleDownload}>
      Download
    </button>
  );
}

export default FileDownload;

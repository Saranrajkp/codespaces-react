import React from 'react';
import FileDownload from './FileDownload';

function FileList({ files, onDownload }) {
  return (
    <div className="file-list">
      <h2 className="section-title">Your Files</h2>
      {files.length === 0 ? (
        <p className="empty-message">No files found. Upload some files to get started!</p>
      ) : (
        <ul className="file-grid">
          {files.map((file) => (
            <li key={file.id} className="file-item">
              <div className="file-icon">{getFileIcon(file.name)}</div>
              <span className="file-name">{file.name}</span>
              <span className="file-size">{formatFileSize(file.size)}</span>
              <FileDownload
                fileId={file.id}
                fileName={file.name}
                onDownload={onDownload}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function getFileIcon(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'jpg':
    case 'jpeg':
    case 'png':
      return '🖼️';
    case 'doc':
    case 'docx':
      return '📝';
    default:
      return '📁';
  }
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
}

export default FileList;

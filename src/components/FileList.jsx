import React from 'react';
import FileDownload from './FileDownload';

function FileList({ files, onDownload }) {
  return (
    <div className="file-list">
      <h2>Your Files</h2>
      {files.length === 0 ? (
        <p>No files found. Upload some files to get started!</p>
      ) : (
        <ul>
          {files.map((file) => (
            <li key={file.id} className="file-item">
              <span className="file-name">{file.name}</span>
              <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
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

export default FileList;

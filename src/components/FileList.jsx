import React from 'react';
import FileDownload from './FileDownload';

function FileList({ files, onDownload }) {
  return (
    <div className="file-list">
      <h2>Your Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>
            {file.name}
            <FileDownload
              fileId={file.id}
              fileName={file.name}
              onDownload={onDownload}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
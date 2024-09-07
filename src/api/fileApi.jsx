// api/fileApi.js

// Mock user files
const mockFiles = {
    '123': [
      { id: '1', name: 'document.pdf', size: 1024000 },
      { id: '2', name: 'image.jpg', size: 2048000 },
      { id: '3', name: 'spreadsheet.xlsx', size: 512000 },
    ],
  };
  
  export const getUserFiles = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userFiles = mockFiles[userId];
        if (userFiles) {
          resolve(userFiles);
        } else {
          reject(new Error('User not found'));
        }
      }, 500);
    });
  };
  
  export const uploadFile = (userId, file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newFile = {
          id: Date.now().toString(),
          name: file.name,
          size: file.size,
        };
        mockFiles[userId].push(newFile);
        resolve(newFile);
      }, 1000);
    });
  };
  
  export const downloadFile = (userId, fileId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const file = mockFiles[userId].find((f) => f.id === fileId);
        if (file) {
          resolve(file);
        } else {
          reject(new Error('File not found'));
        }
      }, 1000);
    });
  };
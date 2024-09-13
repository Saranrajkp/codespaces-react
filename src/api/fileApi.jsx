const API_BASE_URL = '/api'; // This will work with the Vite proxy

export const getUserFiles = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/files`);
  if (!response.ok) throw new Error('Failed to fetch user files');
  return response.json();
};

export const uploadFile = async (userId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE_URL}/users/${userId}/files`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to upload file');
  return response.json();
};

export const downloadFile = async (userId, fileId) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/files/${fileId}`);
  if (!response.ok) throw new Error('Failed to download file');
  return response.blob();
};
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, Navigate } from 'react-router-dom';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import Login from './components/Login';
import { getUserFiles, uploadFile, downloadFile } from './api/fileApi';

function App() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserFiles();
    }
  }, [user]);

  const fetchUserFiles = async () => {
    try {
      const userFiles = await getUserFiles(user.id);
      setFiles(userFiles);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setFiles([]);
    localStorage.removeItem('user');
  };

  const handleFileUpload = async (file) => {
    try {
      await uploadFile(user.id, file);
      fetchUserFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDownload = async (fileId) => {
    try {
      const fileData = await downloadFile(user.id, fileId);
      // Implement file download logic here
      console.log('File downloaded:', fileData);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  function ProtectedRoute({ children }) {
    return user ? children : <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <h1>Dropbox Clone</h1>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/files">Files</Link></li>
            <li><Link to="/upload">Upload</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<ProtectedRoute><FileList files={files} onDownload={handleFileDownload} /></ProtectedRoute>} />
            <Route path="/files" element={<ProtectedRoute><FileList files={files} onDownload={handleFileDownload} /></ProtectedRoute>} />
            <Route path="/upload" element={<ProtectedRoute><FileUpload onUpload={handleFileUpload} /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
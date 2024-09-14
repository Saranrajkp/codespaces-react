import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
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
      const userFiles = await getUserFiles(user.username);
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
      await uploadFile(user.username, file);
      fetchUserFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDownload = async (fileId) => {
    try {
      const fileData = await downloadFile(user.username, fileId);
      // Implement file download logic here
      console.log('File downloaded:', fileData);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1 className="app-title">Dropbox Clone</h1>
          {user && (
            <nav className="app-nav">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/files">Files</Link></li>
                <li><Link to="/upload">Upload</Link></li>
              </ul>
            </nav>
          )}
        </div>
        <div className="header-right">
          {user ? (
            <div className="user-info">
              <span className="welcome-message">Welcome, {user.username}</span>
              <button className="btn btn-logout" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-login">Login</Link>
          )}
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} user={user} />} />
          {user ? (
            <>
              <Route path="/" element={<FileList files={files} onDownload={handleFileDownload} />} />
              <Route path="/files" element={<FileList files={files} onDownload={handleFileDownload} />} />
              <Route path="/upload" element={<FileUpload onUpload={handleFileUpload} />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
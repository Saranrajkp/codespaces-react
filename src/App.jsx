import React, { useState, useEffect } from 'react';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import FileList from './components/FileList';
import FileUpload from './components/FileUpload';
import FileDownload from './components/FileDownload';
import Login from './components/Login';
import { getUserFiles, uploadFile, downloadFile } from './api/fileApi';

function App() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);

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
  };

  const handleLogout = () => {
    setUser(null);
    setFiles([]);
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

  return (
    <Router>
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
        <main>
        <Router>
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/files">Files</Link>
        </li>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route path="/" element={<FileList />} />
      <Route path="/files" element={<FileList />} />
      <Route path="/upload" element={<FileUpload />} />
    </Routes>
  </div>
</Router>
        </main>
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EmailList from './components/EmailList';
import Compose from './components/Compose';

function App() {
  const [showCompose, setShowCompose] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex">
          <Sidebar onCompose={() => setShowCompose(true)} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<EmailList />} />
              <Route path="/inbox" element={<EmailList />} />
              <Route path="/starred" element={<EmailList />} />
              <Route path="/sent" element={<EmailList />} />
              <Route path="/drafts" element={<EmailList />} />
              <Route path="/trash" element={<EmailList />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        {showCompose && <Compose onClose={() => setShowCompose(false)} />}
      </div>
    </Router>
  );
}

export default App;
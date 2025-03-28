import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import EmailList from './components/EmailList';
import Compose from './components/Compose';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import ForgotPass from './pages/ForgotPass';

function App() {
  const [showCompose, setShowCompose] = React.useState(false);

  return (
    <Router>
      <AppContent showCompose={showCompose} setShowCompose={setShowCompose} />
    </Router>
  );
}

function AppContent({ showCompose, setShowCompose }) {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgotpassword';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && <Header />}
      <div className="flex">
        {!isAuthPage && <Sidebar onCompose={() => setShowCompose(true)} />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<EmailList />} />
            <Route path="/inbox" element={<EmailList />} />
            <Route path="/starred" element={<EmailList />} />
            <Route path="/sent" element={<EmailList />} />
            <Route path="/drafts" element={<EmailList />} />
            <Route path="/trash" element={<EmailList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgotpassword" element={<ForgotPass />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      {showCompose && !isAuthPage && <Compose onClose={() => setShowCompose(false)} />}
    </div>
  );
}

export default App;

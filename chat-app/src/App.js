import { Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import i18n from './i18n.js';
import Dashboard from './pages/Dashboard.jsx';
import SignUp from './pages/SignUp.jsx';
import PageLayout from './pages/PageLayout.jsx';
import LogIn from './pages/LogIn.jsx';
import HomePage from './pages/HomePage.jsx';
import Chat from './components/chat/Chat.jsx';

function App() {
  const [locale, setLocale] = useState(i18n.language);
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

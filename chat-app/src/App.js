import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

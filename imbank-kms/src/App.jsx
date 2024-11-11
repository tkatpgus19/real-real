import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import KioskPage from './pages/KioskPage';
import Header from './components/Header';
import KioskManagementPage from './pages/KioskManagementPage';
import ButtonPage from './pages/ButtonPage';
import ButtonEditPage from './pages/ButtonEditPage';
import TicketPage from './pages/TicketPage';
import TicketEditPage from './pages/TicketEditPage';
import LayoutPage from './pages/LayoutPage';
import CheckInactivity from './components/CheckInactivity';
import DashBoardPage from './pages/DashBoardPage';
function App() {
  const originalConsoleWarn = console.warn;
  console.warn = (message, ...args) => {
    if (typeof message === 'string' && message.includes('React Router Future Flag Warning')) {
      return;
    }
    originalConsoleWarn(message, ...args);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/main"
          element={
            <>
              <MainPage />
            </>
          }
        />
        <Route path="/kiosk" element={<KioskPage />} />
        <Route path="/kiosk/management" element={<KioskManagementPage />} />
        <Route path="/kiosk/button" element={<ButtonPage />} />
        <Route path="/kiosk/button/:buttonId" element={<ButtonEditPage />} />
        <Route path="/ticket" element={<TicketPage />} />
        <Route path="/ticket/:ticketId" element={<TicketEditPage />} />
        <Route path="/layout" element={<LayoutPage />} />
        <Route path="/dashboard/:id" element={<DashBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

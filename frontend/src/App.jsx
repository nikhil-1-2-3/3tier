import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BookPage from './pages/BookPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import MyBookingsPage from './pages/MyBookingsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HelpPage from './pages/HelpPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Button from './components/common/Button';

function NotFoundPage() {
  return (
    <div className="py-24 text-center max-w-md mx-auto px-4 space-y-4">
      <h1 className="text-6xl font-extrabold text-brand-600 font-mono">404</h1>
      <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
      <p className="text-sm text-slate-600">
        The requested page does not exist or has been moved.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Button variant="primary">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/booking/success" element={<BookingSuccessPage />} />
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <MyBookingsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboardPage />
                  </AdminRoute>
                }
              />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

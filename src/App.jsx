import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { CourseProvider } from './context/CourseProvider';
import { LessonProvider } from './context/LessonProvider';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import InviteCode from './pages/InviteCode';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CourseDetail from './pages/CourseDetail';
import Profile from './pages/Profile';
import Access from './pages/Access';
import MyLearning from './pages/MyLearning';
import ThankYou from './pages/ThankYou';
import ChangePassword from './pages/ChangePassword';
import MyPlan from './pages/MyPlan';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <LessonProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<InviteCode />} />
              <Route path="/membership/:slug/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/access" element={<Access />} />
              <Route path="/thankyou" element={<ThankYou />} />

              {/* Protected Routes with Layout */}
              <Route element={<Layout />}>
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/course/:courseId"
                  element={
                    <ProtectedRoute>
                      <CourseDetail />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/my-learning"
                  element={
                    <ProtectedRoute>
                      <MyLearning />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/change-password"
                  element={
                    <ProtectedRoute>
                      <ChangePassword />
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/my-plan"
                  element={
                    <ProtectedRoute>
                      <MyPlan />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Catch-all redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </LessonProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

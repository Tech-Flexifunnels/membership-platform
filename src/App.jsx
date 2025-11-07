import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CourseProvider } from "./context/CourseProvider";
import { LessonProvider } from "./context/LessonProvider";
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import InviteCode from "./pages/InviteCode";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";
import Profile from "./pages/Profile";
import Access from "./pages/Access";
import MyLearning from "./pages/MyLearning";
import ThankYou from "./pages/ThankYou";
import ChangePassword from "./pages/ChangePassword";
import MyPlan from "./pages/MyPlan";
import ResetPassword from "./pages/ResetPassword";
import { Helmet } from "react-helmet";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <LessonProvider>
            <Helmet>
              <title>Flexi Funnels - Access Your Events</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
              />
              <meta name="description" content="" />
              <link rel="canonical" href="mdkemz.flexifunnels.com" />
              <meta property="og:url" content="mdkemz.flexifunnels.com" />
              <meta itemprop="url" content="mdkemz.flexifunnels.com" />
              <meta name="twitter:url" content="mdkemz.flexifunnels.com" />
              <meta property="og:site_name" content="My Learning" />
              <meta property="og:title" content="My Learning" />
              <meta property="og:type" content="website" />
              <meta property="og:description" content="" />
              <meta property="og:image" content="" />
              <meta itemprop="name" content="My Learning" />
              <meta itemprop="description" content="" />
              <meta name="twitter:title" content="My Learning" />
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:description" content="" />
              <meta name="category_id" content="17" />
              <meta name="keywords" content="" />
              <meta name="author" content="" />
              {/* 0xq22mj7 */}
              {/* <meta name="funnel_id" content={"lVdK0xq22Mj7g9Rm"} />
              <meta name="funnel_page_id" content={"1BwmZx9P4BVrNkbR"} /> */}
              {/* 9xxwx1rx */}
              <meta name="funnel_id" content={"kBDp9xXWX1rXoyK5"} />
              <meta name="funnel_page_id" content="MyYRpx09299j8Vq4" />
            </Helmet>
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
                  path="/membership/:slug/dashboard"
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
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </LessonProvider>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

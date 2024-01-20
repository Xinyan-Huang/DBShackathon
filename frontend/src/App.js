import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/login/login';
import AuthProvider from './Auth';
import Account from './pages/account/account';
import DestinationDashboardPage from './pages/page1/page1';
import Page2 from './pages/page2/page2';
import Page3 from './pages/page3/page3';
import Header from './components/Header';
import ProtectedRoute from './pages/protectedRoute';
import LogoutPage from './pages/logout/logout';
import Title from './components/Title';
import Dashboard from './pages/dashboard/dashboard'

function App() {
  const Layout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const localJwtToken = localStorage.getItem("jwtToken");
    const sessionJwtToken = sessionStorage.getItem("jwtToken");

    const isAuthenticated = localJwtToken || sessionJwtToken;

    if (!isAuthenticated) {
      navigate("/login");
    }

    // Check if the current route is not the login page
    const showHeader = location.pathname !== '/login';
    const headerHeight = '00px';
    const routeTitles = {
      '/account': 'Account',
      '/page1': 'Page 1',
      '/page2': 'Page 2',
      '/page3': 'Page 3',
    };
    const title = routeTitles[location.pathname];

    return (
      <>
        {showHeader && <Header />}
        {/* {title && <Title title={title} />} */}
        <div style={showHeader ? { paddingTop: headerHeight } : {}}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="/destination" element={<ProtectedRoute><DestinationDashboardPage /></ProtectedRoute>} />
            <Route path="/page2" element={<ProtectedRoute><Page2 /></ProtectedRoute>} />
            <Route path="/page3" element={<ProtectedRoute><Page3 /></ProtectedRoute>} />
            <Route path="/logout" element={<ProtectedRoute><LogoutPage /></ProtectedRoute>} />
            {/* Other routes here */}
          </Routes>
        </div>
      </>
    );
  };
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;
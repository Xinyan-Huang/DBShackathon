import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/login/login';
import AuthProvider from './Auth';
import Account from './pages/account/account';
import Page1 from './pages/page1/page1';
import Page2 from './pages/page2/page2';
import Page3 from './pages/page3/page3';
import Header from './components/Header';
import ProtectedRoute from './pages/protectedRoute';
import Title from './components/Title';
import Dashboard from './pages/dashboard/dashboard'

function App() {
  const Layout = () => {
    const location = useLocation();

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
            <Route path="/account" element={<Account />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/dashboard" element={<Dashboard/>} />

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
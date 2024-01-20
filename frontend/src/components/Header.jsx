import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // Import icons
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const headerStyle = {
    backgroundColor: '#232323',
    padding: isExpanded ? '10px' : '10px 0',
    position: 'fixed',
    height: '100vh',
    top: 0,
    left: 0,
    zIndex: 1000,
    width: isExpanded ? '200px' : '50px',
    transition: 'width 0.3s',
  };

  const navStyle = {
    display: 'flex',
    flexDirection: 'column', // Stack links vertically
    alignItems: 'center',
    height: '100%',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '10px 0', // Spacing between links
  };

  const renderLink = (to, IconComponent, text) => {
    return (
      <Link to={to} style={linkStyle}>
        <Box display="flex" alignItems="center">
          <IconComponent style={{ marginRight: isExpanded ? '10px' : '0', minWidth: '24px' }} />
          {isExpanded && <span>{text}</span>}
        </Box>
      </Link>
    );
  };

  return (
    <header style={headerStyle} onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
      <nav style={navStyle}>

        {renderLink('/itinerary', DashboardIcon, 'Itinerary')}
        {renderLink('/destination', AddLocationIcon, 'Destination')}
        {/* Add other navigation links as needed */}
        {renderLink('/logout', LogoutIcon, 'Logout')}
      </nav>
    </header>
  );
};

export default Header;
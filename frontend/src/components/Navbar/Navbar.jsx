import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

const pages = ['Home', 'Services', 'About Us', 'Contact'];
const settings = ['Profile', 'Account', 'Logout'];
const reportsOptions = ['Reports', 'Calculators'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElReports, setAnchorElReports] = React.useState(null); // State for Reports dropdown

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenReportsMenu = (event) => {
    setAnchorElReports(event.currentTarget);
  };

  const handleCloseReportsMenu = () => {
    setAnchorElReports(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#125488' }}> {/* Set the background color */}
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <a href="/">
            <img 
              src="/Health.png" 
              alt="MyWebsite Logo" 
              style={{ height: '50px', width: 'auto' }}
            />
          </a>
        </Box>

        {/* Responsive Menu for smaller screens */}
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="menu"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Button href={`/${page.toLowerCase().replace(' ', '')}`}>
                  {page}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        {/* Menu items for larger screens */}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            page === 'Services' ? (
              <Box
                key={page}
                onMouseEnter={handleOpenReportsMenu}
                onMouseLeave={handleCloseReportsMenu}
              >
                <Button
                  href="#"
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    transition: 'transform 0.1s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  {page}
                </Button>
                <Menu
                  id="reports-menu"
                  anchorEl={anchorElReports}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElReports)}
                  onClose={handleCloseReportsMenu}
                >
                  {reportsOptions.map((report) => (
                    <MenuItem key={report} onClick={handleCloseReportsMenu}>
                      <Button href={`/${report.toLowerCase().replace(' ', '')}`}>
                        {report}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                key={page}
                href={`/${page.toLowerCase().replace(' ', '')}`}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  transition: 'transform 0.1s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                {page}
              </Button>
            )
          ))}
        </Box>

        {/* User Avatar and Settings Menu */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/164600.png" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

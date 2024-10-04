import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

import RemoveCookie from "../../hooks/removecookie";

const pages = ["Home", "About Us", "Our Services", "Contact us"];
const settings = ["User Profile", "Logout"];
const reportsOptions = ["Reports", "Calculators"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElReports, setAnchorElReports] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [fontColor, setFontColor] = useState("white");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setBackgroundColor("#125488");
        setFontColor("white");
      } else {
        setBackgroundColor("transparent");
        setFontColor("white");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const handleLogout = () => {
    RemoveCookie("userEmail");
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: backgroundColor, transition: "background-color 0.3s ease" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Link to="/">
            <img
              src="/logo.png"
              alt="MyWebsite Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Link
                  to={`/${page.toLowerCase().replace(" ", "-")}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Typography
                    sx={{
                      transition: "color 0.3s ease",
                      "&:hover": {
                        color: "lightblue",
                      },
                    }}
                  >
                    {page}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {pages.map((page) =>
            page === "Our Services" ? (
              <Box
                key={page}
                onMouseEnter={handleOpenReportsMenu}
                onMouseLeave={handleCloseReportsMenu}
                sx={{ position: "relative", marginRight: 4 }} // Increased margin right
              >
                <Typography
                  sx={{
                    my: 2,
                    color: fontColor,
                    display: "block",
                    transition: "color 0.3s ease",
                    "&:hover": {
                      color: "lightblue",
                    },
                  }}
                >
                  <Link
                    to="/services"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {page}
                  </Link>
                </Typography>
                <Menu
                  id="reports-menu"
                  anchorEl={anchorElReports}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElReports)}
                  onClose={handleCloseReportsMenu}
                >
                  {reportsOptions.map((report) => (
                    <MenuItem key={report} onClick={handleCloseReportsMenu}>
                      <Link
                        to={`/${report.toLowerCase().replace(" ", "-")}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Typography
                          sx={{
                            transition: "color 0.3s ease",
                            "&:hover": {
                              color: "lightblue",
                            },
                          }}
                        >
                          {report}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Typography
                key={page}
                sx={{
                  my: 2,
                  color: fontColor,
                  display: "block",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "lightblue",
                  },
                  marginRight: 4, // Increased margin right
                }}
              >
                <Link
                  to={`/${page.toLowerCase().replace(" ", "-")}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {page}
                </Link>
              </Typography>
            )
          )}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Profile">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src="/164600.png" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) =>
              setting === "Logout" ? (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ) : (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link
                    to={`/${setting.toLowerCase().replace(" ", "-")}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <Typography>{setting}</Typography>
                  </Link>
                </MenuItem>
              )
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

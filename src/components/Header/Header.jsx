import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext/UserContext";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { AccountCircle, ExitToApp } from "@mui/icons-material";
import { SigninAndSignup, SpanHeader } from "./stylesHeader";
import PropTypes from "prop-types";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Header(props) {
  const pages = [
    { id: "showing", label: "Lịch chiếu" },
    { id: "cinema", label: "Cụm rạp" },
    // { id: "tintuc", label: "Tin tức" },
    // { id: "ungdung", label: "Ứng dụng" },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();
  const { currentUser, handleSignout } = useUserContext();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    navigate(`/`);
    const element = document.getElementById(`${page.id}`);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      handleSignout();
    }
  };

  return (
    <>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar color="default">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <LiveTvIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                color="error"
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#d32f2f",
                  textDecoration: "none",
                }}
              >
                KHÁNH PHONG MOVIE
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
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
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.id}
                      onClick={() => handleCloseNavMenu(page)}
                    >
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <LiveTvIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                color="error"
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "#d32f2f",
                  textDecoration: "none",
                }}
              >
                Movie
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
                justifyContent="center"
              >
                {pages.map((page) => (
                  <Button
                    key={page.id}
                    onClick={() => handleCloseNavMenu(page)}
                    sx={{
                      my: 2,
                      color: "black",
                      display: "block",
                      margin: "0 10px",
                    }}
                  >
                    {page.label}
                  </Button>
                ))}
              </Box>

              {/* Account */}
              {currentUser ? (
                <>
                  <Box sx={{ flexGrow: 0, borderRight: 1 }}>
                    <IconButton
                      sx={{
                        "&:hover": {
                          color: "rgb(211, 47, 47) ",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <Typography onClick={() => navigate(`/admin`)}>
                        Bạn có phải là Admin?
                      </Typography>
                    </IconButton>
                  </Box>
                  <Box
                    sx={{ flexGrow: 0, borderRight: 1, pr: 1 }}
                    display={"inline-block"}
                  >
                    <Tooltip title="User">
                      <IconButton
                        onClick={handleOpenUserMenu}
                        sx={{
                          p: 0,
                          "&:hover": {
                            color: "rgb(211, 47, 47) ",
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        <AccountCircle fontSize="large" />
                        <Typography>{currentUser.hoTen}</Typography>
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
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => handleCloseUserMenu(setting)}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  <IconButton
                    sx={{
                      "&:hover": {
                        color: "rgb(211, 47, 47) ",
                        backgroundColor: "transparent",
                      },
                    }}
                    onClick={handleSignout}
                  >
                    <ExitToApp />
                    <Typography>Đăng xuất</Typography>
                  </IconButton>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup
                      onClick={() => navigate(`/admin`)}
                      borderRight="1px solid #9e9e9e"
                    >
                      <SpanHeader>Bạn có phải là Admin?</SpanHeader>
                    </SigninAndSignup>
                  </Box>

                  {/* Signin */}
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup
                      onClick={() => navigate(`/sign-in`)}
                      borderRight="1px solid #9e9e9e"
                    >
                      <Tooltip title="Đăng nhập">
                        <AccountCircle fontSize="large" />
                      </Tooltip>
                      <SpanHeader>Đăng nhập</SpanHeader>
                    </SigninAndSignup>
                  </Box>

                  {/* Signup */}
                  <Box sx={{ flexGrow: 0 }}>
                    <SigninAndSignup onClick={() => navigate(`/sign-up`)}>
                      <Tooltip title="Đăng kí">
                        <AccountCircle fontSize="large" />
                      </Tooltip>
                      <SpanHeader>Đăng kí</SpanHeader>
                    </SigninAndSignup>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </ElevationScroll>
    </>
  );
}

import {
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTES } from "../../constant/routes";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AppBar } from "../topbar/TopbarComponents";
import { useAuth } from "../../services/FirebaseAuthContext";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../images/logo.jpg";

export default function Navbar() {
  const { currentUser, signOut } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState();
  const [anchorElUser, setAnchorElUser] = useState();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser();
  };

  const pages = ["Products", "Pricing", "Blog"];


  return (
    <AppBar position="static" elevation={0} sx={{ py: 2 }}>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: { sm: "flex", md: "none" },
            }}
          >
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
                display: { sm: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <img
            src={Logo}
            alt=""
            width={100}
            onClick={() => navigate(ROUTES.HOME)}
          />

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box>
            <Button
              onClick={handleOpenUserMenu}
              sx={{ p: { xs: 0.3, md: 1 }, color: "black" }}
            >
              <Typography
                sx={{
                  mr: 2,
                  fontSize: "14px",
                  display: { xs: "none", md: "block" },
                }}
              >
                Hi, {currentUser.displayName || currentUser.email.split("@")[0]}
              </Typography>
              <Avatar alt="Photo" src={currentUser.photoURL || ""} />
              <ArrowDropDownIcon
                sx={{ display: { xs: "block", md: "none" }, ml: 1 }}
              />
            </Button>
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
              <Typography
                sx={{
                  my: 1,
                  mx: 2,
                  fontSize: "14px",
                  display: { xs: "block", md: "none" },
                }}
              >
                Hi,{" "}
                {currentUser.displayName.split(" ")[0] ||
                  currentUser.email.split("@")[0]}
              </Typography>
              <MenuItem key={0} onClick={handleCloseUserMenu}>
                <Link
                  to={ROUTES.HOME}
                  className="link"
                  style={{ display: "flex" }}
                >
                  <HomeIcon sx={{ fontSize: 22, mr: 1 }} />
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={1} onClick={handleCloseUserMenu}>
                <Link
                  to={ROUTES.PROFILE}
                  className="link"
                  style={{ display: "flex" }}
                >
                  <PersonOutlineIcon sx={{ fontSize: 22, mr: 1 }} />
                  <Typography textAlign="center">Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={2} onClick={handleCloseUserMenu}>
                <Link
                  to={ROUTES.DASHBOARD}
                  className="link"
                  style={{ display: "flex" }}
                >
                  <DashboardIcon sx={{ fontSize: 22, mr: 1 }} />
                  <Typography textAlign="center">Dashboard</Typography>
                </Link>
              </MenuItem>
              <MenuItem
                key={3}
                onClick={handleLogout}
                style={{ display: "flex" }}
              >
                <LogoutIcon sx={{ fontSize: 22, mr: 1 }} />
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

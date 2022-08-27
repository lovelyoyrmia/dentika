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
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ROUTES } from "../../constant/routes";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { AppBar } from "../topbar/TopbarComponents";
import { useAuth } from "../../services/FirebaseAuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "../../images/logo.jpg";
import { ListSidebar } from "../../constant/constants";

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
    <>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ py: 2, zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
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

            <Box sx={{ display: { md: "none", xs: "block" } }}>
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
                  Hi,{" "}
                  {currentUser.displayName || currentUser?.email.split("@")[0]}
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
                {ListSidebar.map((side) => {
                  let path = side.path.replace("/profile", "");
                  path = `${ROUTES.PROFILE}/${path}`;
                  return (
                    <MenuItem key={side.id} onClick={handleCloseUserMenu}>
                      <Link
                        to={path}
                        className="link"
                        style={{ display: "flex" }}
                      >
                        {side.icon}
                        <Typography sx={{ ml: 1 }} textAlign="center">
                          {side.name}
                        </Typography>
                      </Link>
                    </MenuItem>
                  );
                })}
                <MenuItem
                  key={10}
                  onClick={handleLogout}
                  style={{ display: "flex" }}
                >
                  <LogoutIcon />
                  <Typography sx={{ ml: 1 }} textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ display: { md: "flex", xs: "none" } }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    mr: 2,
                    fontFamily: "Source Sans Pro",
                  }}
                >
                  Hi,{" "}
                  {currentUser.displayName || currentUser?.email.split("@")[0]}
                </Typography>
              </div>
              <div
                onClick={() => {
                  navigate(ROUTES.PROFILE);
                }}
                style={{ cursor: "pointer" }}
              >
                <Avatar alt="Photo" src={currentUser.photoURL || ""} />
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

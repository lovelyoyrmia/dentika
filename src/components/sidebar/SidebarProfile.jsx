import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Badge,
} from "@mui/material";
import Logo from "../../images/logo.jpg";
import { ListSidebar } from "../../constant/constants";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../services/FirebaseAuthContext";
import { ROUTES } from "../../constant/routes";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import MedicationIcon from "@mui/icons-material/Medication";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

export default function SidebarProfile() {
  const { signOut } = useAuth();
  const drawerWidth = 240;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ display: { sm: "none", md: "flex", xs: "none" } }}>
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ py: 3.5 }}>
          <img src={Logo} alt="" width={100} />
        </Toolbar>
        <Divider />
        <List>
          {ListSidebar.map((side) => (
            <ListItem key={side.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(side.path);
                }}
              >
                <ListItemIcon>
                  <Badge>{side.icon}</Badge>
                </ListItemIcon>
                <ListItemText primary={side.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem key={1} disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Sign Out"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

import { Avatar, Box, IconButton, Menu, Tooltip } from "@mui/material";

import Settings from "@mui/icons-material/Settings";
import * as React from "react";
import { ColorSwitches } from "./ColorSwitch";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import MenuItem from "@mui/material/MenuItem";
import { stringAvatar } from "../utils/stringAvatar";
import MoreIcon from "@mui/icons-material/MoreVert";

export const SettingsHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    // <Tooltip title="Settings">
    //   <IconButton
    //     size="large"
    //     aria-label="show more"
    //     aria-controls={menuId}
    //     aria-haspopup="true"
    //     onClick={handleProfileMenuOpen}
    //     color="inherit"
    //     sx={{
    //       "& svg": {
    //         color: "rgba(255,255,255,0.8)",
    //       },
    //     }}
    //   >
    //     <Settings />
    //   </IconButton>
    //   <Menu
    //     anchorEl={anchorEl}
    //     anchorOrigin={{
    //       vertical: "top",
    //       horizontal: "right",
    //     }}
    //     id={menuId}
    //     keepMounted
    //     transformOrigin={{
    //       vertical: "top",
    //       horizontal: "right",
    //     }}
    //     open={isMenuOpen}
    //     onClose={handleMenuClose}
    //   >
    //     <MenuItem onClick={handleMenuClose}>
    //       <div>
    //         <ColorSwitches />
    //       </div>
    //     </MenuItem>
    //     <MenuItem onClick={handleMenuClose}>
    //       <div>
    //         <HeaderSelectLeague />
    //       </div>
    //     </MenuItem>
    //   </Menu>
    // </Tooltip>
    <>
      <Box
        sx={{ display: { xs: "none", md: "flex", justifyContent: "center" } }}
      >
        <IconButton
          title="Settings"
          size="large"
          aria-label="Settings"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="success"
        >
          <Settings />
        </IconButton>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="Settings"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <Settings />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <HeaderSelectLeague />
        </MenuItem>
        <MenuItem>
          <ColorSwitches />
        </MenuItem>
      </Menu>
    </>
  );
};

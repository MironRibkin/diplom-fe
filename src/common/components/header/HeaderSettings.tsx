import { Box, IconButton, Menu } from "@mui/material";

import Settings from "@mui/icons-material/Settings";
import * as React from "react";
import { ColorSwitches } from "./HeaderColorSwitch";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import MenuItem from "@mui/material/MenuItem";

export const HeaderSettings = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
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
        onClose={() => setAnchorEl(null)}
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

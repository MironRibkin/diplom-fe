import * as React from "react";
import { AppBar, Avatar, Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { ColorSwitches } from "./ColorSwitch";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "../../features/Admin/api/usersApi";
import { stringAvatar } from "../utils/stringAvatar";
import { HeaderSearchApp } from "./HeaderSearchApp";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { SettingsHeader } from "./SettingsHeader";

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const { data } = useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token"),
  });

  return (
    <Box sx={{ flexGrow: 3 }}>
      <AppBar
        position="sticky"
        color="default"
        sx={{
          height: 140,
          display: "flex",
          justifyContent: "center",
          borderBottomRadius: "25px",
        }}
      >
        <Toolbar>
          <HomeIcon
            color="success"
            fontSize="large"
            sx={{ cursor: "pointer", marginRight: "20px" }}
            onClick={() => navigate("/Home")}
          />
          <HeaderSearchApp />
          <Box sx={{ flexGrow: 1 }} />
          <Box
            display="flex"
            alignItems="center"
            marginRight="10px"
            marginLeft="10px"
          >
            <SettingsHeader />
          </Box>
          {localStorage.getItem("token") ? (
            <>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    {...stringAvatar(data?.userName || "", data?.userName)}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <Button onClick={() => navigate("/login")}>
              {t("common.header.menu.login")}
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
        <MenuItem onClick={() => navigate(`/myProfile/${data?.id}`)}>
          <div>{t("common.header.menu.profile")}</div>
        </MenuItem>

        {data?.role === "admin" && (
          <MenuItem onClick={() => navigate("/admin")}>
            <div>{t("common.header.menu.myAccount")}</div>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            localStorage.setItem("token", "");
            navigate("/login");
          }}
        >
          <div>
            {/*{localStorage.getItem("token") && (*/}
            <div>{t("common.header.menu.logOut")}</div>
          </div>
        </MenuItem>
      </Menu>
    </Box>
  );
}

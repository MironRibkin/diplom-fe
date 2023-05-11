import * as React from "react";
import { FC } from "react";
import { AppBar, Avatar, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "../../../features/Admin/api/usersApi";
import { HeaderToolbar } from "./HeaderToolbar";
import IconButton from "@mui/material/IconButton";
import { stringAvatar } from "../../utils/stringAvatar";
import MoreIcon from "@mui/icons-material/MoreVert";

const menuId = "primary-search-account-menu";

export const Header: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const { data } = useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token"),
  });

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
        <HeaderToolbar>
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
              <Avatar {...stringAvatar(data?.userName)} />
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
        </HeaderToolbar>
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
        onClose={() => setAnchorEl(null)}
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
            <div>{t("common.header.menu.logOut")}</div>
          </div>
        </MenuItem>
      </Menu>
    </Box>
  );
};

import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { AppBar, Avatar, Box, Button, Fab } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { ColorSwitches } from "./ColorSwitch";
import { HeaderSelectLeague } from "./HeaderSelectLeague";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "../../features/Admin/api/usersApi";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "25px",
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  borderRadius: 500,
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "35px",
    [theme.breakpoints.up("md")]: {
      maxWidth: "150ch",
      width: "130ch",
      minWidth: "50ch",
    },
  },
}));

export function Header() {
  // function stringToColor(string: string) {
  //   let hash = 0;
  //   let i;
  //
  //   for (i = 0; i < string.length; i += 1) {
  //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //
  //   let color = "#";
  //
  //   for (i = 0; i < 3; i += 1) {
  //     const value = (hash >> (i * 8)) & 0xff;
  //     color += `00${value.toString(16)}`.slice(-2);
  //   }
  //
  //   return color;
  // }
  //
  // function stringAvatar(name: string) {
  //   return {
  //     sx: {
  //       bgcolor: stringToColor(name),
  //     },
  //     children: `${name.split(" ")[0][0]}`,
  //   };
  // }

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

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
        }}
      >
        <Toolbar>
          <Box bgcolor="green" borderRadius="27px" padding="5px">
            <Typography
              // variant="h3"
              noWrap
              color="white"
              component="div"
              fontSize="27px"
              fontFamily={"Fira Mono, monospace"}
              sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
              onClick={() => navigate("/Home")}
            >
              REVIEWS
            </Typography>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box display="flex" alignItems="center" marginRight="30px">
            <ColorSwitches />
            <HeaderSelectLeague />
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
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  {/*<Avatar {...stringAvatar({data.userName})} />*/}
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
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
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>{t("common.header.menu.profile")}</p>
        </MenuItem>
      </Menu>
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
        <MenuItem onClick={handleMenuClose}>
          <div onClick={() => navigate(`/myProfile/${data?.id}`)}>
            {t("common.header.menu.profile")}
          </div>
        </MenuItem>

        {data?.role === "admin" && (
          <MenuItem onClick={handleMenuClose}>
            <div onClick={() => navigate("/admin")}>
              {t("common.header.menu.myAccount")}
            </div>
          </MenuItem>
        )}
        <MenuItem onClick={handleMenuClose}>
          <div>
            {localStorage.getItem("token") && (
              <div
                onClick={() => {
                  localStorage.setItem("token", "");
                  navigate("/login");
                }}
              >
                {t("common.header.menu.logOut")}
              </div>
            )}
          </div>
        </MenuItem>
      </Menu>
    </Box>
  );
}

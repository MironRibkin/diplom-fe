import * as React from "react";
import { FC, ReactNode } from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { HeaderSearchApp } from "./HeaderSearchApp";
import { Box, Button } from "@mui/material";
import { HeaderSettings } from "./HeaderSettings";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IProps {
  children: ReactNode;
}

export const HeaderToolbar: FC<IProps> = ({ children }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Toolbar>
      <SvgIcon
        color="success"
        fontSize="large"
        sx={{ cursor: "pointer", marginRight: "20px" }}
        onClick={() => navigate("/home")}
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
      <HeaderSearchApp />
      <Box sx={{ flexGrow: 1 }} />
      <Box
        display="flex"
        alignItems="center"
        marginRight="10px"
        marginLeft="10px"
      >
        <HeaderSettings />
      </Box>
      {localStorage.getItem("token") ? (
        children
      ) : (
        <Button onClick={() => navigate("/login")}>
          {t("common.header.menu.login")}
        </Button>
      )}
    </Toolbar>
  );
};

import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Fab,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Header } from "../../common/components/Header";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import { useTranslation } from "react-i18next";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function UserProfile() {
  const { t } = useTranslation();
  const colection = [1, 2, 4];
  const navigate = useNavigate();
  return (
    <Paper sx={{ width: "100%", mb: 2, height: "100%" }}>
      <Header />

      <Box margin="5px">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/home")}
            >
              {t("breadcrumbs.home")}
            </Link>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/myProfile")}
            >
              {t("breadcrumbs.profile")}
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
      <Box width="100%" height="30ch" display="flex" alignItems="center">
        <Box
          borderRadius="25px"
          width="90%"
          height="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          padding="10px"
          gap="6px"
        >
          <Avatar
            sx={{
              textAlign: "center",
              width: "120px",
              height: "120px",
            }}
          />
          <Typography variant="h3">MY NAME</Typography>
          <Typography fontSize="15px">MY EMAIL </Typography>
          <Typography variant="h6">Мои работы</Typography>
        </Box>
        <Box width="10%" height="100%">
          <Button
            color="success"
            sx={{
              border: "1px solid",
              borderRadius: "25px",
              textAlign: "center",
              width: "100px",
              height: "50px",
              fontSize: "20px",
              hover: "none",
            }}
          >
            ADD
          </Button>
        </Box>
      </Box>
      {/*<MaterialTable></MaterialTable>*/}
    </Paper>
  );
}

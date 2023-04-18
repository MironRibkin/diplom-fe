import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Fab,
  Link,
  ListItemIcon,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Header } from "../../../common/components/Header";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import MaterialTable from "@material-table/core";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { Settings } from "@mui/icons-material";
import { useState } from "react";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function UserProfile() {
  const [rowSelection, setRowSelection] = useState({});
  const { t } = useTranslation();
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
      </Box>
      <MaterialReactTable
        enableColumnFilters={false}
        data={[
          { id: "1", name: "miron", author: "me", records: "cars" },
          { id: "2", name: "you", author: "we", records: "cats" },
        ]}
        localization={
          i18n.language === "en" ? MRT_Localization_EN : MRT_Localization_RU
        }
        renderTopToolbarCustomActions={({ table }) => (
          <Stack direction="row" gap="12px" alignItems="space-between" mt="4px">
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
          </Stack>
        )}
        muiSearchTextFieldProps={{
          variant: "outlined",
        }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{
          rowSelection,
          // isLoading: isCollectionLoading,
        }}
        enableRowActions
        renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
          <MenuItem
            key={0}
            onClick={() => {
              // setOpenId(original.id);
              closeMenu();
            }}
          >
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            edit
          </MenuItem>,
        ]}
        columns={[
          {
            accessorKey: "id",
            header: "id",
          },
          {
            accessorKey: "name",
            header: "name",
          },
          {
            accessorKey: "author",
            header: "author",
          },
          {
            accessorKey: "records",
            header: "records",
          },
        ]}
      />
    </Paper>
  );
}

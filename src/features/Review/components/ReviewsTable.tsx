import React, { FC, useState } from "react";
import i18n from "i18next";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import {
  Box,
  Button,
  Chip,
  ListItemIcon,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
// import { LoadingButton } from "@mui/lab";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Delete, DeleteForever, Settings } from "@mui/icons-material";
import MaterialReactTable from "material-react-table";
import { useDeleteReviewMutation, useGetReviewsQuery } from "../api/recordsApi";
import { useParams } from "react-router-dom";
import { AddReviewModal } from "./AddReviewModal";
import { useTranslation } from "react-i18next";
import { ChipDelete } from "@mui/joy";

export const ReviewsTable: FC = () => {
  const [rowSelection, setRowSelection] = useState({});
  const { id } = useParams();
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const { data, isLoading } = useGetReviewsQuery(id || "");
  const { t } = useTranslation();
  const [deleteReview] = useDeleteReviewMutation();
  const deviceMediaQuery = useMediaQuery("(min-width:850px)");

  return (
    <>
      {isReviewModalOpen && (
        <AddReviewModal onClose={() => setReviewModalOpen(false)} />
      )}

      <MaterialReactTable
        enableColumnFilters={false}
        data={data || []}
        localization={
          i18n.language === "en" ? MRT_Localization_EN : MRT_Localization_RU
        }
        renderTopToolbarCustomActions={({ table }) => (
          // <Stack direction="row" gap="12px" alignItems="space-between" mt="4px">
          <Box
            sx={{
              "& > :not(style)": {
                m: 2,
              },
            }}
          >
            <Button
              color="success"
              placeholder="add new record"
              aria-label="add"
              sx={{
                borderRadius: "50px",
              }}
              onClick={() => setReviewModalOpen(true)}
            >
              <AddCircleOutlineSharpIcon
                cursor="pointer"
                // sx={{ color: green[500] }}
              >
                add
              </AddCircleOutlineSharpIcon>
            </Button>
          </Box>
        )}
        muiSearchTextFieldProps={{
          variant: "outlined",
        }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{
          rowSelection,
          isLoading: isLoading,
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
              <Button
                variant="contained"
                size="small"
                startIcon={<Delete />}
                color="error"
                sx={{
                  textTransform: "none",
                  "& .MuiButton-startIcon": { margin: { xs: 0 } },
                }}
                onClick={() => deleteReview(original.id)}
              >
                {deviceMediaQuery ? "delete" : undefined}
              </Button>
            </ListItemIcon>
            {/*edit*/}
          </MenuItem>,
        ]}
        columns={[
          {
            accessorKey: "id",
            header: "id",
          },
          {
            accessorKey: "title",
            header: `${t("reviews.table.header.title")}`,
          },
          {
            accessorKey: "recordTitle",
            header: `${t("reviews.table.header.recordTitle")}`,
          },
          {
            accessorKey: "description",
            header: `${t("reviews.table.header.description")}`,
          },
          // {
          //   accessorKey: "rating",
          //   header: "rating",
          // },
          {
            accessorKey: "theme",
            header: `${t("reviews.table.header.theme")}`,
          },
          {
            accessorKey: "date",
            header: `${t("reviews.table.header.date")}`,
          },
        ]}
      />
    </>
  );
};

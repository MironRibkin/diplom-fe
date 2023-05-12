import React, { FC, useState } from "react";
import i18n from "i18next";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { Box, Button, ListItemIcon, MenuItem } from "@mui/material";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Delete, Edit } from "@mui/icons-material";
import MaterialReactTable from "material-react-table";
import {
  useDeleteReviewMutation,
  useGetReviewQuery,
  useGetReviewsQuery,
} from "../api/reviewApi";
import { useNavigate, useParams } from "react-router-dom";
import { AddReviewModal } from "./AddReviewModal";
import { useTranslation } from "react-i18next";
import { EditReviewModal } from "./EditReviewModal";

export const ReviewsTable: FC = () => {
  const [openId, setOpenId] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});
  const { id } = useParams();
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const { data, isLoading } = useGetReviewsQuery(id || "");
  const { t } = useTranslation();
  const [deleteReview] = useDeleteReviewMutation();
  const navigate = useNavigate();
  const { data: reviewData, isLoading: isReviewLoading } = useGetReviewQuery(
    openId,
    {
      skip: !openId,
    }
  );

  return (
    <>
      {isReviewModalOpen && (
        <AddReviewModal onClose={() => setReviewModalOpen(false)} />
      )}
      {openId && !isReviewLoading && (
        <EditReviewModal
          onClose={() => setOpenId("")}
          reviewData={reviewData}
          reviewId={openId}
        />
      )}
      <MaterialReactTable
        enableColumnFilters={false}
        data={data || []}
        localization={
          i18n.language === "en" ? MRT_Localization_EN : MRT_Localization_RU
        }
        renderTopToolbarCustomActions={({ table }) => (
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
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {
            navigate(`/reviewPage/${row.original.id}`);
          },
          sx: {
            cursor: "pointer",
          },
        })}
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
                {t("admin.toolbar.delete")}
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<Edit />}
                sx={{
                  marginLeft: "4px",
                  textTransform: "none",
                  "& .MuiButton-startIcon": { margin: { xs: 0 } },
                }}
                onClick={() => {
                  setOpenId(original.id);
                }}
              >
                {t("reviews.modal.button.editButton")}
              </Button>
            </ListItemIcon>
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
          {
            accessorKey: "theme",
            header: `${t("reviews.table.header.theme")}`,
            Cell: ({ row: { original } }) =>
              t(`general.themes.${original.theme}`),
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

import React, { FC, useState } from "react";
import i18n from "i18next";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { Box, Button, ListItemIcon, MenuItem } from "@mui/material";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { green } from "@mui/material/colors";
import { Settings } from "@mui/icons-material";
import MaterialReactTable from "material-react-table";
import { useGetReviewsQuery } from "../api/recordsApi";
import { useLocation, useParams } from "react-router-dom";
import { ReviewModal } from "./ReviewModal";

export const ReviewsTable: FC = () => {
  const [rowSelection, setRowSelection] = useState({});
  const { id } = useParams();
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const { data, isLoading } = useGetReviewsQuery(id || "");
  console.log(data);

  return (
    <>
      {isReviewModalOpen && (
        <ReviewModal onClose={() => setReviewModalOpen(false)} />
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
            accessorKey: "title",
            header: "title",
          },
          {
            accessorKey: "recordTitle",
            header: "record title",
          },
          {
            accessorKey: "description",
            header: "description",
          },
          // {
          //   accessorKey: "rating",
          //   header: "rating",
          // },
          {
            accessorKey: "theme",
            header: "theme",
          },
          {
            accessorKey: "date",
            header: "date",
          },
        ]}
      />
    </>
  );
};

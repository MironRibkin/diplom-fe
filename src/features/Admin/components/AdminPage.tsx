import React, { FC, useState } from "react";
import { Button, ListItemIcon, MenuItem } from "@mui/material";
import {
  useAppointAdminMutation,
  useBanUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useRemoveAdminMutation,
  useUnBanUserMutation,
} from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MaterialReactTable from "material-react-table";
import i18n from "i18next";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_RU } from "material-react-table/locales/ru";
import { Delete, PanoramaFishEye } from "@mui/icons-material";
import { PageWrapper } from "../../../common/components/PageWrapper";

export const AdminPage: FC = () => {
  const { data } = useGetUsersQuery();
  const [rowSelection, setRowSelection] = useState({});
  const [banUser] = useBanUserMutation();
  const [unBanUser] = useUnBanUserMutation();
  const [appointAdmin] = useAppointAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();

  return (
    <PageWrapper
      breadcrumbs={[
        { url: "/home", title: t("breadcrumbs.home") },
        { url: "/admin", title: t("breadcrumbs.admin") },
      ]}
    >
      <MaterialReactTable
        enableColumnFilters={false}
        data={data || []}
        localization={
          i18n.language === "en" ? MRT_Localization_EN : MRT_Localization_RU
        }
        muiSearchTextFieldProps={{
          variant: "outlined",
        }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        muiTableBodyRowProps={({ row }) => ({
          onClick: (event) => {},
          sx: {
            cursor: "pointer",
          },
        })}
        state={{
          rowSelection,
        }}
        enableRowActions
        renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
          <MenuItem
            key={0}
            onClick={() => {
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
                onClick={() => deleteUser([original.id])}
              >
                {t("admin.toolbar.delete")}
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<PanoramaFishEye />}
                sx={{
                  marginLeft: "4px",
                  textTransform: "none",
                  "& .MuiButton-startIcon": { margin: { xs: 0 } },
                }}
                onClick={() => {
                  navigate(`/userReview/${original.id}`);
                }}
              >
                {t("admin.toolbar.view")}
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
            accessorKey: "userName",
            header: `${t("admin.header.name")}`,
          },
          {
            accessorKey: "email",
            header: `${t("admin.header.email")}`,
          },
          {
            accessorKey: "role",
            header: `${t("admin.header.role")}`,
            Cell: ({ row: { original } }) =>
              original.role === "user" ? (
                <Button color="error" onClick={() => appointAdmin(original.id)}>
                  {t("admin.page.role.user")}
                </Button>
              ) : (
                <Button
                  color="success"
                  onClick={() => removeAdmin(original.id)}
                >
                  {t("admin.page.role.admin")}
                </Button>
              ),
          },

          {
            accessorKey: "banned",
            header: `${t("admin.header.status")}`,
            Cell: ({ row: { original } }) =>
              original.banned === true ? (
                <Button
                  color="error"
                  onClick={() => {
                    unBanUser([original.id]);
                  }}
                >
                  {t("admin.page.block")}
                </Button>
              ) : (
                <Button
                  color="success"
                  onClick={() => {
                    banUser([original.id]);
                  }}
                >
                  {t("admin.page.active")}
                </Button>
              ),
          },
        ]}
      />
    </PageWrapper>
  );
};

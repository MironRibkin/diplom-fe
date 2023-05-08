import React, { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import {
  useAppointAdminMutation,
  useBanUserMutation,
  useGetUsersQuery,
  useRemoveAdminMutation,
  useUnBanUserMutation,
} from "../api/usersApi";
import { AdminTableToolbar } from "./AdminTableToolbar";
import { UsersTableHeader } from "./AdminTableHeader";
import { Header } from "../../../common/components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AdminPage: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const { data } = useGetUsersQuery();
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      const newSelected = data?.map((n) => n.id);
      setSelected(newSelected || []);
    } else {
      setSelected([]);
    }
  };
  const handleClick = (event: React.MouseEvent, name: string): void => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const [banUser] = useBanUserMutation();
  const [unBanUser] = useUnBanUserMutation();
  const [appointAdmin] = useAppointAdminMutation();
  const [removeAdmin] = useRemoveAdminMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deviceMediaQuery = useMediaQuery("(min-width:850px)");

  return (
    <Paper sx={{ width: "100%", mb: 2, overflow: "auto" }}>
      <TableContainer sx={{ overflow: "auto" }}>
        <Header />
        <Box margin="10px">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="inherit"
                onClick={() => navigate("/Home")}
              >
                {t("breadcrumbs.home")}
              </Link>
              <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="inherit"
                onClick={() => navigate("/admin")}
              >
                {t("breadcrumbs.admin")}
              </Link>
            </Breadcrumbs>
          </div>
        </Box>
        <AdminTableToolbar
          selectedIds={selected}
          onActionComplete={() => setSelected([])}
        />

        <Table aria-labelledby="tableTitle">
          <UsersTableHeader
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={data?.length || 0}
          />
          <TableBody>
            {data
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(({ email, userName, id, role, banned }) => {
                const isItemSelected = selected.indexOf(id) !== -1;
                const labelId = `enhanced-table-checkbox-${id}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {id}
                    </TableCell>
                    <TableCell>{userName}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>
                      {role === "user" ? (
                        <Button color="error" onClick={() => appointAdmin(id)}>
                          {t("admin.page.role.user")}
                        </Button>
                      ) : (
                        <Button color="success" onClick={() => removeAdmin(id)}>
                          {t("admin.page.role.admin")}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {banned === true ? (
                        <Button
                          color="error"
                          onClick={() => {
                            unBanUser([id]);
                          }}
                        >
                          {t("admin.page.block")}
                        </Button>
                      ) : (
                        <Button
                          color="success"
                          onClick={() => {
                            banUser([id]);
                          }}
                        >
                          {t("admin.page.active")}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

import React, { ChangeEvent, FC, useState } from "react";
import {
  Avatar,
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
  TableRow,
} from "@mui/material";
import {
  useBanUserMutation,
  useGetUsersQuery,
  useUnBanUserMutation,
} from "../api/usersApi";
import { AdminTableToolbar } from "./AdminTableToolbar";
import { UsersTableHeader } from "./UserTableHeader";
import { Header } from "../../../common/components/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const AdminPage: FC = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const { data } = useGetUsersQuery();
  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.checked) {
      const newSelected = data?.items.map((n) => n.id);
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer>
        <Header />
        <Box margin="5px">
          <div role="presentation">
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
            rowCount={data?.items.length || 0}
          />
          <TableBody>
            {data?.items.map(({ email, firstname, id, status }) => {
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
                  <TableCell>
                    <Avatar />
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>
                    {status === "BLOCKED" ? (
                      <Button
                        color="error"
                        onClick={() => {
                          unBanUser([id]);
                        }}
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        color="success"
                        onClick={() => {
                          banUser([id]);
                        }}
                      >
                        ACTIVE
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

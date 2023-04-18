import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React, { ChangeEvent, FC } from "react";
import { useTranslation } from "react-i18next";

interface IUsersTableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}
export const UsersTableHeader: FC<IUsersTableHeaderProps> = ({
  numSelected,
  onSelectAllClick,
  rowCount,
}) => {
  const { t } = useTranslation();
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell>ID</TableCell>
        <TableCell>{t("admin.header.name")}</TableCell>
        <TableCell>{t("admin.header.email")}</TableCell>
        <TableCell>{t("admin.header.role")}</TableCell>
        <TableCell>{t("admin.header.status")}</TableCell>
      </TableRow>
    </TableHead>
  );
};

import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import React, { ChangeEvent, FC } from "react";

interface IUsersTableHeaderProps {
  numSelected: number;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export const UsersTableHeader: FC<IUsersTableHeaderProps> = ({
  numSelected,
  onSelectAllClick,
  rowCount,
}) => (
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
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Status</TableCell>
    </TableRow>
  </TableHead>
);

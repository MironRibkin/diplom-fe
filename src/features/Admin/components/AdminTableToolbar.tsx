import { alpha, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import { Block, CheckCircleOutline, Delete } from "@mui/icons-material";
import { FC } from "react";
import {
  useBanUserMutation,
  useDeleteUserMutation,
  useUnBanUserMutation,
} from "../api/usersApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface IUsersTableToolbarProps {
  selectedIds: string[];
  onActionComplete: VoidFunction;
}

export const AdminTableToolbar: FC<IUsersTableToolbarProps> = ({
  selectedIds,
  onActionComplete,
}) => {
  const { t } = useTranslation();
  const [deleteUser] = useDeleteUserMutation();
  const [banUser] = useBanUserMutation();
  const [unBanUser] = useUnBanUserMutation();
  const navigate = useNavigate();
  return (
    <Toolbar
      sx={{
        pl: { sm: 5 },
        pr: { xs: 20, sm: 20 },
        ...(selectedIds.length > 0 && {
          background: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {selectedIds.length > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {selectedIds.length} Elements
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {t("features.admin.adminTableToolbar.title")}
        </Typography>
      )}
      <Tooltip title="Delete">
        <IconButton
          onClick={() => {
            onActionComplete();
            deleteUser(selectedIds);
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <Tooltip title="Block">
        <IconButton
          onClick={() => {
            onActionComplete();
            banUser(selectedIds);
          }}
        >
          <Block color="error" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Unblock">
        <IconButton
          onClick={() => {
            onActionComplete();
            unBanUser(selectedIds);
          }}
        >
          <CheckCircleOutline color="success" />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

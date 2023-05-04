import { IconButton, Tooltip } from "@mui/material";
import { ArrowRight } from "@mui/icons-material";
import { FC } from "react";
import Settings from "@mui/icons-material/Settings";

export const SettingsHeader = () => {
  return (
    <Tooltip title="Project Settings">
      <IconButton
        size="large"
        sx={{
          "& svg": {
            color: "rgba(255,255,255,0.8)",
            transition: "0.2s",
            transform: "translateX(0) rotate(0)",
          },
          "&:hover, &:focus": {
            bgcolor: "unset",
            "& svg:first-of-type": {
              transform: "translateX(-4px) rotate(-20deg)",
            },
            "& svg:last-of-type": {
              right: 0,
              opacity: 1,
            },
          },
          "&:after": {
            content: '""',
            position: "absolute",
            height: "80%",
            display: "block",
            left: 0,
            width: "1px",
            bgcolor: "divider",
          },
        }}
      >
        <Settings />
        <ArrowRight sx={{ position: "absolute", right: 4, opacity: 0 }} />
      </IconButton>
    </Tooltip>
  );
};

import * as React from "react";
import { FC, ReactNode } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IProps {
  title?: string;
  recordTitle?: string;
  imgSrc?: string;
  theme?: string;
  description?: string;
  children: ReactNode;
}

export const ReviewDescription: FC<IProps> = ({
  title,
  recordTitle,
  imgSrc,
  theme,
  description,
  children,
}) => {
  const deviceMediaQuery = useMediaQuery("(min-width:850px)");
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      gap="30px"
      flexDirection={deviceMediaQuery ? "row" : "column"}
    >
      <Box width={deviceMediaQuery ? "50%" : "100%"}>
        <img src={imgSrc} width="100%" />
      </Box>
      <Box width={deviceMediaQuery ? "50%" : "100%"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: "15px",
          }}
        >
          <Typography variant="h4">{title}</Typography>
          <Typography fontSize="20px">{recordTitle}</Typography>
          <Typography fontSize="17px">
            {t("reviews.table.header.theme")}: {theme}
          </Typography>
          <Typography fontSize="16px">{description}</Typography>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

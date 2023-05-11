import { Button } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const HeaderSelectLeague: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Button
      onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ru" : "en")}
      variant="outlined"
      color="success"
      sx={{ width: "10px", height: "18px", borderRadius: "10px" }}
    >
      {i18n.language === "en" ? "En" : "Ру"}
    </Button>
  );
};

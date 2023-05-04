import {
  Autocomplete,
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useGetAllReviewsQuery,
  useLazyGetAllReviewsQuery,
} from "../../features/Review/api/reviewApi";
import { useNavigate } from "react-router-dom";

export const HeaderSearchApp: FC = () => {
  const [search, setSearch] = useState("");
  const { t } = useTranslation();
  const { data } = useGetAllReviewsQuery(search);
  const [refetchItems] = useLazyGetAllReviewsQuery();
  const navigate = useNavigate();

  return (
    <Box width="80%">
      <Autocomplete
        filterOptions={(options) => options}
        onOpen={() => {
          setSearch("");
          refetchItems("");
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={({ target: { value } }) => {
              setSearch(value);
            }}
            fullWidth
            size="small"
            placeholder={t("common.header.menu.search") || ""}
          />
        )}
        getOptionLabel={(option) => option.title || ""}
        options={data || []}
        renderOption={(_, { title, id, imgSrc }) => (
          <Stack
            onClick={() => navigate(`/reviewPage/${id}`)}
            sx={{ cursor: "pointer", "&:hover": { background: "#dbdbdb" } }}
            key={id}
            p="4px 8px 4px 8px"
            direction="row"
            gap="8px"
            alignItems="center"
          >
            <Avatar src={imgSrc} />
            <Typography>{title}</Typography>
          </Stack>
        )}
      />
    </Box>
  );
};

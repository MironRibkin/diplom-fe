import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAddCommentMutation, useGetReviewQuery } from "../api/reviewApi";
import { useNavigate, useParams } from "react-router-dom";
import { Header, stringToColor } from "../../../common/components/Header";
import { useGetUserQuery } from "../../Admin/api/usersApi";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useChatScroll } from "../hooks/useChatScroll";

export const ReviewPage: FC = () => {
  const { id } = useParams();
  const { data } = useGetReviewQuery(id || "");
  const { data: userData } = useGetUserQuery();
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const navigate = useNavigate();
  const ref = useChatScroll([] || []);

  const { t } = useTranslation();

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        textAlign: "center",
        width: "40px",
        height: "40px",
        fontSize: "30px",
      },
      children: `${userData?.userName.split(" ")[0][0]}`,
    };
  }

  // @ts-ignore
  return (
    <>
      <Header />
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
          onClick={() => navigate("/myProfile")}
        >
          {t("breadcrumbs.profile")}
        </Link>
      </Breadcrumbs>
      <Stack
        height="100%"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          sx={{
            height: "100ch",
            marginTop: "20px",
            overflow: "auto",
            width: "80%",
            maxHeight: "100%",
            borderRadius: "25px",
          }}
        >
          <Stack
            width="100%"
            gap="12px"
            p="22px"
            borderRadius="5px"
            display="flex"
            direction="row"
          >
            <Box width="50%">
              <img src={data?.imgSrc} width="100%" />
            </Box>
            <Box width="50%">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontSize="15px"> Добавил: </Typography>
                <Rating
                  name="read-only"
                  value={
                    data?.rating
                      ? data?.rating.reduce(
                          (acc, item) => acc + item.value,
                          0
                        ) / data?.rating.length
                      : 0
                  }
                  readOnly
                  size="small"
                />
              </Box>
              <Box display="flex" marginTop="5px" gap="5px">
                <Box>
                  <Avatar {...stringAvatar("a" || "")} />
                </Box>
                <Box>
                  <Typography fontSize="15px">{data?.author}</Typography>
                  <Typography fontSize="12px">mail </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  marginTop: "40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">{data?.title}</Typography>
                <Typography fontSize="20px">{data?.recordTitle}</Typography>
                <Typography fontSize="16px">{data?.description}</Typography>
              </Box>
            </Box>
          </Stack>
          <Stack display="flex" flexDirection="column">
            <Box ref={ref} height="20ch">
              <Paper square sx={{ pb: "10px" }}>
                <List sx={{ mb: 2 }}>
                  {data?.messages.map(({ sender, body, date }) => (
                    <React.Fragment key={id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar {...stringAvatar(sender || "")} />
                        </ListItemAvatar>
                        <ListItemText primary={sender} secondary={body} />
                        <ListItemText secondary={date} />
                      </ListItem>
                    </React.Fragment>
                  ))}
                </List>
                <Box
                  width="90%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  padding="20px"
                  gap="10px"
                >
                  <TextField
                    label="Your comment"
                    multiline
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    color="success"
                    minRows={1}
                    sx={{ width: "80%" }}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "20%", borderRadius: "25px" }}
                    color="success"
                    onClick={() => {
                      addComment({
                        id: data?.id,
                        sender: userData?.userName,
                        body: comment,
                      });
                      setComment("");
                    }}
                  >
                    Send
                  </Button>
                </Box>
              </Paper>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                padding="20px"
              >
                <Typography fontSize="16px">Оцени прилагу</Typography>
                <Rating name="size-small" size="small" />
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

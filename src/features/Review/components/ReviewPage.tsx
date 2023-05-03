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
  useMediaQuery,
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

export const ReviewPage: FC = () => {
  const { id } = useParams();
  const { data } = useGetReviewQuery(id || "");
  const { data: userData } = useGetUserQuery();
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const navigate = useNavigate();
  const deviceMediaQuery = useMediaQuery("(min-width:850px)");

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
          onClick={() => navigate(`/myProfile/${userData?.id}`)}
        >
          {t("breadcrumbs.profile")}
        </Link>
        <Link underline="none" color="inherit">
          {data?.title}
        </Link>
      </Breadcrumbs>
      <Stack
        height="calc(100vh - 200px)"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Paper
          sx={{
            // height: "100ch",
            marginTop: "20px",
            overflow: "auto",
            width: "80%",
            // maxHeight: "100%",
            borderRadius: "25px",
          }}
        >
          <Stack
            width="100%"
            gap="12px"
            p="22px"
            borderRadius="5px"
            display="flex"
            direction="column"
          >
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="15px">
                {t("reviews.review.created")}
              </Typography>
              <Rating
                name="read-only"
                value={
                  data?.rating
                    ? data?.rating.reduce((acc, item) => acc + item.value, 0) /
                      data?.rating.length
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
                <ListItemText secondary={data?.date} />
              </Box>
            </Box>
            <Box
              display="flex"
              gap="30px"
              flexDirection={deviceMediaQuery ? "row" : "column"}
            >
              <Box width={deviceMediaQuery ? "50%" : "100%"}>
                <img src={data?.imgSrc} width="100%" />
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
                  <Typography
                    variant="h4"
                    sx={{ fontFamily: "Fira Mono monospace" }}
                  >
                    {data?.title}
                  </Typography>
                  <Typography
                    fontSize="20px"
                    sx={{ fontFamily: "Fira Mono monospace" }}
                  >
                    {data?.recordTitle}
                  </Typography>
                  <Typography
                    fontSize="16px"
                    sx={{ fontFamily: "Fira Mono monospace" }}
                  >
                    {data?.description}
                  </Typography>
                </Box>
                <Stack display="flex" flexDirection="column">
                  <Paper square sx={{ pb: "10px" }}>
                    <List
                      sx={{
                        mb: 2,
                        overflow: "auto",
                        minHeight: "200px",
                        maxHeight: "400px",
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ fontFamily: "Fira Mono monospace" }}
                      >
                        {t("reviews.review.comments")}
                      </Typography>
                      {data?.messages.map(({ sender, body, date }) => (
                        <React.Fragment key={id}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar {...stringAvatar(sender || "")} />
                            </ListItemAvatar>
                            <Box display="flex" flexDirection="column">
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                gap="8px"
                                alignItems="center"
                                height="100%"
                              >
                                <ListItemText primary={sender} />
                                <ListItemText secondary={date} />
                              </Box>
                              <Typography sx={{ overflowWrap: "anywhere" }}>
                                {body}
                              </Typography>
                            </Box>
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
                        label={t("reviews.review.yourComment")}
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
                        sx={{
                          width: "20%",
                          borderRadius: "25px",
                          fontSize: "11px",
                        }}
                        color="success"
                        disabled={!comment}
                        onClick={() => {
                          addComment({
                            id: data?.id,
                            sender: userData?.userName,
                            body: comment,
                          });
                          setComment("");
                        }}
                      >
                        {t("reviews.review.sendButton")}
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
                    <Typography fontSize="16px">
                      {t("reviews.review.reviewLike")}
                    </Typography>
                    <Rating name="size-small" size="small" />
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

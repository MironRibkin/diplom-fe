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
import * as React from "react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useAddCommentMutation,
  useAddRatingMutation,
  useGetReviewQuery,
} from "../api/reviewApi";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../../common/components/Header";
import { useGetUserQuery } from "../../Admin/api/usersApi";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { stringAvatar } from "../../../common/utils/stringAvatar";

export const ReviewPage: FC = () => {
  const { id } = useParams();
  const { data } = useGetReviewQuery(id || "", { pollingInterval: 3000 });
  const { data: userData } = useGetUserQuery();
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const navigate = useNavigate();
  const deviceMediaQuery = useMediaQuery("(min-width:850px)");
  const { t } = useTranslation();
  const [addRating] = useAddRatingMutation();

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
            marginTop: "20px",
            overflow: "auto",
            width: "80%",
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
                <Avatar {...stringAvatar("a" || "", data?.author)} />
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
                              <Avatar {...stringAvatar(sender || "", sender)} />
                            </ListItemAvatar>
                            <Box display="flex" flexDirection="column">
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                gap="25px"
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
                    {userData && (
                      <Box
                        height="100%"
                        display="flex"
                        alignItems="center"
                        gap="10px"
                      >
                        <TextField
                          label={t("reviews.review.yourComment")}
                          multiline
                          value={comment}
                          onChange={(event) => setComment(event.target.value)}
                          color="success"
                          minRows={1}
                          fullWidth
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
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
                    )}
                  </Paper>
                  {userData && (
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
                      <Rating
                        value={
                          data?.rating.find(
                            ({ userId }) => userId === userData?.id
                          )?.value || 0
                        }
                        disabled={
                          !!data?.rating.find(
                            ({ userId }) => userId === userData?.id
                          )
                        }
                        onChange={(_, value) =>
                          addRating({
                            userId: userData?.id || "",
                            value,
                            reviewId: data?.id || "",
                          })
                        }
                        name="size-small"
                        size="small"
                      />
                    </Box>
                  )}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

import * as React from "react";
import { FC, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { stringAvatar } from "../../../common/utils/stringAvatar";
import ListItemText from "@mui/material/ListItemText";
import {
  IMessage,
  IRating,
  useAddCommentMutation,
  useAddRatingMutation,
} from "../api/reviewApi";
import { useTranslation } from "react-i18next";
import { useGetUserQuery } from "../../Admin/api/usersApi";

interface IProps {
  messages?: IMessage[];
  reviewId?: string;
  rating?: IRating[];
}

export const ReviewMessages: FC<IProps> = ({ messages, reviewId, rating }) => {
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();
  const [addRating] = useAddRatingMutation();
  const { data: userData } = useGetUserQuery();
  const { t } = useTranslation();

  return (
    <Stack>
      <Typography variant="h5">{t("reviews.review.comments")}</Typography>
      <Box>
        <List
          sx={{
            mb: 2,
            overflow: "auto",
            minHeight: "200px",
            maxHeight: "400px",
          }}
        >
          {messages?.map(({ sender, body, date }) => (
            <ListItem key={date}>
              <ListItemAvatar>
                <Avatar {...stringAvatar(sender)} />
              </ListItemAvatar>
              <Box display="flex" flexDirection="column">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  gap="25px"
                  alignItems="flex-start"
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
          ))}
        </List>
        {userData && (
          <Box height="100%" display="flex" alignItems="center" gap="10px">
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
                  id: reviewId,
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
      </Box>
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
              rating?.find(({ userId }) => userId === userData?.id)?.value || 0
            }
            disabled={!!rating?.find(({ userId }) => userId === userData?.id)}
            onChange={(_, value) =>
              addRating({
                userId: userData?.id || "",
                value,
                reviewId: reviewId || "",
              })
            }
            name="size-small"
            size="small"
          />
        </Box>
      )}
    </Stack>
  );
};

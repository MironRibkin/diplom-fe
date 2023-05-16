import React, { FC } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Stack, useMediaQuery } from "@mui/material";
import { IReview } from "../../Review/api/reviewApi";
import { useNavigate } from "react-router-dom";
import { stringAvatar } from "../../../common/utils/stringAvatar";
import { AverageRating } from "../../Review/components/AverageRating";

interface IProps {
  reviews?: IReview[];
}

export const ReviewCardList: FC<IProps> = ({ reviews = [] }) => {
  const deviceMediaQuery = useMediaQuery("(min-width:800px)");
  const navigate = useNavigate();

  return (
    <Stack
      display="flex"
      flexDirection={deviceMediaQuery ? "row" : "column"}
      alignItems={deviceMediaQuery ? "" : "center"}
      justifyContent="center"
      flexWrap="wrap"
      gap="20px"
      marginTop="20px"
    >
      {reviews.map((review) => (
        <Card
          key={review.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: `${deviceMediaQuery ? "345px" : "330px"}`,
            overflow: "auto",
            maxHeight: 450,
            borderRadius: "25px",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/reviewPage/${review?.id}`)}
        >
          <CardMedia
            component="img"
            alt="NO IMAGE"
            height="170"
            src={review?.imgSrc}
          />
          <CardContent>
            <AverageRating ratings={review?.rating} />
            <Typography variant="h5" component="div">
              {review?.title}
            </Typography>
            <Box display="flex" gap="10px">
              <Avatar {...stringAvatar(review.author)} />
              <Box
                display="flex"
                alignItems="center"
                gap="50px"
                justifyContent="space-between"
              >
                <Typography variant="body1" component="div">
                  {review?.author}
                </Typography>
                <Typography variant="body2" component="div">
                  {review?.date}
                </Typography>
              </Box>
            </Box>
            <Box borderTop="1px solid black" marginTop="10px" pt="5px">
              <Typography variant="body2" color="text.secondary">
                {review?.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

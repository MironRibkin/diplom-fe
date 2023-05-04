import React from "react";
import { Header } from "../../../common/components/Header";
import Typography from "@mui/material/Typography";
import {
  useGetHighestRatingReviewsQuery,
  useGetReviewsAllQuery,
} from "../../Review/api/reviewApi";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReviewCardList } from "./ReviewCardList";

export function Home() {
  const { data: recentReviewsData } = useGetReviewsAllQuery();
  const { data: highestRatingReviewsData } = useGetHighestRatingReviewsQuery();
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Box p={4}>
        <Typography
          pt={3}
          variant="h5"
          sx={{ fontFamily: "Fira Mono monospace" }}
        >
          {t("home.review.recent")}
        </Typography>
        <ReviewCardList reviews={recentReviewsData} />
        <Typography
          pt={3}
          variant="h5"
          sx={{ fontFamily: "Fira Mono monospace" }}
        >
          {t("home.review.ratingReview")}
        </Typography>
        <ReviewCardList reviews={highestRatingReviewsData} />
      </Box>
    </>
  );
}

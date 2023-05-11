import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import {
  useGetHighestRatingReviewsQuery,
  useGetReviewsAllQuery,
} from "../../Review/api/reviewApi";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReviewCardList } from "./ReviewCardList";
import { PageWrapper } from "../../../common/components/PageWrapper";

export const HomePage: FC = () => {
  const { data: recentReviewsData } = useGetReviewsAllQuery();
  const { data: highestRatingReviewsData } = useGetHighestRatingReviewsQuery();
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Box p={4}>
        <Typography pt={3} variant="h5">
          {t("home.review.recent")}
        </Typography>
        <ReviewCardList reviews={recentReviewsData} />
        <Typography pt={3} variant="h5">
          {t("home.review.ratingReview")}
        </Typography>
        <ReviewCardList reviews={highestRatingReviewsData} />
      </Box>
    </PageWrapper>
  );
};

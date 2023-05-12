import { Avatar, Box, Stack, Typography } from "@mui/material";
import * as React from "react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useGetReviewQuery } from "../api/reviewApi";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../Admin/api/usersApi";
import ListItemText from "@mui/material/ListItemText";
import { stringAvatar } from "../../../common/utils/stringAvatar";
import { PageWrapper } from "../../../common/components/PageWrapper";
import { AverageRating } from "./AverageRating";
import { ReviewMessages } from "./ReviewMessages";
import { ReviewDescription } from "./ReviewDescription";

export const ReviewPage: FC = () => {
  const { id } = useParams();
  const { data } = useGetReviewQuery(id || "", { pollingInterval: 3000 });
  const { data: userData } = useGetUserQuery();
  const { t } = useTranslation();

  return (
    <PageWrapper
      breadcrumbs={[
        { url: "/home", title: t("breadcrumbs.home") },
        { url: `/myProfile/${userData?.id}`, title: t("breadcrumbs.profile") },
        { title: data?.title },
      ]}
    >
      <Stack width="100%" gap="12px" p="30px" borderRadius="5px">
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="15px">{t("reviews.review.created")}</Typography>
          <AverageRating ratings={data?.rating} />
        </Box>
        <Box display="flex" marginTop="5px" gap="5px">
          <Avatar {...stringAvatar(data?.author)} />
          <Box>
            <Typography fontSize="15px">{data?.author}</Typography>
            <ListItemText secondary={data?.date} />
          </Box>
        </Box>

        <ReviewDescription
          title={data?.title}
          recordTitle={data?.recordTitle}
          description={data?.description}
          imgSrc={data?.imgSrc}
          theme={data?.theme}
        >
          <ReviewMessages
            messages={data?.messages}
            reviewId={data?.id}
            rating={data?.rating}
          />
        </ReviewDescription>
      </Stack>
    </PageWrapper>
  );
};

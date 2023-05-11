import * as React from "react";
import { FC } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReviewsTable } from "../../Review/components/ReviewsTable";
import { useGetUserByIdQuery } from "../../Admin/api/usersApi";
import { PageWrapper } from "../../../common/components/PageWrapper";
import { UserProfileDetails } from "../../Profile/components/UserProfileDetails";

export const UserReviewPage: FC = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: userData } = useGetUserByIdQuery(id || "");

  return (
    <PageWrapper
      breadcrumbs={[
        { url: "/home", title: t("breadcrumbs.home") },
        { title: userData?.userName },
      ]}
    >
      <Typography variant="h5" color="error" margin="10px">
        {t("profile.account")}
      </Typography>
      <UserProfileDetails
        userName={userData?.userName}
        email={userData?.email}
      />

      <Typography margin="8px" variant="h6">
        {t("profile.adminReview")}: {userData?.userName}
      </Typography>
      <ReviewsTable />
    </PageWrapper>
  );
};

import * as React from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ReviewsTable } from "../../Review/components/ReviewsTable";
import { useGetUserQuery } from "../../Admin/api/usersApi";
import { PageWrapper } from "../../../common/components/PageWrapper";
import { UserProfileDetails } from "./UserProfileDetails";

export const UserProfilePage = () => {
  const { t } = useTranslation();
  const { data } = useGetUserQuery();

  return (
    <PageWrapper
      breadcrumbs={[
        { url: "/home", title: t("breadcrumbs.home") },
        { title: t("breadcrumbs.profile") },
      ]}
    >
      <UserProfileDetails userName={data?.userName} email={data?.email} />
      <Typography margin="8px" variant="h6">
        {t("profile.myReviews")}:
      </Typography>
      <ReviewsTable />
    </PageWrapper>
  );
};

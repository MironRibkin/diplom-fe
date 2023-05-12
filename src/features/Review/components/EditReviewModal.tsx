import { Modal } from "@mui/material";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IReview, useEditReviewMutation } from "../api/reviewApi";
import { ReviewForm } from "./ReviewForm";

interface IReviewForm
  extends Pick<
    IReview,
    "title" | "recordTitle" | "description" | "imgSrc" | "theme"
  > {}

interface IProps {
  onClose: () => void;
  reviewId: string;
  reviewData?: IReviewForm;
}

export const EditReviewModal: FC<IProps> = ({
  onClose,
  reviewData,
  reviewId,
}) => {
  const { t } = useTranslation();
  const [editReview, { isSuccess }] = useEditReviewMutation();

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      open
      onClose={onClose}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <ReviewForm
        title={t("reviews.modal.general.editModalName")}
        submitButtonTitle={t("reviews.modal.button.save")}
        // @ts-ignore
        defaultValues={reviewData}
        onCancel={onClose}
        onSubmit={async (data) =>
          await editReview({
            ...data,
            imgSrc: data.imgSrc || "",
            reviewId: reviewId || "",
          })
        }
      />
    </Modal>
  );
};

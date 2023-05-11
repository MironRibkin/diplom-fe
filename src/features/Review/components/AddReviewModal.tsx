import { Modal } from "@mui/material";
import { FC, useEffect } from "react";
import { useCreateReviewMutation } from "../api/reviewApi";
import { ReviewForm } from "./ReviewForm";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface IProps {
  onClose: () => void;
}

export const AddReviewModal: FC<IProps> = ({ onClose }) => {
  const [createReview, { isSuccess }] = useCreateReviewMutation();
  const { t } = useTranslation();
  const { id } = useParams();

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
        title={t("reviews.modal.general.modalName")}
        submitButtonTitle={t("reviews.modal.button.send")}
        onCancel={onClose}
        onSubmit={async (data) =>
          await createReview({
            ...data,
            imgSrc: data.imgSrc || "",
            tags: [],
            rating: [{ value: 5, userId: id || "" }],
            author: id || "",
          })
        }
      />
    </Modal>
  );
};

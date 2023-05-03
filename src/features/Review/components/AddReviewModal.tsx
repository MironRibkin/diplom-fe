import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import { IReview, useCreateReviewMutation } from "../api/reviewApi";
import { useParams } from "react-router-dom";
import { UploadImages } from "./UploadImages";

interface IProps {
  onClose: () => void;
}

interface IReviewForm
  extends Pick<
    IReview,
    | "title"
    | "recordTitle"
    | "description"
    | "imgSrc"
    | "tags"
    | "theme"
    | "rating"
  > {
  // file: File[];
}

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

const THEMES = [
  "Films",
  "Books",
  "Painting",
  "Comics",
  "Art",
  "Sport",
  "Car",
  "Animal",
];

export const AddReviewModal: FC<IProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState("write");
  const { t } = useTranslation();
  const [createReview, { isLoading, isSuccess }] = useCreateReviewMutation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IReviewForm>();

  const { id } = useParams();

  const onSubmit: SubmitHandler<IReviewForm> = async (data) => {
    await createReview({
      ...data,
      imgSrc: data.imgSrc || "",
      tags: [],
      rating: [{ value: 5, userId: id || "" }],
    });
  };

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
      <Paper sx={{ overflow: "auto", maxHeight: "100%", borderRadius: "25px" }}>
        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          m="auto"
          gap="12px"
          p="22px"
          borderRadius="5px"
        >
          <Typography variant="h6" fontWeight="600">
            {t("reviews.modal.general.modalName")}
          </Typography>
          <TextField
            {...register("title", { required: true })}
            error={!!errors.title}
            color="success"
            helperText={!!errors.title && "enter title"}
            size="small"
            autoComplete="title"
            label={t("reviews.modal.general.title")}
            fullWidth
          />
          <TextField
            {...register("recordTitle", { required: true })}
            error={!!errors.title}
            color="success"
            helperText={!!errors.title && "enter recordTitle"}
            size="small"
            autoComplete="recordTitle"
            label={t("reviews.modal.general.recordTitle")}
            fullWidth
          />
          <FormControl>
            <InputLabel>{t("reviews.modal.general.theme")}</InputLabel>
            <Select
              {...register("theme")}
              label={t("reviews.modal.general.theme")}
              color="success"
            >
              {THEMES.map((value) => (
                <MenuItem key={value} value={value}>
                  {t(`${value}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ReactMde
            // @ts-ignore
            l18n={{
              preview: t("reviews.modal.reactMde.preview"),
              write: t("reviews.modal.reactMde.write"),
            }}
            color="green"
            value={watch("description")}
            onChange={(value) => setValue("description", value)}
            // @ts-ignore
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          <UploadImages
            onChange={(imgSrc) => setValue("imgSrc", imgSrc)}
            imgSrc={watch("imgSrc")}
          />
          <Stack direction="row" justifyContent="space-between">
            <Button
              onClick={onClose}
              color="error"
              sx={{ borderRadius: "25px" }}
            >
              {t("reviews.modal.button.close")}
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ borderRadius: "25px" }}
            >
              {t("reviews.modal.button.send")}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};

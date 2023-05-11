import { FC, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { THEMES } from "../../../common/utils/themes";
import ReactMde from "react-mde";
import { converter } from "../../../common/utils/showdownConfig";
import { UploadImages } from "./UploadImages";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IReview } from "../api/reviewApi";

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
  > {}

interface IProps {
  title: string;
  submitButtonTitle: string;
  onSubmit: SubmitHandler<IReviewForm>;
  defaultValues?: IReviewForm;
  onCancel: () => void;
}

export const ReviewForm: FC<IProps> = ({
  title,
  submitButtonTitle,
  onSubmit,
  defaultValues,
  onCancel,
}) => {
  const [selectedTab, setSelectedTab] = useState<
    "write" | "preview" | undefined
  >("write");
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IReviewForm>({
    defaultValues: {
      ...defaultValues,
    },
  });

  return (
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
          {title}
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
            onClick={onCancel}
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
            {submitButtonTitle}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

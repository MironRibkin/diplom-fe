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
import { IReview, useCreateReviewMutation } from "../api/recordsApi";
import { useParams } from "react-router-dom";

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

const THEMES = ["films", "books"];

export const ReviewModal: FC<IProps> = ({ onClose }) => {
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
      <Paper sx={{ overflow: "auto", maxHeight: "100%" }}>
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
            Create Reviews
          </Typography>
          <TextField
            {...register("title", { required: true })}
            error={!!errors.title}
            helperText={!!errors.title && "enter title"}
            size="small"
            autoComplete="title"
            label="title"
            fullWidth
          />
          <TextField
            {...register("recordTitle", { required: true })}
            error={!!errors.title}
            helperText={!!errors.title && "enter recordTitle"}
            size="small"
            autoComplete="recordTitle"
            label="recordTitle"
            fullWidth
          />
          <FormControl>
            <InputLabel>theme</InputLabel>
            <Select {...register("theme")} label="theme">
              {THEMES.map((value) => (
                <MenuItem key={value} value={value}>
                  {t(`general.themes.${value}`)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ReactMde
            // @ts-ignore

            l18n={{
              preview: t(
                "features.CollectionPage.CreateCollectionModal.reactMde.preview"
              ),
              write: t(
                "features.CollectionPage.CreateCollectionModal.reactMde.write"
              ),
            }}
            value={watch("description")}
            onChange={(value) => setValue("description", value)}
            // @ts-ignore
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
              Promise.resolve(converter.makeHtml(markdown))
            }
          />
          {/*<UploadImages*/}
          {/*  onChange={(imgSrc) => setValue("imgSrc", imgSrc)}*/}
          {/*  imgSrc={watch("imgSrc")}*/}
          {/*/>*/}
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={onClose}>
              {t("features.CollectionPage.CreateCollectionModal.button.close")}
            </Button>
            <Button variant="contained" type="submit">
              {t("features.CollectionPage.CreateCollectionModal.button.send")}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Modal>
  );
};

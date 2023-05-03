import React from "react";
import { Header, stringToColor } from "../../common/components/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetReviewsAllQuery } from "../Review/api/reviewApi";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Stack, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

export function Home() {
  const { data, isLoading } = useGetReviewsAllQuery();
  const navigate = useNavigate();
  const deviceMediaQuery = useMediaQuery("(min-width:850px)");
  console.log(data);
  const { t } = useTranslation();

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        textAlign: "center",
        width: "40px",
        height: "40px",
        fontSize: "30px",
      },
      // children: `${data?.split(" ")[0][0]}`,
    };
  }

  return (
    <>
      <Header />
      <Typography variant="h5">Последние из добавленных:</Typography>
      <Box
        display="flex"
        justifyContent="center"
        width="100%"
        alignItems="center"
      >
        <Stack
          display="flex"
          flexDirection={deviceMediaQuery ? "row" : "column"}
          alignItems={deviceMediaQuery ? "" : "center"}
          justifyContent="flex-start"
          flexWrap="wrap"
          width={deviceMediaQuery ? "85%" : "85%"}
          gap="30px"
        >
          {data?.map((review) => {
            return (
              <Card
                sx={{
                  margin: "30px 0",
                  width: 345,
                  overflow: "auto",
                  maxHeight: 450,
                  borderRadius: "25px",
                }}
              >
                <CardMedia
                  component="img"
                  alt="No image =("
                  height="200"
                  src={review?.imgSrc}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {review?.title}
                  </Typography>
                  <Box display="flex" gap="5px" alignItems="center">
                    <Avatar {...stringAvatar("a" || "")} />
                    <Typography gutterBottom variant="h6" component="div">
                      {review?.author}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {review?.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => navigate(`/reviewPage/${review?.id}`)}
                  >
                    {t("home.card.cardButton")}
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}

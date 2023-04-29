import React from "react";
import { Header } from "../../common/components/Header";
import { AppBar, Avatar, Box, Stack } from "@mui/material";
import { ReviewPage } from "../Review/components/ReviewPage";

export function Home() {
  return (
    <>
      <Header />
      <Box width="100%" height="100%" display="flex" padding="10px" gap="20px">
        <Box width="70%" height="100%" padding="15px" gap="10px">
          <Stack border="1px red solid">Последний добавленный обзор</Stack>
          <Stack border="1px red solid"></Stack>
          <Stack border="1px red solid" marginTop="20px">
            Облако тегов
            <p> #Бэтмен #Сиська #Мирон </p>
          </Stack>
        </Box>
        <Box width="30%" height="100%" padding="15px">
          <Stack border="1px red solid">Самый сок</Stack>
        </Box>
      </Box>
    </>
  );
}

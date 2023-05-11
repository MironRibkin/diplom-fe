import * as React from "react";
import { FC } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { stringAvatar } from "../../../common/utils/stringAvatar";

interface IProps {
  userName?: string;
  email?: string;
}

export const UserProfileDetails: FC<IProps> = ({ userName, email }) => {
  return (
    <Box width="100%" height="30ch" display="flex" alignItems="center">
      <Box
        borderRadius="25px"
        width="90%"
        height="100%"
        display="flex"
        alignItems="center"
        flexDirection="column"
        padding="10px"
        gap="6px"
      >
        <Avatar {...stringAvatar(userName)} />
        <Typography variant="h4">{userName}</Typography>
        <Typography fontSize="12px">{email} </Typography>
      </Box>
    </Box>
  );
};

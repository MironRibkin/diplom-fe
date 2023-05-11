import React, { FC } from "react";
import { Rating } from "@mui/material";

interface IRating {
  value: number;
}

interface IProps {
  ratings?: IRating[];
}

export const AverageRating: FC<IProps> = ({ ratings }) => {
  return (
    <Rating
      name="read-only"
      value={
        ratings
          ? ratings.reduce((acc, item) => acc + item.value, 0) / ratings.length
          : 0
      }
      readOnly
      size="small"
    />
  );
};

import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../../features/Users/api/usersApi";
import { FC } from "react";

export const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isError } = useGetUserQuery(undefined, {
    skip: localStorage.getItem("token") === null,
  });
  if (localStorage.getItem("token") === null) {
    return <Navigate replace to="/login" />;
  }
  if (isError) {
    localStorage.clear();
    toast.error("You are blocked");
    return <Navigate replace to="/login" />;
  }

  return children;
};

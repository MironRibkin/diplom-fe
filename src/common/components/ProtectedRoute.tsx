import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FC } from "react";
import { useGetUserQuery } from "../../features/Admin/api/usersApi";

export const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { isError } = useGetUserQuery(undefined, {
    skip: !localStorage.getItem("token"),
  });

  if (!localStorage.getItem("token")) {
    return <Navigate replace to="/login" />;
  }
  if (isError) {
    localStorage.clear();
    toast.error("You are blocked");
    return <Navigate replace to="/login" />;
  }
  return children;
};

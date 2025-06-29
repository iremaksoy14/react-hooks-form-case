import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const currentUser = useAppSelector((state) => state.user.currentUser);

  console.log("currentUser", currentUser);
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

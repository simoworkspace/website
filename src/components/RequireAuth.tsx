import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const auth = false;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate(import.meta.env.VITE_AUTH_LINK as string);
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

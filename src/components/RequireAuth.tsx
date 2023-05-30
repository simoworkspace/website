import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_LINK } from '../../config.json';

interface Props {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const auth = false;
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth) {
      navigate(AUTH_LINK);
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

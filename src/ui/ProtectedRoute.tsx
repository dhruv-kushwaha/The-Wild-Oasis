import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "./Spinner";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100dvh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      axios.defaults.withCredentials = true;

      const requestInterceptor = axios.interceptors.request.use(
        async (req) => {
          return req;
        },
        (error) => {
          return Promise.reject(error);
        },
      );

      const responseInterceptor = axios.interceptors.response.use(
        async (res) => {
          return res;
        },
        (error: AxiosError) => {
          if (error.response && error.response.status === 401) {
            navigate("/login", { replace: true });
          }
        },
      );

      return () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      };
    },
    [navigate],
  );

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  return children;
}

export default ProtectedRoute;

// function ProtectedRoute({ children }: ProtectedRouteProps) {
//   // 1) Load the authenticated user
//   // We need the user info because once the user has been logged in, he might use the app later on as well so whenever the user uses the app the first request goes to get the user from the db.
//   const { user, isLoading, isFetched, isFetching } = useUser();
//   // console.log("user data : ", user);
//   if (isFetched) {
//     // console.log(user);
//   }

//   // 2)  While loading, show a spinner
//   if (isLoading) {
//     return (
//       <FullPage>
//         <Spinner />
//       </FullPage>
//     );
//   }

//   // 3) If there is no authenticated user, redirect to login
//   // If the user is logged in

//   // 1. There is no cookie then redirect

//   // 2. if the cookie is invalid then redirect (when a response returns 401)

//   // 4) If there is a user, render the app
//   return children;
// }

// export default ProtectedRoute;

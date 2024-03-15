import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import NewUsers from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/Layout/AppLayout";
import SidebarProvider from "./contexts/sidebarContext";
import { Toaster } from "react-hot-toast";
import tw from "twin.macro";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <SidebarProvider>
        <GlobalStyles />
        {/*NOTE: GENERAL RULE WE FOLLOW A page should not fetch data and should not have side effects */}
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:bookingId" element={<Booking />} />
              <Route path="/checkin/:bookingId" element={<Checkin />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/users" element={<NewUsers />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </SidebarProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
// import { LinkProps } from "@mui/material/Link";
import AppLayout from "./components/AppLayout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
// FF9900
function App() {
  let theme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      secondary: {
        main: "#1B1B1B",
      },
      brandColor: {
        main: "#0066FF",
        light1: "#e6f0ff",
        light2: "#80b3ff",
        dark: "#0052cc",
      },
    },
  });
  const queryClient = new QueryClient();
  theme = responsiveFontSizes(theme);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}></QueryClientProvider>
        {/* <RouterProvider router={router} /> */}
        <Routes>
          <Route element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to="home" />} /> */}
            <Route path="/" element={<Home />} />
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="about" element={<About />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

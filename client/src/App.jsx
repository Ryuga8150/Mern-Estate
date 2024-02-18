import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search/";
import TempSearch from "./pages/TempSearch";

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
          <Route path="/" element={<Home />} />
          <Route element={<AppLayout />}>
            {/* <Route index element={<Navigate replace to="home" />} /> */}
            {/* <Route path="home" element={<Home />} /> */}
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/listing/:listingID" element={<Listing />} />
            {/* <Route path="/search" element={<Search />} /> */}
            <Route path="/search" element={<TempSearch />} />
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="create-listing" element={<CreateListing />} />
              <Route
                path="update-listing/:listingID"
                element={<UpdateListing />}
              />
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

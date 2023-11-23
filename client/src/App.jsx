import Home from "./pages/Home";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { LinkProps } from "@mui/material/Link";
import { Container } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import AppLayout from "./components/AppLayout";

function App() {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          {/* <RouterProvider router={router} /> */}
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </Route>
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

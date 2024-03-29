import Container from "@mui/material/Container";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Header from "./Header";

// colors
// 60 -#fff
// 30 - #0066FF
// 10 - #FF9900
const StyledContainer = styled(Container)({
  // backgroundColor: "#fdfdfd",
  backgroundColor: "#fff",
  // backgroundColor: "#fafafa",
  height: "100vh",
  margin: "0 auto",
});
function AppLayout() {
  return (
    <StyledContainer maxWidth="lg" disableGutters={true}>
      <Header />
      <Outlet />
    </StyledContainer>
  );
}

export default AppLayout;

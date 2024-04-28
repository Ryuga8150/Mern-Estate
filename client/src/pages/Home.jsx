import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import styled from "@emotion/styled";
import HeroSection from "../components/HeroSection";
import Header from "../components/Header";
import ProductReel from "../components/ProductReel";
import FAQSection from "../components/FAQSection";
import Footer from "../components/Footer";
import NewsLetter from "../components/NewsLetter";

const StyledBox = styled(Box)({
  // background:
  //   "linear-gradient(90deg, rgba(2,1,8,1) 13%, rgb(236, 236, 242) 89%),url(images/landingPage-1.jpg)",
  background:
    "radial-gradient(circle, rgba(236,236,242,0.1) 4%, rgb(2, 1, 8,0.5) 67%),url(images/landingPage-1.jpg)",
  // background:
  //   "radial-gradient(circle, rgba(2, 1, 8,0.25) 5%, rgba(179, 179, 181,0.1) 31%, rgba(2, 1, 8,0.5) 67%),url(images/landingPage-1.jpg)",
  // background:
  //   "radial-gradient(circle, rgba(2, 1, 8,0.25) 9%, rgba(179, 179, 181,0.1) 34%, rgba(2, 1, 8,0.5) 71%),url(images/landingPage-1.jpg)",
  width: "100%",
  aspectRatio: "17 / 9",
  backgroundSize: "cover",
  objectFit: "cover",

  // height: "48rem",
});
function Home() {
  return (
    <Container
      maxWidth="lg"
      disableGutters={true}
      sx={{ margin: "0 auto", height: "100vh" }}
    >
      <StyledBox>
        <Header isHome={true} />
        <HeroSection />
      </StyledBox>
      <ProductReel
        label={"Recent Offers"}
        url={`&discount=["moreThanOrEqualTo10"]`}
        redirectUrl={`/search?searchTerm=&discount=moreThanOrEqualTo10`}
      />
      <Divider />
      <ProductReel
        label={"Recent Properties"}
        redirectUrl={`/search?searchTerm=&sortBy=createdAt&order=desc`}
      />
      <Divider />
      <FAQSection />
      <NewsLetter />
      <Footer />
    </Container>
  );
}

export default Home;

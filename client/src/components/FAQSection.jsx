import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import FAQIcon from "./../../public/images/faq.svg";
import styled from "@emotion/styled";
import { useState } from "react";

const StyledImage = styled("img")({
  width: "100%",
  height: "100%",
});

// title: #05050E
// subtitle: #080B14
// text:#ACB2C1
function FAQSection() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        padding: "2.4rem 1.2rem",
        columnGap: 3,
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        {/* <Paper
          elevation={5}
          sx={{
            width: "100%",
            height: "100%",
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <StyledImage src="images/faq-2.jpg" alt="FAQ" />
        </Paper> */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            // borderRadius: 5,
            // overflow: "hidden",
            // border: "solid 1px",
            // borderColor: "#F3F3F3",
          }}
        >
          {/* <StyledImage src={FAQIcon} alt="FAQ" /> */}
          <StyledImage src="images/faq-2.jpg" alt="FAQ" />
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: { md: "3rem" },
            // color: "brandColor.main",
            color: "#05050E",
            // fontFamily: "editors",
          }}
          textAlign="center"
        >
          Frequently Asked Questions
        </Typography>

        <Stack
          spacing={3}
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            // height: "460px",
            // height: "518px",
            height: "440px",
          }}
        >
          {[
            {
              question: "Why should I choose Mern Estate?",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget.",
            },
            {
              question: "In which cities do you offer your services?",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget.",
            },
            // {
            //   question: "What kind of properties are listed on your website?",
            //   answer:
            //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget.",
            // },
            {
              question: "Who should I contact in case I face any issues?",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget.",
            },
            {
              question:
                "How soon would I receive a call from you after placing my requirement?",
              answer:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendiss malesuada lacus ex, sit amet blandit leo lobortis eget.",
            },
          ].map(({ question, answer }, ind) => {
            return (
              <Accordion
                key={ind}
                expanded={expanded === `panel${ind + 1}`}
                onChange={handleChange(`panel${ind + 1}`)}
                sx={{ borderRadius: 1 }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      sx={{ color: "brandColor.main", fontSize: "1.8rem" }}
                    />
                  }
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: {
                        md: "1.4rem",
                      },
                      fontWeight: 500,
                      // color: "#000",

                      // title: #05050E
                      // subtitle: #080B14
                      // text:#ACB2C1
                      color: "#080B14",
                      mr: 0.5,
                    }}
                  >
                    {question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    fontSize: {
                      md: "1.2rem",
                    },
                    fontWeight: 500,
                    // color: "rgb(27, 27, 27,0.8)",
                    // color: "rgba(8, 11, 20, 0.429)",
                    // color: "rgba(51, 53, 51, 0.825)",
                    color: "rgba(33, 37, 41, 0.8)",
                  }}
                >
                  {answer}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Stack>
        <Stack spacing={2.5}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: "#05050E",
                fontWeight: 600,
                fontSize: { md: "2.4rem" },
              }}
            >
              Still have questions?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { md: "1.1rem" },
                color: "rgba(33, 37, 41, 0.85)",
              }}
            >
              Can&apos;t find the answer you&apos;re looking for? Please contact
              with our customer service.
            </Typography>
          </Box>
          <Button
            sx={{
              bgcolor: "brandColor.main",
              alignSelf: "start",
              padding: "0.6rem 2rem",
              color: "primary.main",
              fontSize: "1rem",
              borderRadius: 2,
              "&:hover": {
                borderColor: "brandColor.main",
                bgcolor: "rgb(0, 102, 255,0.9)",
              },
            }}
          >
            Contact us
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default FAQSection;

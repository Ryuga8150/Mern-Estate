import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";

import styled from "@emotion/styled";

// #9EAAA9
// #FAFAFA
// field
// #FDFDFD
const StyledContainer = styled(Container)({
  padding: "2.4rem 0",
});

const StyledGrid = styled(Box)({
  display: "grid",
  justifyContent: "space-between",
});

function SkeletonListing() {
  return (
    <StyledContainer
      maxWidth="lg"
      sx={{
        paddingLeft: {
          sm: 1.6,
        },
        paddingRight: {
          sm: 0,
        },
      }}
    >
      <div>
        <StyledGrid
          sx={{ gridTemplateColumns: "1.25fr 0.75fr", columnGap: 10, mb: 5 }}
        >
          <Box>
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: { md: "5.5rem" }, mb: 1 }}
              width={365}
              height={106}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: { md: "1.2rem" }, mb: 2 }}
              width={365}
              height={34}
            />
            <Skeleton
              variant="rounded"
              animation="wave"
              width={630}
              height={84}
              sx={{ mb: 2.7 }}
              // fontSize: "1.2rem"
            />

            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
              {Array.from(Array(3).keys()).map((val) => (
                <Paper
                  key={val}
                  elevation={3}
                  sx={{
                    // bgcolor: "rgba(204, 224, 255, 0.2)",
                    borderRadius: 3,
                  }}
                >
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(4,1fr)"
                    gridTemplateRows="repeat(2,1fr)"
                    sx={{
                      padding: "0.8rem",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    rowGap={0}
                    columnGap={2}
                  >
                    <Box
                      gridColumn="span 2"
                      gridRow="span 2"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={64}
                        height={64}
                        sx={{ borderRadius: "9px" }}
                      />
                      {/* <Icon
                        sx={{ width: 64, height: 64, color: "brandColor.main" }}
                      /> */}
                    </Box>
                    <Box gridColumn="span 2" gridRow="span 1" sx={{}}>
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: { md: "1.1rem" } }}
                        width={89}
                        height={27}
                      />
                    </Box>
                    <Box
                      gridColumn="span 2"
                      gridRow="span 1"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: { md: "1.2rem", textAlign: "center" } }}
                        width={70}
                      />
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
          <Paper
            sx={{
              padding: "1.2rem",
              height: "auto",
              alignSelf: "start",
              borderRadius: 5,
            }}
            elevation={3}
          >
            <Box>
              <Skeleton
                variant="text"
                width={90}
                height={40}
                sx={{ fontSize: { md: "1.4rem" } }}
              />

              <Stack direction="row" spacing={2} alignItems="center">
                <Skeleton
                  variant="text"
                  width={181}
                  height={84}
                  sx={{ fontSize: { md: "3rem" } }}
                />
                <Skeleton
                  variant="text"
                  width={96}
                  height={41}
                  sx={{ fontSize: { md: "1.6rem" } }}
                />
              </Stack>

              <Skeleton
                variant="rounded"
                height={56}
                sx={{ borderRadius: "8px" }}
              />
            </Box>
          </Paper>
        </StyledGrid>

        <Paper
          sx={{
            padding: "2rem 2rem",
            borderRadius: 5,
            mb: 5,
          }}
          elevation={9}
        >
          <Skeleton
            variant="rectangular"
            width={1120}
            height={512}
            sx={{ borderRadius: "16px" }}
          />
        </Paper>

        <StyledGrid sx={{ mb: 6, gridTemplateColumns: "1.15fr 0.85fr" }}>
          <Box>
            <Skeleton
              variant="text"
              sx={{
                mb: 3,
                fontSize: {
                  md: "3rem",
                },
              }}
              height={60}
              width={330}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "repeat(10,auto)",
                gridAutoFlow: "column",
                // gridAutoColumns: "repeat(auto-fill,1fr)",
                rowGap: 2,
              }}
            >
              {Array.from(Array(16).keys()).map((val) => (
                <Box key={val} sx={{ display: "flex", alignItems: "center" }}>
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={30}
                    height={30}
                    sx={{ mr: 2 }}
                    // 1.2em
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={220}
                    height={27}
                    sx={{
                      fontSize: { md: "1.1rem" },
                    }}
                    // 1.2em
                  />
                </Box>
              ))}
            </Box>
          </Box>
          <Stack>
            <Skeleton
              variant="text"
              sx={{ mb: 3, fontSize: { md: "3rem" } }}
              height={60}
              width={330}
            />

            <Paper sx={{ borderRadius: 5 }} elevation={5}>
              {/* <LocationMap /> */}
              <Box sx={{ padding: "1.2rem", width: "100%", height: "100%" }}>
                <Skeleton
                  variant="rounded"
                  height={392}
                  sx={{ borderRadius: "12px" }}
                />
              </Box>
            </Paper>
          </Stack>
        </StyledGrid>

        {/* <FAQSection /> */}
      </div>
    </StyledContainer>
  );
}

export default SkeletonListing;

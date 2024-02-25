import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

function NewsLetter() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // padding: "2.4rem 4.4rem 4.8rem 4.4rem",
        padding: "4.4rem 4.4rem 6.2rem 4.4rem",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          columnGap: 5,
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#FFF9E6",
          padding: "2.4rem",
          borderRadius: 7,
        }}
      >
        <Stack spacing={1}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "geranium",
              fontWeight: 500,
              fontSize: { md: "3.2rem" },
            }}
          >
            Join Our Newsletter
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: "#888987", fontSize: { md: "0.95rem" } }}
          >
            Join over 1,000 satisfied real estate customers today
          </Typography>
        </Stack>
        {/* <input>Enter your Input</input> */}
        <OutlinedInput
          id="outlined-adornment-password"
          type="search"
          sx={{
            borderRadius: 50,
            bgcolor: "#fff",
            paddingRight: 0,

            "& .MuiOutlinedInput-input": {
              paddingLeft: "25px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 0,
            },
            "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "transparent",
              },
          }}
          placeholder="Enter your email"
          endAdornment={
            <InputAdornment position="end">
              <Button
                aria-label=""
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
                type="submit"
                sx={{
                  bgcolor: "brandColor.main",
                  borderRadius: 50,
                  height: "56px",
                  padding: "0.6rem 1.6rem",

                  "&:hover": {
                    borderColor: "brandColor.main",
                    bgcolor: "rgb(0, 102, 255,0.9)",
                  },
                }}
              >
                Subscribe
              </Button>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  );
}

export default NewsLetter;

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

import PropTypes from "prop-types";

SkeletonCard.propTypes = {
  listing: PropTypes.object,
  descriptionLength: PropTypes.number,
  elevation: PropTypes.number,
  hover: PropTypes.bool,
};
function SkeletonCard({ elevation = 3, hover = true }) {
  return (
    <Paper
      sx={{
        padding: "1.2rem",
        borderRadius: 4,
        width: "340px",
        ...(hover && {
          "&:hover": {
            transform: "scale(1.1)",
            transition: "transform ease-out 0.5s",
          },
        }),
      }}
      elevation={3}
    >
      <Skeleton
        variant="rectangular"
        width={302}
        height={190}
        animation="wave"
        sx={{ borderRadius: "9px" }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 1.8 }}
      >
        <Stack spacing={1.4} direction="row" alignItems="center">
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: "1.6rem" }}
            width={97}
            height={45}
          />
          <Skeleton
            variant="text"
            animation="wave"
            sx={{ fontSize: "1rem" }}
            width={60}
            height={35}
          />
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Skeleton
            variant="circular"
            animation="wave"
            width={30}
            height={30}
          />
          <Skeleton
            variant="circular"
            animation="wave"
            sx={{ ml: 1 }}
            width={30}
            height={30}
          />
        </Box>
      </Stack>

      <Box sx={{ mb: "8px", mt: "2px" }}>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: "1.6rem" }}
          width={125}
          // height={25}
        />
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: "1.1rem" }}
          width={250}
          // height={25}
        />
      </Box>

      <Stack spacing={0.1} sx={{ mb: "8px" }}>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: "1.3rem" }}
          width={295}
          // height={30}
        />
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ fontSize: "1.3rem" }}
          width={50}
          // height={30}
        />
      </Stack>

      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 1.25 }}
      >
        {Array.from(Array(3).keys()).map((val) => (
          <Stack key={val} direction="row" spacing={0.8} alignItems="center">
            <Skeleton
              variant="circular"
              animation="wave"
              width={30}
              height={30}
            />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ fontSize: "1.1rem" }}
              width={45}
            />
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}

export default SkeletonCard;

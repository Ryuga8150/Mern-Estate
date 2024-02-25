import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

function SkeletonShowListingCard() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ pt: 1, pb: 1, pl: 2, pr: 2 }}
    >
      <Skeleton
        animation="wave"
        variant="rounded"
        width={90}
        height={57}
        sx={{ borderRadius: 1.5 }}
      />
      <Skeleton animation="wave" variant="text" width={135} />
      <Box sx={{ display: "flex", alignItems: "center", pl: 0.2 }}>
        <Skeleton
          animation="wave"
          variant="circular"
          width={28}
          height={28}
          sx={{ mr: 0.5 }}
        />
        <Skeleton animation="wave" variant="circular" width={28} height={28} />
      </Box>
    </Stack>
  );
}

export default SkeletonShowListingCard;

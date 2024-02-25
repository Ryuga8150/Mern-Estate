import {
  Avatar,
  AvatarGroup,
  Box,
  Link,
  Stack,
  Typography,
} from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "calc(100% - 107.188px)",
      }}
    >
      <Stack spacing={1} alignItems="center" sx={{ mb: 22 }}>
        <Typography
          variant="h2"
          sx={{ color: "primary.main", fontWeight: 700, fontFamily: "editor" }}
          textAlign="center"
        >
          Buy, Sell or Rent Property
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "rgba(233, 236, 239,0.9)", width: "28rem" }}
          textAlign="center"
        >
          Dive into a world of comfort and convenience as we connect you with
          the finest properties,ensuring a perfect gateway tailored to your
          preferences
        </Typography>
        <Link to="/about">Learn More &rarr;</Link>
      </Stack>
      <Stack
        spacing={2}
        sx={{
          color: "primary.main",
          position: "absolute",
          bottom: 20,
          left: 20,
          width: "24rem",
        }}
        alignItems="flex-start"
      >
        <AvatarGroup
          total={20}
          sx={{
            "& .MuiAvatar-root": {
              borderColor: "brandColor.light2",
            },
            "& .MuiAvatar-colorDefault": {
              bgcolor: "brandColor.light2",
            },
          }}
        >
          <Avatar alt="Remy Sharp" src="/avatars/avatar-1.jpg" />
          <Avatar alt="Travis Howard" src="/avatars/avatar-2.jpg" />
          <Avatar alt="Agnes Walker" src="/avatars/avatar-3.jpg" />
          <Avatar alt="Trevor Henderson" src="/avatars/avatar-4.jpg" />
        </AvatarGroup>
        <Typography
          variant="body2"
          sx={{ color: "rgba(233, 236, 239,0.65)", width: "22rem" }}
        >
          Our agents help you find your dream homes or investment properties by
          understanding our needs and preferences and then searching for
          suitable options
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{ position: "absolute", bottom: 40, right: 35 }}
        spacing={2}
      >
        {[
          { label: "17K+", description: "Premium Product" },
          { label: "12K+", description: "Happy Customers" },
          { label: "50+", description: "Award Winning" },
        ].map(({ label, description }, ind) => (
          <Stack key={ind} spacing={0.2}>
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                fontSize: "2.4rem",
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{
                // color: "primary.main",
                color: "rgba(233, 236, 239,0.85)",
                fontWeight: 400,
                fontSize: "1rem",
              }}
            >
              {description}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default HeroSection;

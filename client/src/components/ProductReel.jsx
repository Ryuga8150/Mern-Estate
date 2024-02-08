import PropTypes from "prop-types";
import { Box, Stack, Typography, Link } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "./Card";

ProductReel.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};
function ProductReel({ label, url = "" }) {
  const [listings, setListings] = useState(null);
  useEffect(
    function () {
      const fetchListings = async () => {
        try {
          const res = await fetch(
            `/api/listing/get?searchTerm=property&limit=3${url}`
          );
          const data = await res.json();
          console.log(data);
          setListings(data.data.listings);
        } catch (err) {
          console.log(err);
        }
      };
      fetchListings();
    },
    [url]
  );

  return (
    <Box sx={{ padding: "2.4rem 1.2rem 3.8rem 1.2rem" }}>
      <Stack spacing={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: {
                md: "2.4rem",
              },
            }}
          >
            {label}
          </Typography>
          <Link
            variant="body1"
            sx={{
              color: "brandColor.main",
              fontSize: {
                md: "1rem",
              },
            }}
          >
            See All Listings &rarr;
          </Link>
        </Stack>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            columnGap: 5,
          }}
        >
          {!listings && <span>Loading...</span>}
          {listings &&
            listings.map((listing, ind) => (
              <Card
                key={listing._id}
                listing={listing}
                descriptionLength={75}
                elevation={3}
              />
            ))}
        </Box>
      </Stack>
    </Box>
  );
}

export default ProductReel;

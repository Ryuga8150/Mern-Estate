import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

ProductReel.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
};
function ProductReel({ label, url = "" }) {
  const [listings, setListings] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(
    function () {
      const fetchListings = async () => {
        try {
          // `/api/listing/get?searchTerm=property&limit=3${url}`
          setLoading(true);
          setError(false);
          const res = await fetch(`/api/listing/get?limit=3${url}`);
          const data = await res.json();
          // console.log(data);
          setLoading(false);
          setListings(data.data.listings);
        } catch (err) {
          setLoading(false);
          setError(true);
          console.log(err);
          toast.error(err.message);
        }
      };
      fetchListings();
    },
    [url]
  );
  // useEffect(
  //   function () {
  //     if (error) {
  //       toast.error(error);
  //       setError(null);
  //     }
  //   },
  //   [error]
  // );
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
          {loading && [1, 2, 3].map((id) => <SkeletonCard key={id} />)}

          {error && <span>Error While Fetching from API</span>}

          {listings?.length > 0 &&
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

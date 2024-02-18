import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SortIcon from "@mui/icons-material/Sort";

SearchListings.propTypes = {
  listings: PropTypes.array,
};

// bg color : #f5f5f5
// color: #7D7D7D
const StyledSortByTypography = styled(Typography)((props) => {
  return {
    // border: "solid 2px",
    // borderColor: "#23222A",
    padding: "0.2rem 0.8rem",
    borderRadius: 20,
    // border: "solid 1px",
    [props.theme.breakpoints.up("md")]: {
      fontSize: "0.85rem",
    },
    fontWeight: 500,
  };
});

function SearchListings() {
  // console.log("In listings");
  // console.log(listings);
  const [listings, setListings] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSortIndex, setActiveSortIndex] = useState(0);

  useEffect(
    function () {
      const fetchListings = async () => {
        try {
          console.log("In API GET Listings");

          let query = [];

          const searchTerm = searchParams.get("searchTerm");
          query.push("searchTerm=" + searchTerm);
          console.log(searchTerm);

          const priceRange = searchParams.get("price");
          if (priceRange) query.push("price=" + priceRange);
          console.log(priceRange);

          const type = searchParams.get("type");
          if (type) query.push("type=" + type);

          const benefits = searchParams.getAll("benefits");
          if (benefits.length > 0)
            query.push("benefits=" + JSON.stringify(benefits));

          const facilities = searchParams.getAll("facilities");
          console.log(facilities);
          if (facilities.length > 0)
            query.push("facilities=" + JSON.stringify(facilities));

          const sortBy = searchParams.get("sortBy");
          if (sortBy) query.push("sortBy=" + sortBy);

          const order = searchParams.get("order");
          if (order) query.push("order=" + order);

          const discounts = searchParams.getAll("discount");
          if (discounts.length > 0)
            query.push("discount=" + JSON.stringify(discounts));
          console.log(discounts);

          const apiQueryParams = query.join("&");
          console.log(apiQueryParams);

          const res = await fetch(`/api/listing/get?${apiQueryParams}`);
          const data = await res.json();
          console.log(data);
          setListings(data.data.listings);
        } catch (err) {
          console.log(err);
        }
      };
      fetchListings();
    },
    [searchParams]
  );

  if (!listings) return <span>Loading...</span>;

  if (listings.length === 0) return <span>Sorry! No Listings present</span>;

  return (
    <Box
      sx={{
        padding: "0.6rem 1.2rem",
        height: "100%",
        width: "100%",
        bgcolor: "#fff",
        overflowY: "scroll",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4">Your Listings: </Typography>
        <Stack
          spacing={5}
          direction="row"
          alignItems="center"
          sx={{
            "&.MuiStack-root>:not(style)~:not(style)": {
              marginTop: 0.2,
            },
          }}
        >
          {/* <SortIcon sx={{ pl: 2 }} /> */}
          {[
            { label: "Latest", sortBy: "createdAt", order: "desc" },
            { label: "Oldest", sortBy: "createdAt", order: "asc" },
            {
              label: "Price Low to High",
              sortBy: "price",
              order: "asc",
            },
            {
              label: "Price High to Low",
              sortBy: "price",
              order: "desc",
            },
          ].map(({ label, sortBy, order }, ind) => (
            <StyledSortByTypography
              key={ind}
              variant="subtitle1"
              sx={{
                ...(ind === 0 && { marginTop: "2px !important" }),
                ...(activeSortIndex === ind
                  ? { bgcolor: "#23222A", color: "#FAFAFA" }
                  : { bgcolor: "#f5f5f5", color: "#7D7D7D" }),
                cursor: "pointer",
              }}
              onClick={() => {
                setActiveSortIndex(ind);
                setSearchParams((searchParams) => {
                  console.log("Clicked");
                  searchParams.set("sortBy", sortBy);
                  searchParams.set("order", order);
                  return searchParams;
                });
              }}
            >
              {label}
            </StyledSortByTypography>
          ))}
        </Stack>
        <Box
          sx={{
            display: "grid",
            alignItems: "center",
            gridTemplateColumns: "repeat(2,1fr)",
            // overflowY: "auto",
            // overflowX: "scroll",
            columnGap: 3,
            rowGap: 2.5,
            pt: 1,
            pl: 1,
            pr: 1,
            pb: 1,
            // height: "32rem",
            // height: "100%",
          }}
        >
          {!listings && <span>Loading...</span>}
          {listings &&
            listings.map((listing) => (
              <Card
                key={listing._id}
                listing={listing}
                hover={false}
                descriptionLength={105}
              />
            ))}

          {/* <Card ind={3} /> */}
        </Box>
      </Stack>
    </Box>
  );
}

export default SearchListings;

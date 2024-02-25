import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import BathroomIcon from "@mui/icons-material/Bathroom";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import HouseIcon from "@mui/icons-material/House";
// import BalconyIcon from "@mui/icons-material/Balcony";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import WaterIcon from "@mui/icons-material/Water";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DoorSlidingIcon from "@mui/icons-material/DoorSliding";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import StraightenIcon from "@mui/icons-material/Straighten";
//  dimensions
import ParkIcon from "@mui/icons-material/Park";
import CountertopsIcon from "@mui/icons-material/Countertops";
import LightIcon from "@mui/icons-material/Light";
// exterior lighting
import MyLocationIcon from "@mui/icons-material/MyLocation";
import MapIcon from "@mui/icons-material/Map";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

// Open floor plan
import ImageSlider from "../components/ImageSlider";

import LocationMap from "../components/LocationMap";
// import FAQSection from "../components/FAQSection";

import Contact from "../components/Contact";
import { formatCurrency } from "../../utils/helpers";
import SkeletonListing from "../components/SkeletonListing";

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

function Listing() {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { listingID } = useParams();
  // console.log(listing);

  // const { currentUser } = useSelector((store) => {
  //   // console.log(store);
  //   return store.user;
  // });
  // const { user } = currentUser ? currentUser.data : {};

  useEffect(
    function () {
      const fetchListing = async () => {
        try {
          setError(false);
          setLoading(true);
          // console.log(listingID);
          const res = await fetch(`/api/listing/get/${listingID}`);
          const data = await res.json();
          if (data.status !== "success") {
            // console.log("Error at Listing Component API Call");
            throw new Error(data.message);
          }
          // console.log(data);
          setListing(data.data.listing);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setError(true);
          setLoading(false);
          toast.error(err.message);
        }
      };
      fetchListing();
    },
    [listingID]
  );

  if (loading) return <SkeletonListing />;

  if (error) return <span>Error While Fetching Data..</span>;

  // if (loading || !listing) return <span>Loading...</span>;

  if (listing.length === 0) return;

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
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", fontSize: { md: "5.5rem" }, mb: 1 }}
            >
              {listing.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: "#64748b",
                fontSize: { md: "1.2rem" },
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <LocationOnIcon sx={{ mr: 1, width: "1.1em", height: "1.1em" }} />
              <span>{listing.address}</span>
            </Typography>

            <Typography variant="body2" sx={{ fontSize: "1.2rem", mb: 2.5 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam
              minima dolorem fugit? Accusantium ipsam harum rerum itaque nobis,
              molestias tempora, voluptate eum, repellat iure odio reiciendis
              architecto aut dicta!
            </Typography>

            <Stack direction="row" spacing={3} sx={{ mb: 4 }}>
              {[
                {
                  label: "Bathrooms",
                  quantity: listing.bathrooms,
                  Icon: BathroomIcon,
                },
                {
                  label: "Bedrooms",
                  quantity: listing.bedrooms,
                  Icon: BedroomParentIcon,
                },
                {
                  label: "Area (sq/ft)",
                  quantity: 42,
                  Icon: SquareFootIcon,
                },
              ].map(({ label, quantity, Icon }, ind) => (
                <Paper
                  key={ind}
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
                      <Icon
                        sx={{ width: 64, height: 64, color: "brandColor.main" }}
                      />
                    </Box>
                    <Box gridColumn="span 2" gridRow="span 1" sx={{}}>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: "1.1rem", fontWeight: 700 }}
                        textAlign="center"
                      >
                        {label}
                      </Typography>
                    </Box>
                    <Box gridColumn="span 2" gridRow="span 1" sx={{}}>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "1.2rem", fontWeight: 700 }}
                        textAlign="center"
                      >
                        {quantity}
                      </Typography>
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
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {`For ${listing.type}`}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                {listing.discount && listing.discount > 0 ? (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: { md: "3rem" },

                      fontWeight: 600,
                    }}
                  >
                    {formatCurrency(
                      listing.regularPrice -
                        (listing.regularPrice * listing.discount) / 100
                    )}
                  </Typography>
                ) : null}

                <Typography
                  variant="h6"
                  sx={{
                    ...(listing.discount
                      ? {
                          fontSize: { md: "1.6rem" },
                          textDecoration: "line-through",
                        }
                      : {
                          fontSize: { md: "3rem" },
                        }),
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(listing.regularPrice)}
                </Typography>
                {/* <Typography
                  variant="h6"
                  sx={{ fontSize: { md: "3rem" }, fontWeight: 600 }}
                >
                  {formatCurrency(12500)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontSize: { md: "1.6rem" },
                    textDecoration: "line-through",
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(13500)}
                </Typography> */}
              </Stack>

              <Contact listing={listing} />
            </Box>
          </Paper>
        </StyledGrid>
        <ImageSlider imgArr={listing.imageUrls} />
        <StyledGrid sx={{ mb: 6, gridTemplateColumns: "1.15fr 0.85fr" }}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                fontSize: {
                  // lg: "2.4rem",
                  md: "3rem",
                },
              }}
            >
              Overview
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "repeat(10,auto)",
                gridAutoFlow: "column",
                // gridAutoColumns: "repeat(auto-fill,1fr)",
                rowGap: 2,
              }}
            >
              {[
                {
                  Icon: StraightenIcon,
                  label: `Dimensions: ${listing.dimensions
                    .split("X")
                    .join(" X ")}`,
                  show: true,
                },
                {
                  Icon: LoyaltyIcon,
                  label: `Type: ${listing.type}`,
                  show: true,
                },
                {
                  Icon: MyLocationIcon,
                  label: `Facing: ${listing.facing}`,
                  show: true,
                },
                {
                  Icon: ElectricBoltIcon,
                  label: "1200 V.P.A",
                  show: listing.facilities.electricity,
                },
                {
                  Icon: DoorSlidingIcon,
                  label: "Built-in wardrobes",
                  show: true,
                },
                {
                  Icon: WaterIcon,
                  label: "24 Hours",
                  show: listing.facilities.water,
                },
                {
                  Icon: HouseIcon,
                  label: "Secure Parking",
                  show: listing.facilities.parking,
                },
                {
                  Icon: CountertopsIcon,
                  label: "Modern Kitchen",
                  show: listing.facilities.kitchen,
                },
                {
                  Icon: LightIcon,
                  label: "External Lighting",
                  show: listing.facilities.externalLighting,
                },
                {
                  Icon: DirectionsBusIcon,
                  label: "Within 5 Km",
                  show: listing.benefits.bus,
                },
                {
                  Icon: AirplanemodeActiveIcon,
                  label: "Within 10 Km",
                  show: listing.benefits.airport,
                },
                {
                  Icon: ParkIcon,
                  label: "Close To City Garden",
                  show: listing.benefits.cityGarden,
                },
                {
                  Icon: MapIcon,
                  label: "Open Floor Plan",
                  show: listing.facilities.openFloorPlan,
                },
              ]
                .filter((obj) => obj.show === true)
                .map(({ Icon, label }, ind) => (
                  <Box key={ind} sx={{ display: "flex", alignItems: "center" }}>
                    <Icon
                      sx={{
                        mr: 2,
                        // color: "#206ad3",
                        color: "brandColor.main",
                        width: "1.2em",
                        height: "1.2em",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgb(27, 27, 27,0.9)",
                        fontSize: { md: "1.1rem", color: "#000000b8" },
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Box>
          <Stack>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: {
                  // lg: "2.4rem",
                  md: "3rem",
                },
              }}
              textAlign="center"
            >
              Location
            </Typography>
            <Paper sx={{ borderRadius: 5 }} elevation={5}>
              <LocationMap />
            </Paper>
          </Stack>
        </StyledGrid>

        {/* <FAQSection /> */}
      </div>
    </StyledContainer>
  );
}

export default Listing;

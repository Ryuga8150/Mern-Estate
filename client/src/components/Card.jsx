import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
import styled from "@emotion/styled";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import BathroomIcon from "@mui/icons-material/Bathroom";
// import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
// import StraightenIcon from "@mui/icons-material/Straighten";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
// import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
const ImageContainer = styled("div")({
  width: "100%",
  // overflow: "hidden",
});

const Image = styled("img")({
  width: "100%",
  height: "190px",
  borderRadius: 9,
  backgroundSize: "cover",
});

Card.propTypes = {
  listing: PropTypes.object,
  descriptionLength: PropTypes.number,
  elevation: PropTypes.number,
  hover: PropTypes.bool,
};
function Card({
  listing,
  descriptionLength = 140,
  elevation = 3,
  hover = true,
}) {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  // Link component={RouterLink} to={`/listing/${listing._id}`}
  return (
    <Box
      onClick={() => {
        navigate(`/listing/${listing._id}`);
      }}
    >
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
        elevation={elevation}
      >
        <Stack spacing={1}>
          <ImageContainer>
            <Image src={listing.imageUrls[0]} alt="Property" />
          </ImageContainer>
          {/* <Typography
            variant="h4"
            textAlign="center"
            sx={{ fontSize: { md: "2rem" }, fontWeight: 600 }}
          >
            {listing.name}
          </Typography> */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1.4} alignItems="center">
                {listing.discount && listing.discount > 0 ? (
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontSize: { md: "1.6rem" },

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
                          fontSize: { md: "1rem" },
                          textDecoration: "line-through",
                        }
                      : {
                          fontSize: { md: "1.6rem" },
                          lineHeight: 1.75,
                        }),

                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(listing.regularPrice)}
                </Typography>
              </Stack>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                {favorite ? (
                  <FavoriteIcon
                    sx={{
                      color: "brandColor.main",
                      "@keyframes scaleHeart": {
                        "0%": {
                          transform: "scale(0)",
                        },
                        "35%": {
                          transform: "scale(0.35)",
                        },
                        "75%": {
                          transform: "scale(0.75)",
                        },
                        "100%": {
                          transform: "scale(1)",
                        },
                      },
                      "@keyframes deScaleHeart": {
                        "0%": {
                          transform: "scale(2)",
                        },
                        "35%": {
                          transform: "scale(1.75)",
                        },
                        "75%": {
                          transform: "scale(1.35)",
                        },
                        "100%": {
                          transform: "scale(1)",
                        },
                      },
                      animation: "deScaleHeart 0.4s ease-in-out",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      // console.log(e);
                      setFavorite(!favorite);
                    }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    sx={{
                      color: "brandColor.main",
                    }}
                    onClick={(e) => {
                      // console.log(e);
                      e.stopPropagation();
                      setFavorite(!favorite);
                    }}
                  />
                )}
                {/* <ShareIcon
                  sx={{
                    color: "brandColor.main",
                    ml: 1,
                  }}
                /> */}
                <ContentCopyIcon
                  sx={{
                    color: "brandColor.main",
                    ml: 1,
                  }}
                />
              </Box>
            </Stack>

            <Typography
              variant="h4"
              sx={{
                fontSize: { md: "1.6rem" },
                fontWeight: 400,
                fontFamily: "sans-neue-heavy,sans-serif",
                mt: 0,
                color: "#23222A",
              }}
            >
              {listing.name}
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "#585858",
                fontSize: { md: "0.8rem" },
                display: "flex",
                alignItems: "center",
                // mt: -25000,
              }}
            >
              <LocationOnIcon
                sx={{
                  mr: 0.5,
                  ml: -0.45,
                  width: "1em",
                  height: "1em",
                  color: "#1e914e",
                }}
              />
              <span>{listing.address}</span>
            </Typography>
          </Box>
          <Typography
            paragraph
            sx={{ hyphens: "auto", color: "#4c4b4b", fontSize: "1rem" }}
          >
            {listing.description.slice(0, descriptionLength) +
              (listing.description.length > descriptionLength ? "..." : "")}
          </Typography>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ pt: 0.2 }}
          >
            {[
              {
                Icon: BedOutlinedIcon,
                label: `${listing.bedrooms} Beds`,
                color: "#41A148",
              },
              {
                Icon: BathtubOutlinedIcon,
                label: `${listing.bathrooms} Baths`,
                color: "#FFC92B",
              },
              { Icon: SquareFootIcon, label: "25 sq/ft", color: "#EE442D" },
              // { Icon: StraightenIcon, label: "25 sq/ft", color: "#EE442D" },
            ].map(({ Icon, label, color }, ind) => (
              <Stack
                key={ind}
                direction="row"
                spacing={0.8}
                alignItems="center"
              >
                <Box
                  sx={{
                    borderRadius: 50,
                    // bgcolor: "#221",
                    // bgcolor: "#f9f9f9",
                    bgcolor: "#fffefe",
                    border: "solid 1px",
                    borderColor: "#E7E7E7",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0.7,
                  }}
                >
                  <Icon
                    sx={{
                      color,
                    }}
                  />
                </Box>
                <Typography variant="body2">{label}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}

export default Card;

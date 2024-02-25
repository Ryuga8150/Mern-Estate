import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import * as React from "react";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
// import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import { app } from "../firebase";
import { deleteObject, getStorage, ref } from "firebase/storage";

import { useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import SkeletonShowListingCard from "./SkeletonShowListingCard";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ListingDrawer() {
  const [state, setState] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((store) => store.user);
  const { user } = currentUser ? currentUser.data : {};
  // console.log(listings);
  const navigate = useNavigate();
  // console.log(listings);

  const handleDeleteListing = async function (deleteListingID) {
    try {
      setError(false);
      setLoading(true);
      // console.log(deleteListingID);
      const deletelistingData = listings.filter(
        (listing) => listing._id === deleteListingID
      )[0];
      const remaininglistingData = listings.filter(
        (listing) => listing._id !== deleteListingID
      );
      // console.log("DEleted");
      // console.log(deletelistingData);
      // console.log(listings);
      // console.log("Remaining");
      // console.log(remaininglistingData);

      const storage = getStorage(app);

      let listingImagePromises = [];

      deletelistingData.imageUrls.forEach((imgUrl) => {
        const imgRef = ref(storage, imgUrl);
        const promise = deleteObject(imgRef);
        listingImagePromises.push(promise);
      });
      // console.log(listingImagePromises);
      await Promise.all(listingImagePromises);
      // navigate(`/update-listing/${editListingID}`);
      // console.log("Images Deleted Successfully");

      await fetch(`/api/listing/delete/${deleteListingID}`, {
        method: "DELETE",
      });
      // console.log(data);
      // console.log("Before");
      // console.log(listings);
      setListings(remaininglistingData);
      // console.log("After");
      // console.log(listings);
      // setState(false);
      setLoading(false);
      toast.success("Listing Deleted Successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleEditListing = function (editListingID) {
    // console.log(editListingID);
    navigate(`/update-listing/${editListingID}`);
  };

  useEffect(
    function () {
      if (!state) return;

      const handleListings = async function () {
        try {
          if (!user._id) {
            console.log("You are not logged in ");
            setError(true);
            throw new Error("You are not logged in");
          }
          setError(false);
          setLoading(true);
          const res = await fetch(`/api/user/listings/${user._id}`);
          const data = await res.json();

          if (data.status !== "success") {
            setError(true);
            throw new Error(data.message);
          }
          // console.log(data);
          setListings(data.data.listings);
          setLoading(false);
        } catch (err) {
          console.log(err);
          toast.error(err.message);
          setLoading(false);
          // setError(false);
        }
      };

      handleListings();
    },
    [state, setListings, user._id]
  );
  const toggleDrawer = (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(!state);
  };

  const list2 = () => (
    <Grid item xs={12} md={6} sx={{ width: 350 }}>
      <Typography
        sx={{
          mt: 4,
          mb: 1,
          ml: 2,
          mr: 2,
          fontSize: { md: "2rem" },
          fontWeight: 600,
          fontFamily: "sans-neue-heavy,sans-serif",
        }}
        variant="h6"
        component="div"
      >
        Listings
      </Typography>
      <Demo>
        <List

        // dense={dense}
        >
          {listings && listings.length === 0 && (
            <Box sx={{ pl: 2, pr: 2 }}>No Listings Present</Box>
          )}
          {listings &&
            listings.length > 0 &&
            listings.map((listing) => (
              <>
                <ListItem
                  secondaryAction={
                    <Box spacing={2}>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditListing(listing._id)}
                      >
                        <EditIcon
                          sx={{
                            color: "#f57c00",
                            width: "1.1em",
                            height: "1.1em",
                          }}
                        />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteListing(listing._id)}
                      >
                        <DeleteIcon
                          sx={{
                            color: "#d32f2f",
                            width: "1.1em",
                            height: "1.1em",
                          }}
                        />
                      </IconButton>
                    </Box>
                  }
                  key={listing._id}
                >
                  <ListItemAvatar
                    sx={{
                      minWidth: 105,
                      // default was 54px
                    }}
                  >
                    <Avatar
                      variant="square"
                      alt={listing.name}
                      src={listing.imageUrls[0]}
                      sx={{ width: 90, height: "auto", borderRadius: 1.5 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={listing.name}
                    sx={{
                      // textAlign: "center"
                      fontSize: "1.1rem",
                    }}
                    // secondary={secondary ? "Secondary text" : null}
                  />
                </ListItem>
                <Divider />
              </>
            ))}
        </List>
      </Demo>
    </Grid>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Link
        color="secondary.main"
        variant="h6"
        underline="hover"
        // #155d27
        sx={{ cursor: "pointer", mr: "45px", color: "#2c6d3d" }}
        onClick={() => {
          toggleDrawer();
          // handleListings();
        }}
      >
        Show Listings
      </Link>
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {error && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: 200,
              height: "100%",
              pl: 2,
              pr: 2,
              pt: 12,
            }}
          >
            <span>Error While Fetching Listings...</span>
          </Box>
        )}
        {!error ? (
          loading || listings === null || listings === undefined ? (
            <>
              <Skeleton
                variant="text"
                width={185}
                sx={{
                  mt: 4,
                  mb: 2.5,
                  ml: 2,
                  mr: 2,
                  fontSize: { md: "2rem" },
                  fontWeight: 600,
                }}
              />
              {Array.from(Array(3).keys()).map((val) => (
                <>
                  <SkeletonShowListingCard key={val} />
                  <Divider />
                </>
              ))}
            </>
          ) : (
            list2()
          )
        ) : null}
      </SwipeableDrawer>
    </Box>
  );
}

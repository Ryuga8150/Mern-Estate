import * as React from "react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import EditIcon from "@mui/icons-material/Edit";
import { app } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

import { useState } from "react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Demo = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
export default function ListingDrawer() {
  const [state, setState] = useState(false);
  const [listings, setListings] = useState(null);
  const { currentUser } = useSelector((store) => store.user);
  const { user } = currentUser ? currentUser.data : {};
  // console.log(listings);
  const navigate = useNavigate();
  console.log(listings);
  const handleListings = async function () {
    try {
      if (!user._id) {
        console.log("You are not logged in ");
        return;
      }
      const res = await fetch(`/api/user/listings/${user._id}`);
      const data = await res.json();

      if (data.status !== "success") {
        return;
      }
      console.log(data);
      setListings(data.data.listings);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteListing = async function (deleteListingID) {
    try {
      console.log(deleteListingID);
      const deletelistingData = listings.filter(
        (listing) => listing._id === deleteListingID
      )[0];
      const remaininglistingData = listings.filter(
        (listing) => listing._id !== deleteListingID
      )[0];
      console.log(deletelistingData);
      console.log(listings);
      console.log(remaininglistingData);

      const storage = getStorage(app);

      let listingImagePromises = [];

      deletelistingData.imageUrls.forEach((imgUrl) => {
        const imgRef = ref(storage, imgUrl);
        const promise = deleteObject(imgRef);
        listingImagePromises.push(promise);
      });
      console.log(listingImagePromises);
      await Promise.all(listingImagePromises);
      // navigate(`/update-listing/${editListingID}`);
      console.log("Images Deleted Successfully");

      const res = await fetch(`/api/listing/delete/${deleteListingID}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      setListings(remaininglistingData);
      toast.success("Listing Deleted Successfully");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditListing = function (editListingID) {
    console.log(editListingID);
    navigate(`/update-listing/${editListingID}`);
  };

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
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Avatar with text and icon
      </Typography>
      <Demo>
        <List

        // dense={dense}
        >
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
    <div>
      <Link
        color="secondary.main"
        variant="h6"
        underline="hover"
        sx={{ cursor: "pointer" }}
        onClick={() => {
          toggleDrawer();
          handleListings();
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
        {listings === null || listings === undefined ? (
          <span>Deleting</span>
        ) : (
          list2()
        )}
      </SwipeableDrawer>
    </div>
  );
}

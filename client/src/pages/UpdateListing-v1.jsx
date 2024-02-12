import styled from "@emotion/styled";
import { Box, Container, Paper, Stack } from "@mui/material";
import ListingForm from "../components/ListingForm";
import ImagesUpload from "../components/ImagesUpload";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const StyledContainer = styled(Container)({
  padding: "2.4rem 1.6rem",
  // backgroundColor: "orangered",
  // height: "calc(100vh - 10.72rem)",
  height: "calc(100% - 107.188px)",
  // height: "100%",
});

function UpdateListing() {
  const [listing, setListing] = useState({ imageUrls: [] });
  const { register, handleSubmit, setValue, getValues, watch, reset, control } =
    useForm({
      defaultValues: { imageUrls: [] },
    });

  const { currentUser } = useSelector((store) => store.user);
  const { user } = currentUser ? currentUser.data : {};
  const { listingID } = useParams();
  // console.log(user);

  const navigate = useNavigate();

  const onSubmit = async function (formData) {
    // console.log(formData);
    try {
      const newFormData = {
        ...formData,
        bathrooms: +formData.baths,
        bedrooms: +formData.beds,
        type: formData.sell ? "sell" : "rent",
        discountPrice: +formData.discountPrice,
        regularPrice: +formData.regularPrice,
        userRef: user._id,
      };
      // console.log(newFormData);

      if (newFormData.imageUrls.length === 0) return;
      if (newFormData.offer && newFormData.discountPrice === 0) return;

      console.log("Sending...");
      const res = await fetch(`/api/listing/update/${listingID}`, {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(newFormData),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);
      // console.log(data.data.listing._id);
      // 65aae01aec006b2d46a5002f

      if (data.status !== "success") {
        console.log("Error has occured at Update Listing Component api call");
        return;
      }
      toast.success("Property Successfully Updated");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(
    function () {
      const getListing = async () => {
        const res = await fetch(`/api/listing/get/${listingID}`);
        const data = await res.json();
        console.log(data);

        if (data.status !== "success") {
          console.log("Error at Update Listing Component");
          return;
        }

        const { listing } = data.data;

        setListing(listing);
      };
      getListing();
    },
    [listingID]
  );

  useEffect(
    function () {
      if (listing) {
        reset({
          ...listing,
          baths: "" + listing.bathrooms,
          beds: "" + listing.bedrooms,
          sell: listing.type === "sell",
          rent: listing.type === "rent",
        });
      }
    },
    [listing, reset]
  );

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
          <ListingForm
            onRegister={register}
            onGetValues={getValues}
            isUpdatePage={listing ? true : false}
            onControl={control}
          />
          <ImagesUpload
            onSetValue={setValue}
            onGetValues={getValues}
            onWatch={watch}
          />
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default UpdateListing;

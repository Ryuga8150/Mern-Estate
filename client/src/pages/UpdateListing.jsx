import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import styled from "@emotion/styled";
import ListingForm from "../components/ListingForm";
import ImagesUpload from "../components/ImagesUpload";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const StyledContainer = styled(Container)({
  padding: "1.2rem 1.6rem 2.4rem 1.6rem",
  // backgroundColor: "orangered",
  // height: "calc(100vh - 10.72rem)",
  height: "calc(100% - 107.188px)",
  backgroundColor: "#FAFAFA",
  // height: "100%",
});

function UpdateListing() {
  const [listing, setListing] = useState({ imageUrls: [] });
  const { register, handleSubmit, setValue, getValues, watch, reset, control } =
    useForm({
      defaultValues: {
        imageUrls: [],
        benefits: {
          airport: false,
          bus: false,
          metro: false,
          hospital: false,
          cityGarden: false,
          shoppingCentres: false,
        },
        facilities: {
          openFloorPlan: false,
          water: false,
          electricity: false,
          parking: false,
          kitchen: false,
          externalLighting: false,
        },
        type: "rent",
        offer: false,
        facing: "East",
        bathrooms: 1,
        bedrooms: 1,
      },
    });

  const { currentUser } = useSelector((store) => store.user);
  const { user } = currentUser ? currentUser.data : {};
  const { listingID } = useParams();
  // console.log(user);

  const navigate = useNavigate();

  const onSubmit = async function (formData) {
    console.log(formData);

    try {
      const newFormData = {
        ...formData,
        address: `${formData.address}, ${formData.city}, ${formData.state}`,
        city: undefined,
        state: undefined,
        userRef: user._id,
      };

      const { state, city, ...apiData } = newFormData;

      // console.log(apiData);

      if (apiData.imageUrls.length === 0) return;

      if (apiData.offer && apiData.discount === 0) return;

      // console.log("Sending...");
      const res = await fetch(`/api/listing/update/${listingID}`, {
        // Adding method type
        method: "PATCH",

        // Adding body or contents to send
        body: JSON.stringify(apiData),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

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
        // console.log(data);

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
      // console.log(listing);
      if (listing === null || listing === undefined) return;

      reset({
        ...listing,
        bathrooms: listing.bathrooms,
        bedrooms: listing.bedrooms,
        type: listing.type,
        state: listing.address?.split(", ")[2],
        city: listing.address?.split(", ")[1],
        address: listing.address?.split(", ")[0],
      });
    },
    [listing, reset]
  );

  return (
    <StyledContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 2 }}
        >
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
        </Box>
      </form>
    </StyledContainer>
  );
}

export default UpdateListing;

// import styled from "@emotion/styled";
// import { Box, Container, Paper, Stack } from "@mui/material";
// import ListingForm from "../components/ListingForm";
// import ImagesUpload from "../components/ImagesUpload";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";
// import TempForm from "../components/TempForm";
// import TempImagesUpload from "../components/TempImagesUpload";

// const StyledContainer = styled(Container)({
//   padding: "1.2rem 1.6rem 2.4rem 1.6rem",
//   // backgroundColor: "orangered",
//   // height: "calc(100vh - 10.72rem)",
//   height: "calc(100% - 107.188px)",
//   // height: "100%",
//   backgroundColor: "#FAFAFA",
// });

// function CreateListing() {
//   const { register, handleSubmit, setValue, getValues, watch, control } =
//     useForm({
//       defaultValues: { imageUrls: [] },
//     });

//   const { currentUser } = useSelector((store) => store.user);
//   const { user } = currentUser ? currentUser.data : {};
//   console.log(user);

//   const navigate = useNavigate();

//   const onSubmit = async function (formData) {
//     console.log(formData);

//     try {
//       const newFormData = {
//         ...formData,
//         bathrooms: +formData.baths,
//         bedrooms: +formData.beds,
//         type: formData.sell ? "sell" : "rent",
//         discountPrice: +formData.discountPrice,
//         regularPrice: +formData.regularPrice,
//         userRef: user._id,
//       };
//       console.log(newFormData);

//       if (newFormData.imageUrls.length === 0) return;
//       if (newFormData.offer && newFormData.discountPrice === 0) return;

//       console.log("Sending...");
//       const res = await fetch("/api/listing/create", {
//         // Adding method type
//         method: "POST",

//         // Adding body or contents to send
//         body: JSON.stringify(newFormData),

//         // Adding headers to the request
//         headers: {
//           "Content-type": "application/json",
//         },
//       });
//       const data = await res.json();
//       console.log(data);
//       console.log(data.data.listing._id);
//       // 65aae01aec006b2d46a5002f

//       if (data.status !== "success") {
//         console.log("Error has occured at Create Listing api call");
//         return;
//       }
//       toast.success("Property Successfully Listed");
//       navigate("/profile");
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   // <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
//   return (
//     <StyledContainer>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Box
//           sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 2 }}
//         >
//           {/* <ListingForm
//             onRegister={register}
//             onGetValues={getValues}
//             onControl={control}
//           /> */}
//           <TempForm
//             onRegister={register}
//             onGetValues={getValues}
//             onControl={control}
//           />
//           {/* <ImagesUpload
//             onSetValue={setValue}
//             onGetValues={getValues}
//             onWatch={watch}
//           /> */}
//           <TempImagesUpload
//             onSetValue={setValue}
//             onGetValues={getValues}
//             onWatch={watch}
//           />
//         </Box>
//       </form>
//     </StyledContainer>
//   );
// }

// export default CreateListing;

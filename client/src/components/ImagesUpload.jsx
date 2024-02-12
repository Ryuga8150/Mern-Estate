import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Hidden,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-hot-toast";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const tempItemData = [
  {
    img: "images/house-1.jpg",
    title: "Breakfast",
    rows: 3,
    cols: 3,
  },
  {
    img: "images/house-2.jpg",
    title: "Burger",
    rows: 1.5,
    cols: 1,
    // rows: 3,
    // cols: 3,
  },
  {
    img: "images/house-3.jpg",
    title: "Camera",
    rows: 1.5,
    cols: 1,
  },
];

const StyledDiv = styled("div")({
  padding: 8,
  borderRadius: 4,
  border: "dashed 2px",
  borderColor: "#7A7A7A",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
});

ImagesUpload.propTypes = {
  onSetValue: PropTypes.func,
  onGetValues: PropTypes.func,
  onWatch: PropTypes.func,
};

function ImagesUpload({
  onSetValue: setValue,
  onGetValues: getValues,
  onWatch: watch,
}) {
  const [files, setFiles] = useState([]);
  // const [formData, setFormData] = useState({ imageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState(null);
  const imageUploadButton = useRef(null);
  // console.log(files);
  watch("imageUrls");
  // console.log(formData);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageUpload = function (e) {
    e.preventDefault();

    if (files.length <= 0) {
      setImageUploadError("No images selected for Upload");
      return;
    }
    // if (files.length + formData.imageUrls.length > 6) {
    if (files.length + getValues("imageUrls").length > 6) {
      setImageUploadError("You can only upload 6 images per listing");
      return;
    }

    const promises = [];

    for (let i = 0; i < files.length; ++i) {
      promises.push(storeImage(files[i]));
    }

    Promise.all(promises)
      .then((urls) => {
        // setFormData({
        //   ...formData,
        //   imageUrls: formData.imageUrls.concat(urls),
        // });
        console.log(getValues("imageUrls"));
        setValue("imageUrls", getValues("imageUrls").concat(urls));
        setImageUploadError(null);
      })
      .catch((err) => {
        console.log(err);
        setImageUploadError("Image upload failed 2mb max per image");
      });
  };

  const handleImageDelete = async function (imgUrlDelete) {
    try {
      console.log(imgUrlDelete);

      const storage = getStorage();

      // Create a reference to the file to delete
      const desertRef = ref(storage, imgUrlDelete);

      // Delete the file
      await deleteObject(desertRef);
      console.log("File deleted successfully");
      // const newImageUrls = formData.imageUrls.filter(
      //   (imgUrl) => imgUrl !== imgUrlDelete
      // );
      // console.log(newFormData);
      // setFormData({ ...formData, imageUrls: newImageUrls });

      // With React Hook Form
      const newImageUrls = getValues("imageUrls").filter(
        (imgUrl) => imgUrl !== imgUrlDelete
      );
      setValue("imageUrls", newImageUrls);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSwapToMainImage = function (ind) {
    let imgArr = getValues("imageUrls");
    // console.log(imgArr);
    let temp = imgArr[0];
    imgArr[0] = imgArr[ind];
    imgArr[ind] = temp;
    // console.log(imgArr);
    // i think weird behaviour while consolling seems likes no swapping but there is swapping
    setValue("imageUrls", imgArr);
  };
  useEffect(
    function () {
      if (imageUploadError) {
        toast.error(imageUploadError);
        setImageUploadError(null);
      }
    },
    [imageUploadError]
  );

  // const itemData = formData.imageUrls.map((imgUrl, ind) => {
  const itemData = getValues("imageUrls").map((imgUrl, ind) => {
    const title = "burgers";
    let rows = 1.5,
      cols = 1;
    if (ind === 0) {
      rows = 3;
      cols = 3;
    }
    return {
      img: imgUrl,
      title,
      rows,
      cols,
    };
  });
  console.log(itemData);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 110px - 3.6rem)",
        bgcolor: "#fff",
        padding: "1.2rem 0.2rem 1.6rem 0.2rem",
        borderRadius: 3,
        border: "solid 1.5px",
        borderColor: "#EEEEEE",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: "0 1rem", mb: 2 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { md: "2rem" },
            fontWeight: 700,
          }}
        >
          Property Images
        </Typography>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "brandColor.main",
            padding: "0.4rem 0.8rem",
            borderRadius: 1.5,
            "&:hover": {
              borderColor: "brandColor.main",
              bgcolor: "rgb(0, 102, 255,0.9)",
            },
            mr: 2.2,
          }}
          onClick={handleImageUpload}
        >
          <CloudUploadOutlinedIcon sx={{ color: "primary.main" }} />
          <Typography sx={{ ml: 1, color: "primary.main" }}>Upload</Typography>
        </Button>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          // gridTemplateRows: "repeat(3,1fr)",
          gridAutoRows: "8rem",
          columnGap: 2,
          rowGap: 1.8,
          height: "27.3rem",
          overflowY: "scroll",

          padding: "1rem",
          // ...(itemData.length > 3 && { overflowY: "scroll" }),
        }}
      >
        {itemData.map((item, ind) => (
          <ImageListItem
            key={item.img}
            // cols={3 || 1}
            // rows={1}
            // rows={item.rows || 1}
            sx={{
              borderRadius: 2,

              overflow: "hidden",
              border: "solid 0.3px rgb(122, 122, 122,0.3)",
              "&:hover": {
                "& .MuiImageListItemBar-root": {
                  position: "absolute",
                },
              },
              ...(ind === 0 && { gridColumn: "span 3" }),
              ...(ind === 0 && { gridRow: "span 2" }),

              ...(ind !== 0 && { gridColumn: "span 1" }),
              ...(ind !== 0 && { gridRow: "span 1" }),
              // ...(ind === 0 && { gridRow: 1 / 2 }),
            }}
            onClick={() => handleSwapToMainImage(ind)}
          >
            <img
              {...srcset(item.img, 80, item.rows, item.cols)}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                position: "relative",

                "&:hover": {
                  position: "absolute",
                },
              }}
              title={`Image ${ind + 1}`}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "white" }}
                  aria-label={`star ${item.title}`}
                  onClick={() => handleImageDelete(item.img)}
                >
                  {/* <StarBorderIcon /> */}
                  <DeleteIcon />
                </IconButton>
              }
              actionPosition="right"
            />
          </ImageListItem>
        ))}
        <ImageListItem
          key="upload-img"
          // cols={1}
          // rows={1.5}
          sx={{ borderRadius: 2 }}
        >
          <StyledDiv onClick={() => imageUploadButton.current.click()}>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              style={{ display: "none" }}
              multiple
              ref={imageUploadButton}
              // {...register("imageUrls.0")}
            />
            <Typography
              variant="h3"
              textAlign="center"
              sx={{
                color: "#7A7A7A",
                fontSize: "3rem",
                marginTop: -0.5,
                fontWeight: 500,
              }}
            >
              +
            </Typography>
            <Typography
              sx={{
                color: "#7a7a7a",
                fontSize: { md: "1.1rem" },
                marginTop: -0.3,
              }}
              textAlign="center"
            >
              Add Property Image
            </Typography>
          </StyledDiv>
        </ImageListItem>
      </Box>
    </Box>
  );
}

export default ImagesUpload;

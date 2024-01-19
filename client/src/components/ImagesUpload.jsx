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
import { useEffect, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-hot-toast";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";

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
  borderColor: "red",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",

  "& span:first-child": {
    color: "red",
    fontSize: "3rem",
    marginTop: "-2px",
  },

  "& span:last-child": {
    color: "red",
    fontSize: "1.2rem",
    textAlign: "center",
  },
});

ImagesUpload.propTypes = {
  onSetValue: Function,
  onGetValues: Function,
  onWatch: Function,
};

function ImagesUpload({
  onSetValue: setValue,
  onGetValues: getValues,
  onWatch: watch,
}) {
  const [files, setFiles] = useState([]);
  // const [formData, setFormData] = useState({ imageUrls: [] });
  const [imageUploadError, setImageUploadError] = useState(null);

  console.log(files);
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

  const handleImageDelete = function (imgUrlDelete) {
    console.log(imgUrlDelete);
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
    <Stack sx={{ w: "100%", h: "100%", p: "0 1rem" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Property Images
      </Typography>
      <ImageList
        sx={{
          // width: "100%",
          height: "30rem",
        }}
        variant="quilted"
        cols={3}
        rowHeight={100}
        gap={8}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            cols={item.cols || 1}
            rows={item.rows || 1}
            sx={{
              borderRadius: 2,

              overflow: "hidden",

              "&:hover": {
                "& .MuiImageListItemBar-root": {
                  position: "absolute",
                },
              },
            }}
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
              title={item.title}
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
          cols={1}
          rows={1.5}
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <StyledDiv>
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              id="images"
              accept="image/*"
              multiple
              // {...register("imageUrls.0")}
            />
            <span>+</span>
            <span>Add Property Image</span>
          </StyledDiv>
        </ImageListItem>
      </ImageList>

      <Button onClick={handleImageUpload} variant="contained">
        Upload
      </Button>
    </Stack>
  );
}

export default ImagesUpload;

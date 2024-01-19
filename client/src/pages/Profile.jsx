import styled from "@emotion/styled";
import {
  Avatar,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  clearError,
  deleteUserFailure,
  deleteUserLoading,
  deleteUserSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateUserFailure,
  updateUserLoading,
  updateUserSuccess,
} from "./../redux/user/userSlice";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { app } from "../firebase";
import { toast } from "react-hot-toast";

const StyledContainer = styled(Container)({
  padding: "2.4rem 1.6rem",
});
const Heading = styled(Typography)({
  textAlign: "center",
  fontWeight: 600,
  fontSize: "2.4rem",
});
const StyledButton = styled(Button)({
  fontSize: "1rem",
  padding: "0.8rem 1.6rem",
  borderRadius: "13px",
});
// Firebase Storage Rules
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')
//     }
//   }
// }
function Profile() {
  console.log("Profile Rendered");
  const { currentUser, loading, error } = useSelector((store) => {
    // console.log(store);
    return store.user;
  });
  const { user } = currentUser ? currentUser.data : {};
  // console.log(user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [fileUploadPercentage, setFileUploadPercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(file);
  // console.log(fileUploadPercentage);
  // console.log(formData);
  const handleFileUpload = function (file) {
    const storage = getStorage(app);
    const fileName = file.name + new Date().getTime();
    // console.log(fileName);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // above to get % upload

    uploadTask.on(
      "state changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFileUploadPercentage(progress);
      },

      (error) => {
        setFileUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...FormData, avatar: downloadURL });
          setFile(undefined);
        });
      }
    );
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogout = async function () {
    try {
      console.log("In logout");
      dispatch(signOutStart());

      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      console.log(data);
      if (data.status !== "success") {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/");
    } catch (err) {
      dispatch(signOutFailure(err.message));
    }
  };

  const handleDeleteAccount = async function () {
    try {
      dispatch(deleteUserLoading());

      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      console.log(data);
      if (data.status !== "success") {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
      navigate("/");
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const onSubmit = async function ({ username, email }) {
    console.log(username, email, user._id);
    try {
      dispatch(updateUserLoading());
      const res = await fetch(`/api/user/update/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Credentials": true,
          // mode: "no-cors",
        },
        body: JSON.stringify({
          username,
          email,
          // password,
        }),
      });
      const data = await res.json();
      if (data.status !== "success") {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      toast.success("User Updated Successfully");
    } catch (err) {
      dispatch(updateUserFailure(err.message));
    }
  };
  useEffect(
    function () {
      if (file) {
        setFileUploadError(false);
        handleFileUpload(file);
      }
    },
    [file]
  );
  useEffect(
    function () {
      if (error) {
        toast.error(error);
        dispatch(clearError());
      }
    },
    [dispatch, error]
  );
  return (
    <StyledContainer maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} textAlign={"center"}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            <Heading>Profile</Heading>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              accept="image/*"
              hidden
            />
            <Avatar
              alt="User"
              src={formData.avatar || user.avatar}
              sx={{
                height: "7.2rem",
                width: "7.2rem",
                cursor: "pointer",
                mb: "0.6rem",
              }}
              mx="auto"
              // onClick={() => fileRef.current.click()}
              alignSelf="center"
            />
            <Typography variant="body1">
              {fileUploadError && <span>Error Image Upload</span>}
              {!fileUploadError &&
                fileUploadPercentage > 0 &&
                fileUploadPercentage < 100 && (
                  <span>{`Uploading: ${fileUploadPercentage}%`}</span>
                )}
              {!fileUploadError && file && fileUploadPercentage === 100 && (
                <span>Image Successfully Uploaded</span>
              )}
            </Typography>
          </Stack>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Username"
            defaultValue={user.username}
            sx={{
              "& .MuiInputBase-root:hover, & .MuiInputBase-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 2px",
                  borderColor: "brandColor.main",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 2px",
                borderColor: "brandColor.light2",
              },
              // "& .MuiInputBase-root:hover": {
              //   "& .MuiOutlinedInput-notchedOutline": {
              //     // border: "solid 2px",
              //     color: "red",
              //     borderColor: "brandColor.main",
              //   },
              // },
              // "& .Mui-focused": {
              //   "& .MuiOutlinedInput-notchedOutline": {
              //     border: "solid 2px",
              //     borderColor: "brandColor.main",
              //   },
              // },
              // "& .MuiOutlinedInput-notchedOutline": {
              //   border: "solid 2px",
              //   borderColor: "brandColor.light2",
              // },
            }}
            {...register("username")}
            disabled={loading}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Email"
            defaultValue={user.email}
            sx={{
              "& .MuiInputBase-root:hover, & .MuiInputBase-root.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 2px",
                  borderColor: "brandColor.main",
                },
              },
              // "&:hover, & .Mui-focused": {
              //   "& .MuiOutlinedInput-notchedOutline": {
              //     border: "solid 2px",
              //     borderColor: "brandColor.main",
              //   },
              // },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 2px",
                borderColor: "brandColor.light2",
              },
            }}
            {...register("email")}
            disabled={loading}
          />

          <TextField
            // id="outlined-basic"
            id="outlined-adornment-password"
            variant="outlined"
            placeholder="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <StyledButton
            variant="outlined"
            type="submit"
            sx={{
              borderWidth: 1.5,
              bgcolor: "primary.main",
              color: "brandColor.main",
              borderColor: "brandColor.main",

              "&:hover": {
                borderColor: "brandColor.main",
                bgcolor: "brandColor.light1",
              },
            }}
          >
            Update
          </StyledButton>
          <StyledButton
            variant="contained"
            type="button"
            sx={{
              borderWidth: 1.5,
              color: "primary.main",
              bgcolor: "brandColor.main",
              "&:hover": {
                bgcolor: "brandColor.dark",
              },
            }}
          >
            <Link
              component={RouterLink}
              to="/create-listing"
              underline={"none"}
            >
              Create Listing
            </Link>
          </StyledButton>

          <Stack
            direction="row"
            justifyContent={"space-between"}
            // sx={{ mt: 100 }}
          >
            <Link
              component={RouterLink}
              to="/deleteMe"
              color="error"
              variant="h6"
              underline="hover"
              sx={{ cursor: "pointer" }}
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Link>
            <Link
              color="brandColor.main"
              variant="h6"
              underline="hover"
              sx={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Sign Out
            </Link>
          </Stack>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default Profile;

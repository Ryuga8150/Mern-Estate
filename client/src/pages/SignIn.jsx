import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";

import styled from "@emotion/styled";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const StyledContainer = styled(Container)({
  padding: "2.4rem 1.6rem",
});
const Heading = styled(Typography)({
  textAlign: "center",
  fontWeight: 600,
  fontSize: "3rem",
});
const StyledButton = styled(Button)({
  fontSize: "1.2rem",
  padding: "0.8rem 1.6rem",
  // backgroundColor: red[400],

  // "&:hover": {
  //   backgroundColor: red[700],
  // },
  borderRadius: "13px",
});
const Text = styled(Typography)({
  fontSize: "1.2rem",
});

// const StyledTextField = styled(TextField)({
//   // border: `solid 100px ${red[700]}`,
//   // padding: "1.2rem",
//   "& .MuiInputBase-root:hover": {
//     // backgroundColor: "green",
//     // borderColor: red[400],
//   },
//   "& .MuiOutlinedInput-notchedOutline:hover": {
//     // borderColor: red[400],
//     border: 0,
//   },
// });

function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();
  const { loading } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log(isSubmitting);
  const onSubmit = async function (formData) {
    try {
      // console.log(formData);
      dispatch(signInStart());
      reset();
      //return;
      const res = await fetch("/api/auth/signin", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(formData),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();
      // console.log("From Server");
      // console.log(resData);

      if (resData.status === "success") {
        // console.log("In success");
        toast.success("Signed In SuccessFully");
        dispatch(signInSuccess(resData));
        navigate("/");
      } else if (resData.status === "fail") {
        // console.log("In fail");
        toast.error(resData.message);
        dispatch(signInFailure(resData.message));
      } else {
        alert("Unhandled reposnse status in SgnUp");
      }
    } catch (err) {
      alert("Client Side Error in Sign In ");
      console.log(err);
      dispatch(signInFailure(err.message));
    }
  };

  const onError = function (errors) {
    console.log(errors);
  };

  return (
    <StyledContainer maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack spacing={2}>
          <Heading sx={{ marginBottom: "8px !important" }}>Sign In</Heading>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Email"
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
            }}
            {...register("email")}
            disabled={isSubmitting}
          />
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            sx={{
              "&:hover, &.Mui-focused": {
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "solid 2px",
                  borderColor: "brandColor.main",
                },
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 2px",
                borderColor: "brandColor.light2",
              },
              marginBottom: "16px !important",
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: "brandColor.main" }} />
                  ) : (
                    <Visibility sx={{ color: "brandColor.main" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
            // label="Password"
            placeholder="Password"
            {...register("password")}
            disabled={isSubmitting}
          />

          <StyledButton
            variant="contained"
            type="submit"
            disabled={loading}
            sx={{
              borderWidth: 1.5,
              bgcolor: "primary.main",
              color: "brandColor.main",
              border: "solid 1px",
              borderColor: "brandColor.light2",

              "&:hover": {
                borderColor: "brandColor.main",
                bgcolor: "brandColor.light1",
              },
            }}
          >
            {loading ? "Submitting" : "Sign In"}
          </StyledButton>

          <OAuth />
          <Text>
            <span>Don&apos;t have an account? </span>
            <Link
              component={RouterLink}
              to="/sign-up"
              color="brandColor.main"
              variant="h6"
              underline="hover"
            >
              Sign up
            </Link>
          </Text>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default SignIn;

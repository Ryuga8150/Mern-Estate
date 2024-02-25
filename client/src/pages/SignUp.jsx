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
import GoogleIcon from "@mui/icons-material/Google";
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

  borderRadius: "13px",
});
const Text = styled(Typography)({
  fontSize: "1.2rem",
});

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // console.log(isSubmitting);
  const navigate = useNavigate();
  const onSubmit = async function (formData) {
    try {
      // console.log(formData);

      reset();
      //return;
      const res = await fetch("/api/auth/signup", {
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
        toast.success("Signed Up SuccessFully");
        navigate("/sign-in");
      } else if (resData.status === "fail") {
        // console.log("In fail");
        toast.error(resData.message);
      } else {
        alert("Unhandled reposnse status in SgnUp");
      }
    } catch (err) {
      // alert("Client Side Error in Sign up ");
      console.log(err);
    }
  };

  const onError = function (errors) {
    console.log(errors);
  };

  return (
    <StyledContainer maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack spacing={2}>
          <Heading>Sign Up</Heading>
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Username"
            {...register("username")}
            // error
            // helperText={"This is a helper text"}
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
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Email"
            {...register("email")}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
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
            {isSubmitting ? "Submitting" : "Sign Up"}
          </StyledButton>
          <StyledButton
            variant="contained"
            type="button"
            sx={{
              borderWidth: 1.5,
              color: "primary.main",
              bgcolor: "brandColor.main",
              border: "solid 1px",
              borderColor: "brandColor.main",
              "&:hover": {
                bgcolor: "brandColor.dark",
              },
              display: "flex",
              gap: 1,
            }}
          >
            <span>Continue With Google</span>
            <GoogleIcon sx={{ paddingLeft: 0 }} />
          </StyledButton>
          <Text>
            <span>Have an account? </span>
            <Link
              component={RouterLink}
              to="/sign-in"
              color="brandColor.main"
              variant="h6"
              underline="hover"
            >
              Sign in
            </Link>
          </Text>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default SignUp;

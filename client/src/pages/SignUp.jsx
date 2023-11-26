import styled from "@emotion/styled";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

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
  backgroundColor: red[400],

  "&:hover": {
    backgroundColor: red[700],
  },
  borderRadius: "13px",
});
const Text = styled(Typography)({
  fontSize: "1.2rem",
});

const StyledTextField = styled(TextField)({
  // border: `solid 100px ${red[700]}`,
  // padding: "1.2rem",
  "& .MuiInputBase-root:hover": {
    // backgroundColor: "green",
    // borderColor: red[400],
  },
  "& .MuiOutlinedInput-notchedOutline:hover": {
    // borderColor: red[400],
    border: 0,
  },
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
  console.log(isSubmitting);
  const navigate = useNavigate();
  const onSubmit = async function (formData) {
    try {
      console.log(formData);

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
      console.log("From Server");
      console.log(resData);

      if (resData.status === "success") {
        console.log("In success");
        toast.success("Signed Up SuccessFully");
        navigate("/sign-in");
      } else if (resData.status === "fail") {
        console.log("In fail");
        toast.error(resData.message);
      } else {
        alert("Unhandled reposnse status in SgnUp");
      }
    } catch (err) {
      alert("Client Side Error in Sign up ");
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
          <StyledTextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Username"
            {...register("username")}
            error
            helperText={"This is a helper text"}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Email"
            {...register("email")}
            disabled={isSubmitting}
          />
          <TextField
            // id="outlined-basic"
            id="outlined-adornment-password"
            variant="outlined"
            placeholder="Password"
            {...register("password")}
            // sx={{
            //   width: 300,
            //   ".MuiOutlinedInput-root": {
            //     "&:hover": {
            //       borderRadius: 50,
            //       borderColor: "transparent",
            //       borderWidth: 10,
            //     },
            //   },
            // }}
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
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Sign Up"}
          </StyledButton>
          <StyledButton variant="contained">Continue With Google</StyledButton>
          <Text>
            <span>Have an account? </span>
            <Link to="/sign-in">Sign in</Link>
          </Text>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default SignUp;

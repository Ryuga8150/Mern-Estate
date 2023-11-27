import styled from "@emotion/styled";
import {
  Button,
  Container,
  IconButton,
  InputAdornment,
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
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";

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
  const { loading, error } = useSelector((state) => state.user);
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
      console.log(formData);
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
      console.log("From Server");
      console.log(resData);

      if (resData.status === "success") {
        console.log("In success");
        toast.success("Signed In SuccessFully");
        dispatch(signInSuccess(resData));
        navigate("/");
      } else if (resData.status === "fail") {
        console.log("In fail");
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
          <Heading>Sign In</Heading>
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

          <StyledButton variant="contained" type="submit" disabled={loading}>
            {loading ? "Submitting" : "Sign In"}
          </StyledButton>
          <StyledButton variant="contained">Continue With Google</StyledButton>
          <Text>
            <span>Don&apos;t have an account? </span>
            <Link to="/sign-up">Sign up</Link>
          </Text>
        </Stack>
      </form>
    </StyledContainer>
  );
}

export default SignIn;

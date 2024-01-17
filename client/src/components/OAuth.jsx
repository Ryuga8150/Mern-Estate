import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { red } from "@mui/material/colors";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "./../firebase";
import { signInSuccess } from "../redux/user/userSlice";
import GoogleIcon from "@mui/icons-material/Google";

const StyledButton = styled(Button)({
  fontSize: "1.2rem",
  padding: "0.8rem 1.6rem",
  borderRadius: "13px",
});
function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      console.log(app);
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      // popup will come if you have at least 1 gmail account

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
      onClick={handleGoogleClick}
    >
      <span>Continue With Google</span>
      <GoogleIcon sx={{ paddingLeft: 0 }} />
    </StyledButton>
  );
}

export default OAuth;

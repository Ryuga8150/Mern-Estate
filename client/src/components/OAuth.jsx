import { GoogleAuthProvider, getAuth, signInWithPopup } from "@firebase/auth";
import { red } from "@mui/material/colors";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "./../firebase";
import { signInSuccess } from "../redux/user/userSlice";

const StyledButton = styled(Button)({
  fontSize: "1.2rem",
  padding: "0.8rem 1.6rem",
  backgroundColor: red[400],

  "&:hover": {
    backgroundColor: red[700],
  },
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
    <StyledButton variant="contained" onClick={handleGoogleClick}>
      Continue With Google
    </StyledButton>
  );
}

export default OAuth;

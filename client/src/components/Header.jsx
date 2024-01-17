import {
  Avatar,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import "./style.css";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function Header() {
  const data = useSelector((store) => store.user);

  // return {};
  console.log("data", data);
  const user = data.currentUser ? data.currentUser.data : null;
  console.log(user);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        px: "0.8rem",
        py: "1.6rem",
        bgcolor: "#fff",
        // boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
        borderBottom: 2,
        borderColor: "rgba(0,0,0,40%)",
      }}
    >
      <Typography variant="h4" color="brandColor.main" fontWeight={700}>
        MernEstate
      </Typography>

      <OutlinedInput
        id="outlined-adornment-password"
        type="search"
        sx={{
          borderRadius: 50,
          "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "solid 2px",
              borderColor: "brandColor.main",
            },
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "solid 2px",
            borderColor: "brandColor.main",
          },
          "& .MuiInputBase-input": {
            maxWidth: "2.4rem",
            transition: "ease-in 0.4s",
            // width: 100,
          },
          "&.Mui-focused": {
            // border: "2px solid red",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "solid 2px",
              borderColor: "brandColor.main",
              // border: "none",
            },
            "& .MuiInputBase-input": {
              maxWidth: "12.8rem",
              // width: 100,
            },
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label=""
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              <SearchIcon
                fontSize="large"
                sx={{
                  color: "primary.main",
                  backgroundColor: "brandColor.main",
                  borderRadius: 50,
                }}
              />
            </IconButton>
          </InputAdornment>
        }
        // sx={{ borderRadius: 50, color: "primary.main" }}
      />

      {/* <TextField
        id="search-bar"
        className="text"
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      /> */}
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Link
          variant="h6"
          color="brandColor.main"
          component={RouterLink}
          underline="none"
          to="/"
        >
          Home
        </Link>
        <Typography variant="h6">About</Typography>
        {user ? (
          <Avatar
            alt="Remy Sharp"
            src={user.avatar}
            sx={{ width: 35, height: 35 }}
            component={RouterLink}
            to="/profile"
          />
        ) : (
          <Link
            variant="h6"
            color="brandColor.main"
            component={RouterLink}
            underline="none"
            to="/sign-in"
          >
            SignIn
          </Link>
        )}
      </Stack>
    </Stack>
  );
}

export default Header;

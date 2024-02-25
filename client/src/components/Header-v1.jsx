import {
  Avatar,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { blue, grey } from "@mui/material/colors";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { user } = useSelector((store) => store.user.currentUser.data);
  // console.log(user);
  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      alignItems={"center"}
      p={2}
      // backgroundColor={blue[200]}
      sx={{ bgcolor: "#FEFAE0" }}
      color={blue[800]}
    >
      <Typography
        variant="h5"
        component={Link}
        to="/"
        // onClick={() => navigate("/about")}
      >
        MernEstate
      </Typography>

      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        sx={{
          bgcolor: `${grey[50]}`,

          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Stack direction="row" spacing={2}>
        <Typography variant="h6" component={Link} to="/">
          Home
        </Typography>

        <Typography
          variant="h6"
          component={Link}
          to="/about"
          hidden
          sx={{ display: { md: "block" } }}
        >
          About
        </Typography>
        {user ? (
          <Avatar
            alt="Remy Sharp"
            src={user.avatar}
            sx={{ width: 35, height: 35 }}
            component={Link}
            to="/profile"
          />
        ) : (
          <Typography
            variant="h6"
            component={Link}
            to="/sign-in"
            hidden
            sx={{ display: { md: "block" } }}
          >
            SignIn
          </Typography>
        )}
        {/* sx={{ typography: { sm: 'body1', xs: 'body2' } */}
      </Stack>
    </Stack>
  );
}

export default Header;

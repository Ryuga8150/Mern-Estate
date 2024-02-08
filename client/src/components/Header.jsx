import PropTypes from "prop-types";
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
import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

Header.propTypes = {
  isHome: PropTypes.bool,
};
function Header({ isHome = false }) {
  console.log(isHome);
  const data = useSelector((store) => store.user);

  // return {};
  // console.log("data", data);
  const user = data.currentUser ? data.currentUser.data : null;
  // console.log(user);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      searchTerm: "",
    },
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(getValues("searchTerm"));
  watch("searchTerm");
  const onSubmit = async function ({ searchTerm }) {
    // console.log(searchTerm);
    navigate(`/search?searchTerm=${searchTerm}`);
  };

  const onError = function (errors) {
    console.log(errors);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(
    function () {
      const value = searchParams.get("searchTerm") || "";
      setValue("searchTerm", value);
    },
    [searchParams, setValue]
  );

  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        px: "0.8rem",
        py: "1.6rem",
        // bgcolor: "#fff",
        bgcolor: "transparent",
        // boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
        ...(!isHome && {
          borderBottom: 2,
          borderColor: "rgba(0,0,0,40%)",
        }),
      }}
    >
      <Typography variant="h4" color="brandColor.main" fontWeight={700}>
        MernEstate
      </Typography>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              borderColor: isHome
                ? "rgba(233, 236, 239,0.45)"
                : "brandColor.main",
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

            ...(getValues("searchTerm") !== "" && {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "solid 2px",
                borderColor: "brandColor.main",
                // border: "none",
              },
              "& .MuiInputBase-input": {
                maxWidth: "12.8rem",
                // width: "12.8rem",
                // width: 100,
              },
            }),

            ...(isHome && { color: "primary.main" }),
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label=""
                // onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
                type="submit"
              >
                <SearchIcon
                  fontSize="large"
                  sx={{
                    color: "brandColor.main",
                    bgcolor: isHome
                      ? "rgba(233, 236, 239,0.5)"
                      : "primary.main",
                    borderRadius: 50,
                  }}
                />
              </IconButton>
            </InputAdornment>
          }
          {...register("searchTerm")}
          // sx={{ borderRadius: 50, color: "primary.main" }}
        />
      </form>

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
          color={isHome ? "rgba(233, 236, 239,0.65)" : "brandColor.main"}
          component={RouterLink}
          underline="none"
          to="/"
          sx={{
            fontWeight: 600,
            "&:hover": {
              color: "rgba(233, 236, 239,1)",
            },
          }}
        >
          Home
        </Link>
        <Link
          variant="h6"
          // color={isHome ? "primary.main" : "brandColor.main"}
          color={isHome ? "rgba(233, 236, 239,0.65)" : "brandColor.main"}
          component={RouterLink}
          underline="none"
          to="/about"
          sx={{
            fontWeight: 600,
            "&:hover": {
              color: "rgba(233, 236, 239,1)",
            },
          }}
        >
          About
        </Link>

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

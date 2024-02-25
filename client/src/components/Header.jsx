import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

import PropTypes from "prop-types";
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
import HouseIcon from "@mui/icons-material/House";
Header.propTypes = {
  isHome: PropTypes.bool,
};
function Header({ isHome = false }) {
  // console.log(isHome);
  const data = useSelector((store) => store.user);

  // return {};
  // console.log("data", data);
  const user = data.currentUser ? data.currentUser.data : null;
  // console.log(user.user.avatar);
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
  const [loggedIn, setLoggedIn] = useState(false);

  // console.log(getValues("searchTerm"));
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

  useEffect(function () {
    const isLoggedIn = async function () {
      const res = await fetch("/api/auth/isLoggedIn");
      const data = await res.json();

      // console.log(data);
      if (data.status === "success") {
        setLoggedIn(true);
      }
    };
    isLoggedIn();
  }, []);
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
      <Link component={RouterLink} to="/" underline="none">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <HouseIcon
            sx={{
              color: "brandColor.main",
              width: "1.6em",
              height: "1.6em",
              mb: "4px !important",
            }}
          />
          <Typography variant="h4" color="brandColor.main" fontWeight={700}>
            MernEstate
          </Typography>
        </Stack>
      </Link>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <OutlinedInput
          id="outlined-adornment-password"
          type="search"
          sx={{
            borderRadius: 50,
            ...(!loggedIn && { ml: 14 }),
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
                sx={
                  {
                    // bgcolor: isHome
                    //   ? "rgba(233, 236, 239, 0.498)"
                    //   : // : "primary.main",
                    //     "brandColor.light1",
                  }
                }
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
              color: `${isHome ? "rgba(233, 236, 239, 1)" : "#005ce6"}`,
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
              color: `${isHome ? "rgba(233, 236, 239, 1)" : "#005ce6"}`,
            },
          }}
        >
          About
        </Link>

        {loggedIn ? (
          <Avatar
            alt="Remy Sharp"
            src={user?.user.avatar}
            sx={{ width: 35, height: 35 }}
            component={RouterLink}
            to="/profile"
          />
        ) : (
          <>
            <Link
              variant="h6"
              color={isHome ? "rgba(233, 236, 239,0.65)" : "brandColor.main"}
              component={RouterLink}
              underline="none"
              to="/sign-in"
              sx={{
                fontWeight: 600,
                "&:hover": {
                  color: `${isHome ? "rgba(233, 236, 239, 1)" : "#005ce6"}`,
                },
              }}
            >
              Log In
            </Link>
            <Link
              variant="h6"
              component={RouterLink}
              underline="none"
              to="/sign-up"
            >
              <Button
                variant="contained"
                sx={{
                  border: "solid 2px",
                  borderColor: `${
                    isHome ? "rgba(233, 236, 239, 0.65)" : "brandColor.main"
                  }`,

                  bgcolor: "transparent",
                  color: `${
                    isHome ? "rgba(233, 236, 239, 0.65)" : "brandColor.main"
                  }`,
                  fontWeight: 600,
                  padding: "0.2rem 0.5rem",
                  fontSize: "0.95rem",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: `${isHome ? "rgba(233, 236, 239, 1)" : "#005ce6"}`,
                  },
                }}
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default Header;

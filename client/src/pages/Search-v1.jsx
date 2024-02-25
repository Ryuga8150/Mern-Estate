import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";

const StyledContainer = styled(Container)({
  padding: "2.4rem 0",
  height: "calc(100vh - 110px)",
});
const StyledTextField = styled(TextField)((props) => ({
  "&:hover .MuiFormLabel-root": {
    color: props.theme.palette.brandColor.main,
  },
  "& .MuiFormLabel-root.Mui-focused": {
    // color: "rgba(0,0,0,0.6)",
    color: props.theme.palette.brandColor.main,
  },
  "& .MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0,0,0,0.23)",
      borderWidth: 1,
    },
    "&.Mui-focused, &:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: props.theme.palette.brandColor.light2,
        borderWidth: 1,
      },
    },
  },
}));

const StyledCheckbox = styled(Checkbox)((props) => ({
  "&.Mui-checked": {
    color: props.theme.palette.brandColor.main,
  },
}));

function Search() {
  const { register, reset, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      sortBy: "createdAt_desc",
      type: "all",
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState(null);
  const params = [];
  searchParams.forEach((value, key) => {
    // console.log(value, key);
    params.push([key, value]);
  });
  // console.log(params);

  const onSubmit = function (formData) {
    // console.log(formData);
    let params = {};
    Object.entries(formData).forEach(([key, value]) => {
      // console.log(key, value);
      if (value === undefined || value === null || value === false) {
        // console.log("Entered");
        return;
      }

      params[key] = `${value}`;
    });

    // console.log(params);

    setSearchParams({
      ...params,
      sortBy: params.sortBy.split("_")[0],
      order: params.sortBy.split("_")[1],
    });
  };
  const onError = function (err) {
    console.log(err);
  };

  useEffect(
    function () {
      // const param = searchParams.get("searchTerm");
      // setValue("searchTerm", param);
      // console.log("In use Effect");
      const params = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });

      const { order, ...restParams } = params;
      const urlParams = {
        ...restParams,
        parking: params?.parking === "true" ? true : false,
        furnished: params?.furnished === "true" ? true : false,
        offer: params?.offer === "true" ? true : false,
        sortBy:
          (params.sortBy ? params.sortBy : "createdAt") +
          "_" +
          (order !== undefined ? order : "desc"),
      };
      reset(urlParams);

      const apiParamsObj = {
        ...urlParams,
        sortBy: urlParams.sortBy.split("_")[0],
        order: urlParams.sortBy.split("_")[1],
      };

      let apiParamsArr = [];
      Object.entries(apiParamsObj).forEach(([key, value]) => {
        apiParamsArr.push(`${key}=${value}`);
      });

      const apiQueryParams = apiParamsArr.join("&");
      // console.log(apiQueryParams);
      const fetchListings = async () => {
        try {
          const res = await fetch(`/api/listing/get?${apiQueryParams}`);
          const data = await res.json();
          // console.log(data);
          setListings(data.data.listings);
        } catch (err) {
          console.log(err);
        }
      };
      fetchListings();
    },
    [searchParams, setValue, reset]
  );
  return (
    <StyledContainer
      maxWidth="lg"
      sx={{
        paddingLeft: {
          sm: 1.6,
        },
        paddingRight: {
          sm: 0,
        },
        // height: "100%",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: 5,
          height: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Stack spacing={3} sx={{ height: "100%" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="body1">Search Term:</Typography>
              <StyledTextField
                id="outlined-basic"
                // label="Search"
                // variant="outlined"
                {...register("searchTerm")}
                // InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="body1">Type:</Typography>
              <Controller
                name={"type"}
                control={control}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      row={true}
                      // sx={{ display: "flex", alignItems: "center" }}
                    >
                      {[
                        {
                          value: "all",
                          label: "Rent & Sell",
                        },
                        { value: "rent", label: "Rent" },
                        { value: "sell", label: "Sale" },
                      ].map(({ value, label }, ind) => (
                        <FormControlLabel
                          key={ind}
                          value={value}
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "brandColor.main",
                                },
                              }}
                            />
                          }
                          label={label}
                        />
                      ))}
                    </RadioGroup>
                  );
                }}
              />
            </Stack>
            <Stack spacing={2} direction="row" alignItems="center">
              <Typography variant="body1">Offer:</Typography>
              <Controller
                name={"offer"}
                control={control}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <FormControlLabel
                      control={
                        <StyledCheckbox
                          // defaultValue={defaultChecked}
                          // defaultChecked={defaultChecked}
                          color="primary"
                          onChange={(e) => field.onChange(e.target.checked)}
                          checked={field.value || false}
                          value={field.value || false}
                          // default values are required to let mui know if they are either controlled or uncontrolled during first render
                        />
                      }
                      sx={{ textAlign: "center" }}
                    />
                  );
                }}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="body1">Amenities:</Typography>

              {[
                { name: "parking", label: "Parking Spot" },
                { name: "furnished", label: "Furnished" },
              ].map(({ name, label }, ind) => (
                <Controller
                  key={ind}
                  name={name}
                  control={control}
                  render={({ field }) => {
                    // console.log(field);
                    return (
                      <FormControlLabel
                        control={
                          <StyledCheckbox
                            // defaultValue={defaultChecked}
                            // defaultChecked={defaultChecked}
                            color="primary"
                            onChange={(e) => field.onChange(e.target.checked)}
                            checked={field.value || false}
                            value={field.value || false}
                            // default values are required to let mui know if they are either controlled or uncontrolled during first render
                          />
                        }
                        label={label}
                      />
                    );
                  }}
                />
              ))}
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography variant="body1">Sort:</Typography>
              <Controller
                name="sortBy"
                control={control}
                render={({ field }) => {
                  // console.log(field);
                  return (
                    <FormControlLabel
                      // control={
                      //   <StyledCheckbox
                      //     // defaultValue={defaultChecked}
                      //     // defaultChecked={defaultChecked}
                      //     color="primary"
                      //     onChange={(e) => field.onChange(e.target.checked)}
                      //     checked={field.value || false}
                      //     value={field.value || false}
                      //     // default values are required to let mui know if they are either controlled or uncontrolled during first render
                      //   />
                      // }
                      control={
                        <Select
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          // {...register("sort")}
                        >
                          <MenuItem value="createdAt_desc">Latest</MenuItem>
                          <MenuItem value="createdAt_asc">Oldest</MenuItem>
                          <MenuItem value="regularPrice_asc">
                            Price low to high
                          </MenuItem>
                          <MenuItem value="regularPrice_desc">
                            Price high to low
                          </MenuItem>
                        </Select>
                      }
                    />
                  );
                }}
              />
            </Stack>
            <Button
              variant="container"
              type="submit"
              sx={{
                width: "100%",
                bgcolor: "brandColor.main",
                padding: "0.8rem 2rem",
                color: "primary.main",
                fontSize: "1.1rem",
                borderRadius: 2,

                "&:hover": {
                  borderColor: "brandColor.main",
                  bgcolor: "rgb(0, 102, 255,0.9)",
                },
              }}
            >
              Search
            </Button>
          </Stack>
        </form>
        <Box sx={{ padding: "0.6rem 1.2rem", height: "100%" }}>
          <Stack spacing={2}>
            <Typography variant="h4">Your Listings: </Typography>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                gridTemplateColumns: "repeat(2,1fr)",
                overflowY: "auto",
                // overflowX: "scroll",
                columnGap: 3,
                rowGap: 2.5,
                pt: 1,
                pl: 1,
                pr: 1,
                pb: 1,
                height: "32rem",
                // height: "100%",
              }}
            >
              {!listings && <span>Loading...</span>}
              {listings &&
                listings.map((listing) => (
                  <Card key={listing._id} listing={listing} />
                ))}

              {/* <Card ind={3} /> */}
            </Box>
          </Stack>
        </Box>
      </Box>
    </StyledContainer>
  );
}

export default Search;

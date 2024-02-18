import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import styled from "@emotion/styled";
import { Controller } from "react-hook-form";

const StyledOutlinedInput = styled(OutlinedInput)((props) => ({
  backgroundColor: "#FDFDFD",
  height: "3rem",
  color: "#696969",
  borderRadius: 4.5,
  "&:hover .MuiOutlinedInput-notchedOutline,&.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: props.theme.palette.brandColor.main,
      // borderColor: props.theme.palette.brandColor.,
    },
}));

const StyledSelect = styled(Select)((props) => ({
  backgroundColor: "#FDFDFD",
  height: "3rem",
  color: "#696969",
  borderRadius: 4.5,
  "&:hover .MuiOutlinedInput-notchedOutline,&.Mui-focused .MuiOutlinedInput-notchedOutline":
    {
      borderColor: props.theme.palette.brandColor.main,
      // borderColor: props.theme.palette.brandColor.,
    },
}));

const SecondaryHeading = styled(Typography)((props) => {
  // console.log(props);
  return {
    // fontSize: "1.4rem",
    color: "#020202",
    [props.theme.breakpoints.up("md")]: {
      fontSize: "1.4rem",
    },
    fontWeight: 600,
    // 8 conversion rate
    marginBottom: 1.2 * 8,
  };
});

const TertiaryHeading = styled(Typography)((props) => {
  // console.log(props);
  return {
    // fontSize: "1.4rem",
    color: "#111111",
    [props.theme.breakpoints.up("md")]: {
      fontSize: "1.2rem",
    },
    fontWeight: 500,
    // 8 conversion rate
    marginBottom: 1.2 * 8,
  };
});

ListingForm.propTypes = {
  onRegister: PropTypes.any,
  onGetValues: PropTypes.any,
  // onHandleSubmit: Function,
  isUpdatePage: PropTypes.any,
  onControl: PropTypes.any,
};
function ListingForm({
  onRegister: register,
  onGetValues: getValues,
  isUpdatePage = false,
  onControl: control,
}) {
  return (
    <Stack
      spacing={2}
      sx={{
        padding: "1.2rem 1.2rem 1.6rem 1.2rem",
        overflowY: "scroll",
        height: "calc(100vh - 110px - 3.6rem)",
        bgcolor: "#fff",
        borderRadius: 3,
        border: "solid 1.5px",
        borderColor: "#EEEEEE",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 1.5 }}
      >
        <Typography
          variant="h2"
          sx={{ fontSize: { md: "2rem" }, fontWeight: 700 }}
        >
          Property Details
        </Typography>
        <Button
          variant="contained"
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: "brandColor.main",
            padding: "0.4rem 0.8rem",
            borderRadius: 1.5,
            "&:hover": {
              borderColor: "brandColor.main",
              bgcolor: "rgb(0, 102, 255,0.9)",
            },
          }}
          type="submit"
        >
          <CloudUploadOutlinedIcon sx={{ color: "primary.main" }} />
          <Typography sx={{ ml: 1, color: "primary.main" }}>
            {isUpdatePage ? "Update" : "Submit"}
          </Typography>
        </Button>
      </Stack>

      <Box sx={{ pb: "1.2rem" }}>
        <SecondaryHeading variant="h3" sx={{ marginBottom: 1.2 }}>
          Property Information
        </SecondaryHeading>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 3,
            rowGap: 1.6,
          }}
        >
          <Stack spacing={0.8} sx={{ gridColumn: "1 / -1" }}>
            <TertiaryHeading variant="h3">Property Name</TertiaryHeading>
            <StyledOutlinedInput {...register("name")} />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">Address</TertiaryHeading>
            <StyledOutlinedInput {...register("address")} />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">Description</TertiaryHeading>
            <StyledOutlinedInput {...register("description")} />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">City</TertiaryHeading>
            <StyledOutlinedInput {...register("city")} />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">State</TertiaryHeading>
            <StyledOutlinedInput {...register("state")} />
          </Stack>
        </Box>
      </Box>

      <Box sx={{ pb: "1.2rem" }}>
        <SecondaryHeading>Property Specification</SecondaryHeading>
        <Box
          // direction="row"
          // alignItems="center"
          // // justifyContent="space-between"
          // spacing={2}
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 3,
            justifyItems: "start",
            mb: 1.6,
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <TertiaryHeading>Dimensions</TertiaryHeading>
            <StyledOutlinedInput
              placeholder="ex: 121 X 350"
              sx={{ width: "8rem" }}
              {...register("dimensions")}
            />
          </Stack>

          <Controller
            name="facing"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ ml: 0 }}
                control={
                  <StyledSelect
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    sx={{ ml: 2, width: "6rem" }}
                  >
                    <MenuItem value="North">North</MenuItem>
                    <MenuItem value="South">South</MenuItem>
                    <MenuItem value="East">East</MenuItem>
                    <MenuItem value="West">West</MenuItem>
                  </StyledSelect>
                }
                // <TertiaryHeading sx={{ display: "flex", alignItems: "center" }}>
                //   Facing
                // </TertiaryHeading>
                label={
                  <TertiaryHeading sx={{ mb: "0 !important" }}>
                    Facing
                  </TertiaryHeading>
                }
                labelPlacement="start"
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 3,
            mb: 1.6,
          }}
        >
          {[
            {
              title: "Benefits",
              specification: [
                { label: "Airport within 10 km", field: "airport" },
                { label: "Bus Stand within 5 km", field: "bus" },
                { label: "Metro within 5 km", field: "metro" },
                { label: "Hospital within 7 km", field: "hospital" },
                { label: "Close to City Garden", field: "cityGarden" },
                {
                  label: "Close to Shopping Centres",
                  field: "shoppingCentres",
                },
              ],
            },
            {
              title: "Facilities",
              specification: [
                { label: "Open Floor Plan", field: "openFloorPlan" },
                { label: "Water 24 Hours", field: "water" },
                { label: "Electricity 1200 V.P.A", field: "electricity" },
                { label: "Secure Parking", field: "parking" },
                { label: "Modern Kitchen", field: "kitchen" },
                { label: "External Lighting", field: "externalLighting" },
              ],
            },
          ].map(({ title, specification }, indPrimary) => (
            <Box key={indPrimary}>
              <TertiaryHeading>{title}</TertiaryHeading>
              <Stack spacing={0.1}>
                {specification.map(({ label, field }, indSecondary) => (
                  <Controller
                    key={indSecondary}
                    name={`${title.toLowerCase()}.${field}`}
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              // color: "#000",
                              ml: -1.5,
                              "&.Mui-checked": {
                                color: "brandColor.main",
                              },
                            }}
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        }
                        // not checked: #878787
                        // checked:#262626
                        label={
                          <Typography variant="body1" sx={{ color: "#262626" }}>
                            {label}
                          </Typography>
                        }
                      />
                    )}
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: 3,
          }}
        >
          <Stack spacing={0.8}>
            <TertiaryHeading>Bedrooms</TertiaryHeading>
            <Controller
              name="bedrooms"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <MenuItem value={1}>1 Room</MenuItem>
                  <MenuItem value={2}>2 Room</MenuItem>
                  <MenuItem value={3}>3 Room</MenuItem>
                  <MenuItem value={4}>4 Room</MenuItem>
                </StyledSelect>
              )}
            />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading>Bathrooms</TertiaryHeading>
            <Controller
              name="bathrooms"
              control={control}
              render={({ field }) => (
                <StyledSelect
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                >
                  <MenuItem value={1}>1 Room</MenuItem>
                  <MenuItem value={2}>2 Room</MenuItem>
                  <MenuItem value={3}>3 Room</MenuItem>
                  <MenuItem value={4}>4 Room</MenuItem>
                </StyledSelect>
              )}
            />
          </Stack>
        </Box>
      </Box>

      <Box>
        <SecondaryHeading>Property Pricing</SecondaryHeading>
        <Box
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 3 }}
        >
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TertiaryHeading sx={{ mb: "0 !important" }}>
                Type:{" "}
              </TertiaryHeading>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="rent"
                      control={
                        <Radio
                          sx={{
                            color: "brandColor.main",
                            "&.Mui-checked": { color: "brandColor.main" },
                          }}
                        />
                      }
                      label="Rent"
                    />
                    <FormControlLabel
                      value="sale"
                      control={
                        <Radio
                          sx={{
                            color: "brandColor.main",
                            "&.Mui-checked": { color: "brandColor.main" },
                          }}
                        />
                      }
                      label="Sale"
                    />
                  </RadioGroup>
                )}
              />
            </Stack>

            <Stack spacing={0.8}>
              <TertiaryHeading>Price</TertiaryHeading>
              <StyledOutlinedInput {...register("regularPrice")} />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TertiaryHeading sx={{ mb: "0 !important" }}>
                Offer:{" "}
              </TertiaryHeading>
              <Controller
                name="offer"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={field.value}
                    onChange={(e) =>
                      field.onChange(e.target.value === "true" ? true : false)
                    }
                    // onChange={(e) => setOffer(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value={true}
                      control={
                        <Radio
                          sx={{
                            color: "brandColor.main",
                            "&.Mui-checked": { color: "brandColor.main" },
                          }}
                        />
                      }
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={
                        <Radio
                          sx={{
                            color: "brandColor.main",
                            "&.Mui-checked": { color: "brandColor.main" },
                          }}
                        />
                      }
                      label="No"
                    />
                  </RadioGroup>
                )}
              />
            </Stack>

            <Stack spacing={0.8}>
              <TertiaryHeading>Discount</TertiaryHeading>
              <StyledOutlinedInput {...register("discount")} />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

export default ListingForm;

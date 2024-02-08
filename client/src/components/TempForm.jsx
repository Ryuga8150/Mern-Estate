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
import { useState } from "react";
import styled from "@emotion/styled";

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

function TempForm() {
  const [facing, setFacing] = useState("East");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [type, setType] = useState("rent");
  const [offer, setOffer] = useState(false);

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
        >
          <CloudUploadOutlinedIcon sx={{ color: "primary.main" }} />
          <Typography sx={{ ml: 1, color: "primary.main" }}>Submit</Typography>
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
            <StyledOutlinedInput />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">Address</TertiaryHeading>
            <StyledOutlinedInput />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">Description</TertiaryHeading>
            <StyledOutlinedInput />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">City</TertiaryHeading>
            <StyledOutlinedInput />
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading variant="h3">State</TertiaryHeading>
            <StyledOutlinedInput />
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
            />
          </Stack>
          <FormControlLabel
            sx={{ ml: 0 }}
            control={
              <StyledSelect
                value={facing}
                onChange={(e) => setFacing(e.target.value)}
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
                { label: "Airport within 10 km" },
                { label: "Bus Stand within 5 km" },
                { label: "Metro within 5 km" },
                { label: "Hospital within 7 km" },
                { label: "Close to City Garden" },
                { label: "Close to Shopping Centres" },
              ],
            },
            {
              title: "Facilities",
              specification: [
                { label: "Open Floor Plan" },
                { label: "Water 24 Hours" },
                { label: "Electricity 1200 V.P.A" },
                { label: "Secure Parking" },
                { label: "Modern Kitchen" },
                { label: "External Lighting" },
              ],
            },
          ].map(({ title, specification }, indPrimary) => (
            <Box key={indPrimary}>
              <TertiaryHeading>{title}</TertiaryHeading>
              <Stack spacing={0.1}>
                {specification.map(({ label }, indSecondary) => (
                  <FormControlLabel
                    key={indSecondary}
                    control={
                      <Checkbox
                        sx={{
                          // color: "#000",
                          ml: -1.5,
                          "&.Mui-checked": {
                            color: "brandColor.main",
                          },
                        }}
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
            <StyledSelect
              value={bedrooms}
              onChange={(e) => setBedrooms(+e.target.value)}
            >
              <MenuItem value={1}>1 Room</MenuItem>
              <MenuItem value={2}>2 Room</MenuItem>
              <MenuItem value={3}>3 Room</MenuItem>
              <MenuItem value={4}>4 Room</MenuItem>
            </StyledSelect>
          </Stack>
          <Stack spacing={0.8}>
            <TertiaryHeading>Bathrooms</TertiaryHeading>
            <StyledSelect
              value={bathrooms}
              // label="Bathrooms"
              onChange={(e) => setBathrooms(+e.target.value)}
            >
              <MenuItem value={1}>1 Room</MenuItem>
              <MenuItem value={2}>2 Room</MenuItem>
              <MenuItem value={3}>3 Room</MenuItem>
              <MenuItem value={4}>4 Room</MenuItem>
            </StyledSelect>
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
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={type}
                onChange={(e) => setType(e.target.value)}
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
                  value="sell"
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
            </Stack>

            <Stack spacing={0.8}>
              <TertiaryHeading>Price</TertiaryHeading>
              <StyledOutlinedInput />
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TertiaryHeading sx={{ mb: "0 !important" }}>
                Offer:{" "}
              </TertiaryHeading>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
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
            </Stack>

            <Stack spacing={0.8}>
              <TertiaryHeading>Discount</TertiaryHeading>
              <StyledOutlinedInput />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
}

export default TempForm;

import styled from "@emotion/styled";
import PropTypes from "prop-types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

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

const StyledOutlinedInput = styled(OutlinedInput)((props) => ({
  // here the declarations are in px
  // whereas in sx they were in rem

  marginRight: "1rem", // rem =8px
  width: "4.5rem",
  "& .MuiInputBase-input": {
    color: props.theme.palette.brandColor.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    backgroundColor: "rgb(128, 179, 255,0.3)",
  },
  "&.Mui-focused, &:hover": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: props.theme.palette.brandColor.light2,
      borderWidth: 1,
    },
  },
}));

ListingForm.propTypes = {
  onRegister: Function,
  // onHandleSubmit: Function,
};

function ListingForm({ onRegister: register }) {
  return (
    <Stack
      sx={{
        // width: "100%",
        height: "100%",
        padding: "0 2.4rem",
        // bgcolor: "#fff",
      }}
      spacing={3}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Property Details
      </Typography>
      <StyledTextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        {...register("name")}
      />
      <StyledTextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        {...register("description")}
      />
      <StyledTextField
        id="outlined-basic"
        label="Address"
        multiline
        rows={4}
        variant="outlined"
        {...register("address")}
      />
      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
        <FormControlLabel
          control={<StyledCheckbox />}
          label="Sell"
          {...register("sell")}
        />
        <FormControlLabel
          control={<StyledCheckbox />}
          label="Rent"
          {...register("rent")}
        />
        <FormControlLabel
          control={<StyledCheckbox />}
          label="Parking Spot"
          {...register("parking")}
        />
        <FormControlLabel
          control={<StyledCheckbox />}
          label="Furnished"
          {...register("furnished")}
        />
        <FormControlLabel
          control={<StyledCheckbox />}
          label="Offer"
          {...register("offer")}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <FormControlLabel
          control={<StyledOutlinedInput type="number" variant="filled" />}
          label="Beds"
          {...register("beds")}
        />
        <FormControlLabel
          control={
            <StyledOutlinedInput
              sx={{ mr: 2 }}
              type="number"
              variant="filled"
            />
          }
          label="Baths"
          {...register("baths")}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <FormControlLabel
          control={<StyledOutlinedInput type="number" variant="filled" />}
          label="Regular Price"
          {...register("regularPrice")}
        />
        <FormControlLabel
          control={
            <StyledOutlinedInput
              sx={{ mr: 2 }}
              type="number"
              variant="filled"
            />
          }
          label="Discount Price"
          {...register("discountPrice")}
        />
      </Stack>
      <Button
        type="submit"
        variant="contained"
        sx={{ bgcolor: "brandColor.main" }}
      >
        Submit
      </Button>
    </Stack>
  );
}

export default ListingForm;

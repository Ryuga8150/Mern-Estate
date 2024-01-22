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
import { Controller } from "react-hook-form";

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
  onGetValues: Function,
  // onHandleSubmit: Function,
  isUpdatePage: String,
  onControl: Object,
};

function ListingForm({
  onRegister: register,
  onGetValues: getValues,
  isUpdatePage = false,
  onControl: control,
}) {
  // console.log(getValues("sell"));

  // console.log(isUpdatePage);
  // console.log(control);
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
        InputLabelProps={{ shrink: isUpdatePage }}
      />
      <StyledTextField
        id="outlined-basic"
        label="Description"
        variant="outlined"
        {...register("description")}
        InputLabelProps={{ shrink: isUpdatePage }}
      />
      <StyledTextField
        id="outlined-basic"
        label="Address"
        multiline
        rows={4}
        variant="outlined"
        // defaultValue={getValues("address")}
        // value={getValues("address")}
        InputLabelProps={{ shrink: isUpdatePage }}
        // defaultValue={"paras"}
        {...register("address")}
      />

      <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
        {[
          { name: "sell", label: "Sell" },
          { name: "rent", label: "Rent" },
          { name: "parking", label: "Parking Spot" },
          { name: "furnished", label: "Furnished" },
          { name: "offer", label: "Offer" },
        ].map(({ name, label }, ind) => (
          <Controller
            key={ind}
            name={name}
            control={control}
            render={({ field }) => {
              console.log(field);
              return (
                <FormControlLabel
                  control={
                    <StyledCheckbox
                      defaultValue={getValues(name)}
                      defaultChecked={getValues(name)}
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
        {isUpdatePage ? "Update" : "Submit"}
      </Button>
    </Stack>
  );
}

export default ListingForm;

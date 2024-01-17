import { TextField } from "@mui/material";

function FormField() {
  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      placeholder="Email"
      {...register("email")}
      disabled={isSubmitting}
    />
  );
}

export default FormField;

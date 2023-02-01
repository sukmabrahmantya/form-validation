import React from "react";
import { FieldProps, getIn } from "formik";
import { TextFieldProps, TextField } from "@mui/material";

const FormTextField: React.FC<FieldProps & TextFieldProps> = props => {
  const {error, helperText, field, form, ...rest} = props;
  const isTouch = getIn(form.touched, field.name);
  const errorMessage = getIn(form.errors, field.name);

  return (
    <TextField 
      fullWidth
      variant="outlined"
      error={error ?? Boolean(isTouch && errorMessage)}
      helperText={helperText ?? ((isTouch && errorMessage) ? errorMessage : undefined)}
      {...rest}
      {...field}
    />
  );
};

export default FormTextField;
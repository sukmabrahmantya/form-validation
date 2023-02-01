import React from "react";
import { FieldProps, getIn } from "formik";
import { TextFieldProps, TextField, InputAdornment } from "@mui/material";
import NumberFormat, { InputAttributes } from "react-number-format";

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberFormatCustom = React.forwardRef<
  NumberFormat<InputAttributes>,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, name, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});


const FormCurrencyField: React.FC<FieldProps & TextFieldProps> = props => {
  const {error, helperText, field, form, ...rest} = props;
  const isTouch = getIn(form.touched, field.name);
  const errorMessage = getIn(form.errors, field.name);

  return (
    <TextField 
      fullWidth
      variant="outlined"
      error={error ?? Boolean(isTouch && errorMessage)}
      helperText={helperText ?? ((isTouch && errorMessage) ? errorMessage : undefined)}
      InputProps={{
        startAdornment: <InputAdornment position="start">SGD </InputAdornment>,
        inputComponent: NumberFormatCustom as any
      }}
      {...rest}
      {...field}
    />
  );
};

export default FormCurrencyField;
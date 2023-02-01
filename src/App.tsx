import * as React from "react";
import * as yup from "yup";
import TextField from "./components/TextField";
import CurrencyField from "./components/CurrencyField";
import Dialog from "./components/Dialog";
import { Formik, FormikHelpers, FormikProps, Form, Field } from "formik";
import { Typography, Container, Button, Box, Unstable_Grid2 as Grid, Card, CardContent } from "@mui/material";


interface FormValues {
  amount: string;
  name: string;
  email: string;
  idNumber: string;
  postalCode: string;
  unitNumber: string;
  address: string;
  remarks: string;
};

const { string, object } = yup;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const nricRegex = /^[SFTG]\d{7}[A-Z]$/
const postalCodeRegex = /^[0-9]{6}$/
const unitNumberRegex = /^(?=.*?[0-9])(?=.*?[-]).{1,6}$/
const addressRegex = /(?!^\d+$)^.+$/
const validationSchema = object().shape({
  amount: string()
    .required("Please enter a donation amount."),
  name: string()
    .required("Please enter a name."),
  email: string()
    .matches(emailRegex, {excludeEmptySting: true, message: "Please enter a valid email"})
    .required("Please enter a email."),
  idNumber: string()
    .matches(nricRegex, {excludeEmptySting: true, message: "Please enter a valid Singapore NRIC"})
    .required("Please enter a id number."),
  postalCode: string()
    .matches(postalCodeRegex, {excludeEmptySting: true, message: "Please enter a valid postal code"})
    .required("Please enter a postal code."),
  unitNumber: string()
    .matches(unitNumberRegex, {excludeEmptySting: true, message: "Please enter a valid unit number"})
    .required("Please enter a unit number."),
  address: string()
    .when("address", (val, schema) => {
      if(val?.length > 0) return string().matches(addressRegex, {excludeEmptySting: true, message: "Please enter a valid address"})
      else return string().notRequired()
    }),
  remarks: string()
    .when("remarks", (val, schema) => {
      if(val?.length > 0) return string().required("Please enter a remarks.")
      else return string().notRequired()
    }),
}, [
  ["remarks", "remarks"],
  ["address", "address"],
]);

export default function App() {
  const [selectedValue, setSelectedValue] = React.useState({
    address: "",
    amount: "",
    email: "",
    idNumber: "",
    name: "",
    postalCode: "",
    remarks: "",
    unitNumber: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">
      <Container maxWidth="md">
        <Card>
          <CardContent>
            <Box mb={3} p={2}>
              <Typography align="center" variant="h5">Donation Form</Typography>
              <Typography align="center">Technical Test Frontend Developer</Typography>
            </Box>
            <Formik 
              initialValues={{
                amount: "",
                name: "",
                email: "",
                idNumber: "",
                postalCode: "",
                unitNumber: "",
                address: "",
                remarks: ""
              }}
              validateOnBlur
              validateOnChange
              validationSchema={validationSchema}
              onSubmit={(
                values: FormValues,
                formikHelpers: FormikHelpers<FormValues>
              ) => {
                // alert(JSON.stringify(values, null, 2));
                setSelectedValue(values);
                handleClickOpen();
                formikHelpers.setSubmitting(false);
              }}
            >
              {(formikProps: FormikProps<FormValues>) => (
                <Form noValidate autoComplete="off">
                  <Grid container spacing={3} mb={1}>
                    <Grid xs={12} sm={12} md={12}>
                      <Field 
                        name="name"
                        label="Name"
                        size="small"
                        component={TextField}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                      <Field 
                        name="email"
                        label="Email"
                        size="small"
                        component={TextField}
                      />
                    </Grid>
                    <Grid xs={12} sm={6} md={6}>
                      <Field 
                        name="amount"
                        label="Donation Amount"
                        size="small"
                        startadornment="SGD"
                        component={CurrencyField}
                      />
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                      <Field 
                        name="idNumber"
                        label="ID Number"
                        size="small"
                        component={TextField}
                      />
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                      <Field 
                        name="postalCode"
                        label="Postal Code"
                        size="small"
                        component={TextField}
                        />
                    </Grid>
                    <Grid xs={12} sm={4} md={4}>
                      <Field 
                        name="unitNumber"
                        label="Unit Number"
                        size="small"
                        component={TextField}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12}>
                      <Field 
                        name="address"
                        label="Address"
                        size="small"
                        component={TextField}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12}>
                      <Field 
                        name="remarks"
                        label="Remarks"
                        size="small"
                        component={TextField}
                      />
                    </Grid>
                    <Grid xs={12} sm={12} md={12} mt={3}>
                      <Button 
                        type="submit"
                        variant="outlined"
                        size="large"
                        color="primary"
                        disabled={formikProps.isSubmitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
        <Dialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      </Container>
    </div>
  );
}
import * as React from 'react';
import { Unstable_Grid2 as Grid, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material"
import NumberFormat from "react-number-format";

export interface DialogProps {
  open: boolean;
  selectedValue: SelectedValue;
  onClose: () => void;
}

interface SelectedValue {
  address: string;
  amount: string;
  email: string;
  idNumber: string;
  name: string;
  postalCode: string;
  remarks: string;
  unitNumber: string;
}

export default function OutputDialog(props: DialogProps) {
  const {onClose, selectedValue, open} = props;
  const {address, amount, email, idNumber, name, postalCode, remarks, unitNumber} : SelectedValue = selectedValue

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle mt={2}>Donation details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={2}>
          <Grid xs={12} sm={6} md={6}>
            <Typography variant="caption">
              Name
            </Typography>
            <Typography variant="h6">
              {name && name}
            </Typography>
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <Typography variant="caption">
              Email
            </Typography>
            <Typography variant="h6">
              {email && email}
            </Typography>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <Typography variant="caption">
              ID Number
            </Typography>
            <Typography variant="h6">
              {idNumber && idNumber}
            </Typography>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <Typography variant="caption">
              Postal Code
            </Typography>
            <Typography variant="h6">
              {postalCode && postalCode}
            </Typography>
          </Grid>
          <Grid xs={12} sm={4} md={4}>
            <Typography variant="caption">
              Unit Number
            </Typography>
            <Typography variant="h6">
              {unitNumber && unitNumber}
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <Typography variant="caption">
              Address
            </Typography>
            <Typography variant="h6">
              {address ? address : "-"}
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12}>
            <Typography variant="caption">
              Remarks
            </Typography>
            <Typography variant="h6">
              {remarks ? remarks : "-"}
            </Typography>
          </Grid>
          <Grid xs={12} sm={12} md={12} mt={3}>
            <Typography variant="caption">
              Amount
            </Typography>
            <Typography variant="h5">
              <NumberFormat value={amount || 0} displayType={'text'} thousandSeparator={true} prefix={'SGD '} />
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}